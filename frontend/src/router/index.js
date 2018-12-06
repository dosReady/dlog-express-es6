import Vue from 'vue'
import Router from 'vue-router'
import jwt from 'jsonwebtoken'
import config from '../setting/config'
import store from '../store'
import axios from 'axios'

Vue.use(Router)
const isAuthenticated = async (to, from, next) => {
  const token = store.state.token.accessToken
  const user = store.state.user.data
  try {
    if (token) {
      jwt.verify(store.state.token.accessToken, config.jwt.accessSecret)
    } else {
      next('/')
    }
  } catch (error) {
    const {data} = await axios.post('/api/user/refreshToekn', {token: token, user: user})
    if (data) {
      store.commit('setAccessToken', data)
      next()
    } else {
      next('/')
    }
  } finally {
    next()
  }
}
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
      meta: {layout: 'topmenu'},
      beforeEnter: isAuthenticated
    },
    {
      path: '/blog/add',
      name: 'BlogAdd',
      component: () => import('@/pages/blog/BlogInputForm'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/blog/:id/detail',
      name: 'BlogDetail',
      component: () => import('@/pages/blog/BlogDetail'),
      meta: {layout: 'topmenu'},
      beforeEnter: isAuthenticated
    },
    {
      path: '/blog/:id/edit',
      name: 'BlogEdit',
      component: () => import('@/pages/blog/BlogInputForm'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/profile',
      name: 'ProfileMain',
      component: () => import('@/pages/profileMain'),
      meta: {layout: 'topmenu'},
      beforeEnter: isAuthenticated
    },
    {
      path: '/join',
      name: 'JoinForm',
      component: () => import('@/pages/JoinForm'),
      beforeEnter: isAuthenticated
    },
    {
      path: '*',
      component: () => import('@/pages/NotFound'),
      meta: {layout: 'topmenu'},
      beforeEnter: isAuthenticated
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
