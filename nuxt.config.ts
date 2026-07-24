// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/fonts'],

  // Static-generated build (SSG) — prerendered at build time, deploys to Vercel with zero server config.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/games', '/games/snake', '/games/breakout', '/games/2048', '/games/flappy-bird']
    }
  },

  // Update this to the real production domain once it's live — powers sitemap.xml and canonical/OG URLs.
  site: {
    url: 'https://sparksgames.vercel.app',
    name: 'SparksGames'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · SparksGames',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' }
      ],
      meta: [
        { name: 'theme-color', content: '#0d0906' },
        { name: 'color-scheme', content: 'dark' }
      ]
    }
  },

  fonts: {
    families: [
      { name: 'Orbitron', provider: 'google', weights: [600, 700, 800] },
      { name: 'Rubik', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },

  css: ['~/assets/css/main.css'],

  typescript: { strict: true }
})
