import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const customLightTheme = {
  dark: false,
  colors: {
    // Основные цвета Vuetify

    primary: '#c0c1c3', // --color-gray-primary
    secondary: '#495057aa', // --color-secondary
    error: '#d8101c', // --text-error
    info: '#16aaff', // --text-info
    success: '#73a839', // --text-success
    warning: '#fc6815', // --text-warning

    // Дополнительные цвета из вашей схемы
    'text-primary': '#5382b2',
    'text-main': '#505863',
    'text-secondary': '#303029',
    'text-highlight': '#820711',

    'blue-dark': '#3d7bb3',
    'blue-dark-2': '#2f75aa',
    'blue-light': '#eef3f9',
    'white-secondary': '#f5f5f5',

    'error-table': '#ff00006b',
    'warning-table': '#f39c126b',
    'success-table': '#73a8396b',

    black: '#505863',
  },
}

export default createVuetify({
  components,
  directives,
  // theme: {
  //   defaultTheme: 'customLightTheme',
  //   themes: {
  //     customLightTheme,
  //   },
  // },
  defaults: {
    // Настройки по умолчанию для компонентов
    // VTextField: {S
    //   variant: 'outlined',
    //   density: 'comfortable',
    //   // outlined: false,
    //   hideDetails: 'auto',
    //   // focused: false,
    //   style: 'outline ',
    // },

    VSelect: {
      variant: 'outlined',
      density: 'comfortable',

      hideDetails: 'auto',
    },
    VAutocomplete: {
      variant: 'outlined',
      density: 'comfortable',

      hideDetails: 'auto',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',

      hideDetails: 'auto',
    },
    VCheckbox: {
      density: 'comfortable',
    },
    VRadio: {
      density: 'comfortable',
    },

    VCard: {
      variant: 'elevated',
    },
    VTable: {
      density: 'comfortable',
    },
    VPagination: {
      density: 'comfortable',
    },
  },
})
