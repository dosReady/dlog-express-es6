import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // redirect: '/blog'
      name: 'Root',
      component: () => import('@/pages/login/LoginContainer')
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
      component: () => import('@/pages/profileMain'),
      meta: {layout: 'topmenu'}
    },
    {
      path: '/join',
      name: 'JoinForm',
      component: () => import('@/pages/JoinForm')
    },
    {
      path: '*',
      component: () => import('@/pages/NotFound'),
      meta: {layout: 'topmenu'}
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
