import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-28',
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
  css: ['~/assets/css/main.css'],
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
    '@nuxt/fonts',
  ],
  fonts: {
    families: [
      {
        name: 'Inter',
        src: '/fonts/InterVariable.woff2',
        weight: '100 900',
        display: 'swap',
      },
    ],
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  site: {
    url: 'https://amplitudes.me',
  },
  sitemap: {
    zeroRuntime: true,
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
