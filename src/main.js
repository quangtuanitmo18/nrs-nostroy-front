import '@mdi/font/css/materialdesignicons.css'
import '@vuepic/vue-datepicker/dist/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// TanStack Query
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './configs/query'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(router).use(vuetify).use(VueQueryPlugin, { queryClient }).mount('#app')
