import { createRouter, createWebHistory, RouteRecordRaw, } from 'vue-router'
import layout from '@/layout/index.vue'
import errorRouter from './errorRouter'
import { store } from '../store'
import { RootMutations } from '../store/type'
import nProgress from "nprogress"
import { getQueryString } from '@/lib/utils'
import { getToken } from '@/lib/storage'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/test',
  },
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/test/index.vue')
      }
    ]
  },
  ...errorRouter,
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]


if (!getToken() || window.location.href.includes('token')) {
  const token = getQueryString('token');
  store.commit(RootMutations.SET_TOKEN, token)
}


const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
  routes: routes,
})

router.beforeEach((from, to, next) => nProgress.start() && next());

router.afterEach(() => nProgress.done());

export default router