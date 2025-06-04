import { path } from '@/configs/path'
import Home from '@/views/home/Home.vue'
import Notification from '@/views/notification/Notification.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: path.home.path,
    name: path.home.name,
    meta: {
      layout: 'app-layout',
    },
    component: Home,
  },
  {
    path: path.notification.path,
    name: path.notification.name,
    meta: {
      layout: 'app-layout',
    },
    component: Notification,
  },
]

// Vue router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
