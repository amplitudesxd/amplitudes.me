export interface SeoOptions {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?:
    | 'article'
    | 'website'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_status'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other';
  siteName?: string;
}

export const useSeo = (options: SeoOptions) => {
  const { title, description, image, url, type = 'website', siteName } = options;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: type,
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  });
};
