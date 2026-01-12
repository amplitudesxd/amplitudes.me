interface SpotifyTokenResponse {
  access_token: string;
  expires_in: number;
}

interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  progress_ms: number;
  item: {
    name: string;
    duration_ms: number;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls: { spotify: string };
  };
}

type SpotifyStatus =
  | { isPlaying: false }
  | {
      isPlaying: true;
      track: {
        name: string;
        artist: string;
        albumArt: string;
        url: string;
      };
      endsAt: number;
    };

export default defineEventHandler(async (event): Promise<SpotifyStatus> => {
  try {
    const { cloudflare } = event.context;
    const { SPOTIFY_CACHE, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
      cloudflare.env;

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
      return { isPlaying: false };
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

    const data: SpotifyNowPlayingResponse = await nowPlayingResponse.json();

    if (!data.is_playing) {
      return { isPlaying: false };
    }

    const remainingMs = data.item.duration_ms - data.progress_ms;

    // cache until the track ends, up to a max of 30s
    setResponseHeaders(event, {
      'Cache-Control': `s-maxage=${Math.min(Math.floor(remainingMs / 1000), 30)}`,
    });

    return {
      isPlaying: true,
      track: {
        name: data.item.name,
        artist: data.item.artists.map((a) => a.name).join(', '),
        albumArt: data.item.album.images[0]?.url,
        url: data.item.external_urls.spotify,
      },
      endsAt: Date.now() + remainingMs,
    };
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    setResponseHeaders(event, { 'Cache-Control': 'no-store' });
    return { isPlaying: false };
  }
});
