import '@mdi/font/css/materialdesignicons.css'
import '@vuepic/vue-datepicker/dist/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import { vMaska } from 'maska/vue'

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

const app = createApp(App)

// Глобальный обработчик ошибок
app.config.errorHandler = (err, instance, info) => {
  console.error('Глобальная ошибка:', err)
  console.error('Экземпляр компонента:', instance)
  console.error('Информация:', info)

  // Можно также отправить ошибку в систему аналитики или на сервер
}

app
  .use(router)
  .use(vuetify)
  .directive('maska', vMaska)
  .use(VueQueryPlugin, { queryClient })
  .mount('#app')
