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
      meta: [{ name: 'theme-color', content: '#c27aff' }],
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
  modules: [
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nitro-cloudflare-dev',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxtjs/fontaine',
  ],
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
      },
    },
  },
});
