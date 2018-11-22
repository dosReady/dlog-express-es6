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
      component: () => import('@/components/logline/LogLine'),
      meta: {layout: 'leftmenu'}
    },
    {
      path: '/logline/add',
      name: 'LogLineAddForm',
      component: () => import('@/components/logline/LogLineForm')
    },
    {
      path: '/logline/:id/detail',
      name: 'LogLineDetailForm',
      component: () => import('@/components/logline/LogLineDetailForm'),
      meta: {layout: 'leftmenu'}
    },
    {
      path: '/logline/:id/edit',
      name: 'LogLineEditForm',
      component: () => import('@/components/logline/LogLineForm')
    },
    {
      path: '*',
      component: () => import('@/components/NotFoundComponent')
    }
  ]
})
