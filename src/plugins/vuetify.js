import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const premiumTheme = {
  dark: false,
  colors: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    primary: '#D81B60', // pink-darken-1
    'primary-darken': '#AD1457', // pink-darken-3
    'primary-lighten': '#F48FB1', // pink-lighten-3
    secondary: '#424242', // grey-darken-3
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'premiumTheme',
    themes: {
      premiumTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
