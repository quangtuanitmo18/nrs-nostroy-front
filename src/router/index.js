import { path } from '@/configs/path'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: path.home.path,
    name: path.home.name,
    meta: { layout: 'app-layout' },
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home.vue'),
  },
  {
    path: path.notification.path,
    name: path.notification.name,
    meta: { layout: 'app-layout' },
    component: () =>
      import(/* webpackChunkName: "notification" */ '@/views/notification/Notification.vue'),
  },
]

// Vue router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
