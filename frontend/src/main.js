// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'es6-promise/auto'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars.js'
import 'codemirror/addon/display/placeholder.js'
import 'codemirror/theme/material.css'
import 'github-markdown-css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faGoogle, faFacebook} from '@fortawesome/fontawesome-free-brands'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Ajax from '@/common/ajax.js'
import store from './store'

library.add(fas, faGoogle, faFacebook)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueCodemirror)
Vue.use(Ajax)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$eventbus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
