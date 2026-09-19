import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '54029945057-va1sk53lqt9urs1h306ad3f3r4ejtq2u.apps.googleusercontent.com',
    },
  },

  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/css/main.css',
  ],

  build: {
    transpile: ['vuetify'],
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
  // Nuxt configuration reload trigger
})
