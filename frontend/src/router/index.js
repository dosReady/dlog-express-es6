import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/logline'
    },
    {
      path: '/logline',
      name: 'LogLine',
      component: () => import('@/pages/logline/LogLine'),
      meta: {layout: 'topmenu'}
    },
    {
      path: '/logline/add',
      name: 'LogLineAddForm',
      component: () => import('@/pages/logline/LogLineForm')
    },
    {
      path: '/logline/:id/detail',
      name: 'LogLineDetailForm',
      component: () => import('@/pages/logline/LogLineDetailForm'),
      meta: {layout: 'topmenu'}
    },
    {
      path: '/logline/:id/edit',
      name: 'LogLineEditForm',
      component: () => import('@/pages/logline/LogLineForm')
    },
    {
      path: '*',
      component: () => import('@/pages/NotFoundComponent')
    }
  ]
})
