import Vue from 'vue'
import Vuex from 'vuex'
import token from './token'
import user from './user'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'

Vue.use(Vuex)
const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) =>
    Cookies.set(key, state, {
      expires: new Date(new Date().getTime() + 15 * 1000),
      httponly: true
    })
})
export default new Vuex.Store({
  modules: {
    token,
    user
  },
  plugins: [vuexCookie.plugin]
})
