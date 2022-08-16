export default [
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    path: '/500',
    component: () => import('@/views/error-page/500.vue'),
  },
]