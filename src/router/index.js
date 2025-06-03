import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'app-layout',
    },
    component: () => import('@/views/home/HomePage.vue'),
  },
]

// Vue router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
