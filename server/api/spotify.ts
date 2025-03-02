interface SpotifyTokenResponse {
  access_token: string;
  expires_in: number;
}

interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls: { spotify: string };
  };
}

interface TrackData {
  isPlaying: boolean;
  trackName?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
  error?: string;
}

export default defineEventHandler(async (event) => {
  try {
    const { cloudflare } = event.context;
    const { SPOTIFY_CACHE, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = cloudflare.env;

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
      return { isPlaying: false, error: 'Spotify credentials are not set' };
    }

    let accessToken: string;
    const cachedToken = await SPOTIFY_CACHE.get('spotify_access_token');
    
    if (cachedToken) {
      accessToken = cachedToken;
    } else {
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: SPOTIFY_REFRESH_TOKEN,
        }),
      });
      
      const tokenData: SpotifyTokenResponse = await tokenResponse.json();
      accessToken = tokenData.access_token;
      
      await SPOTIFY_CACHE.put('spotify_access_token', accessToken, {
        expirationTtl: tokenData.expires_in - 60, // refresh 60s before the token expires
      });
    }

    const nowPlayingResponse = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (nowPlayingResponse.status === 204) {
      return { isPlaying: false };
    }

    const nowPlayingData: SpotifyNowPlayingResponse = await nowPlayingResponse.json();
    
    const responseData: TrackData = {
      isPlaying: nowPlayingData.is_playing,
      trackName: nowPlayingData.item.name,
      artist: nowPlayingData.item.artists.map((artist) => artist.name).join(', '),
      albumArt: nowPlayingData.item.album.images[0]?.url,
      songUrl: nowPlayingData.item.external_urls.spotify,
    };

    return responseData;
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    
    setResponseHeaders(event, {
      'Cache-Control': 'no-store'
    });
    
    return { isPlaying: false, error: 'Failed to fetch Spotify data' };
  }
});
