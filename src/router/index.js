import { path } from '@/configs/path'
import { createRouter, createWebHistory } from 'vue-router'

// Компонент для отображения ошибок маршрутизации
const ErrorPage = () => import('@/views/ErrorPage.vue')

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
  // Добавляем маршрут для обработки ошибок
  {
    path: '/error',
    name: 'error',
    meta: { layout: 'simple-layout' },
    component: ErrorPage,
    props: route => ({ error: route.params.error }),
  },
  // Обработка 404 - страница не найдена
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    meta: { layout: 'simple-layout' },
    component: ErrorPage,
    props: { code: 404, title: 'Страница не найдена', message: 'Страница не найдена' },
  },
]

// Vue router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Обработка ошибок маршрутизации
router.onError(error => {
  console.error('Ошибка маршрутизации:', error)

  // Перенаправление на страницу ошибки
  router.push({
    name: 'error',
    params: { error: { message: error.message } },
    replace: true,
  })
})

export default router
