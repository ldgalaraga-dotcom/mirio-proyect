import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/css/main.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  typescript: {
    tsConfig: {
      extends: './.nuxt/tsconfig.json'
    }
  },

  vite: {
    // @ts-expect-error - tsconfigRaw override for oxc in vite
    oxc: {
      tsconfig: false,
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    },
    // @ts-expect-error - vuetify vite plugin typing mismatch with nuxt's vite config
    plugins: [vuetify({ autoImport: true })],
    ssr: {
      noExternal: ['vuetify'],
    },
  },

  app: {
    head: {
      title: 'Mirio · Aprende. Programa. Crea. Con IA.',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/mirio-mascot.png' },
      ],
    },
  },
})
