import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginForm',
      component: () => import('@/components/LoginForm')
    },
    {
      path: '/logline',
      name: 'LogLine',
      component: () => import('@/components/LogLine')
    },
    {
      path: '/logline/add',
      name: 'LogLineAddForm',
      component: () => import('@/components/LogLineForm')
    },
    {
      path: '/logline/:id/detail',
      name: 'LogLineDetailForm',
      component: () => import('@/components/LogLineForm')
    },
    {
      path: '/logline/:id/edit',
      name: 'LogLineEditForm',
      component: () => import('@/components/LogLineForm')
    }
  ]
})
