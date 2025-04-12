import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-12',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'amplitudes',
      meta: [
        { property: 'og:title', content: 'amplitudes' },
        {
          property: 'og:description',
          content: "hey, i'm amplitudes - a software developer from london.",
        },
        { name: 'description', content: "hey, i'm amplitudes - a software developer from london." },
        { property: 'og:url', content: 'https://amplitudes.me' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#c27aff' },
      ],
    },
  },
  css: ['assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  modules: ['nitro-cloudflare-dev', '@vueuse/nuxt', '@nuxt/icon', '@nuxtjs/fontaine'],
  icon: {
    clientBundle: {
      scan: true,
    },
  },
});
