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
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

// Create a QueryClient with your options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(router).use(vuetify).use(VueQueryPlugin, { queryClient }).mount('#app')
