export default {
  state: {
    accessToken: ''
  },
  mutations: {
    setAccessToken (state, token) {
      state.accessToken = token
    }
  }
}
