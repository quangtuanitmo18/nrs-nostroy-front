import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@vuepic/vue-datepicker/dist/main.css';

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import router from '@/router';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount('#app');
