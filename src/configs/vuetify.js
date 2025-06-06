import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default createVuetify({
  components,
  directives,
  defaults: {
    // Настройки по умолчанию для компонентов
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      // outlined: false,
      hideDetails: 'auto',
      // focused: false,
      style: 'outline ',
    },
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
    VBtn: {
      variant: 'elevated',
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
