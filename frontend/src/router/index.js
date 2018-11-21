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
      component: () => import('@/components/LogLine'),
      meta: {layout: 'leftmenu-layout'}
    },
    {
      path: '/logline/add',
      name: 'LogLineAddForm',
      component: () => import('@/components/LogLineForm')
    },
    {
      path: '/logline/:id/detail',
      name: 'LogLineDetailForm',
      component: () => import('@/components/LogLineDetailForm')
    },
    {
      path: '/logline/:id/edit',
      name: 'LogLineEditForm',
      component: () => import('@/components/LogLineForm')
    },
    {
      path: '*',
      component: () => import('@/components/NotFoundComponent')
    }
  ]
})
