import Vue from 'vue'
import Vuex from 'vuex'
import sidebarBehavior from './modules/sidebar-behavior'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    sidebarBehavior
  },
  strict: debug
})