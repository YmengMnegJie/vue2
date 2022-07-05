import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    list: []
  },
  getters: {},
  mutations: {
    token(state, data) {
      state.list = data
    }
  },
  actions: {},
  modules: {},
  plugins: [persistedState()]
})
