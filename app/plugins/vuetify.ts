import { createVuetify } from 'vuetify'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'mirioDark',
      themes: {
        mirioDark: {
          dark: true,
          colors: {
            background: '#0A1310',
            surface: '#0F1D19',
            'surface-variant': '#122822',
            primary: '#34D399',
            'primary-darken-1': '#1FAE7C',
            secondary: '#0E2A22',
            accent: '#5EEAD4',
            success: '#34D399',
            'on-background': '#F4F7F5',
            'on-surface': '#F4F7F5',
            outline: '#1E332C',
          },
          variables: {
            'border-color': '#1E332C',
            'high-emphasis-opacity': 1,
          },
        },
      },
    },
    defaults: {
      VBtn: {
        style: 'text-transform: none; letter-spacing: normal; font-weight: 600;',
      },
      VCard: {
        elevation: 0,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
