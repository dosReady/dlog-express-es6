import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/blog'
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('@/pages/blog/BlogList'),
      meta: {layout: 'topmenu'}
    },
    {
      path: '/blog/add',
      name: 'BlogAdd',
      component: () => import('@/pages/blog/BlogInputForm')
    },
    {
      path: '/blog/:id/detail',
      name: 'BlogDetail',
      component: () => import('@/pages/blog/BlogDetail'),
      meta: {layout: 'topmenu'}
    },
    {
      path: '/blog/:id/edit',
      name: 'BlogEdit',
      component: () => import('@/pages/blog/BlogInputForm')
    },
    {
      path: '/profile',
      name: 'ProfileMain',
      component: () => import('@/pages/profile/profileMain'),
      meta: {layout: 'topmenu'}
    },
    {
      path: '*',
      component: () => import('@/pages/NotFoundComponent'),
      meta: {layout: 'topmenu'}
    }
  ]
})
