import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      redirect: '/search'
   },
   {
      path: '/search',
      component: () => import('src/layouts/layout-default.vue'),
      children: [
         { path: '', component: () => import('pages/search.vue') },
         { path: '/:id', component: () => import('pages/details.vue') }
      ]
   },
   {
      path: '/favorites',
      component: () => import('src/layouts/layout-default.vue'),
      children: [
         { path: '', component: () => import('pages/favorites.vue') },
         { path: '/:id', component: () => import('pages/details.vue') }
      ]
   },
   {
      path: '/blacklist',
      component: () => import('src/layouts/layout-default.vue'),
      children: [
         { path: '', component: () => import('pages/blacklist.vue') },
         { path: '/:id', component: () => import('pages/details.vue') }
      ]
   },

   // Always leave this as last one,
   // but you can also remove it
   {
      path: '/:catchAll(.*)*',
      component: () => import('pages/error404.vue')
   }
]

export default routes
