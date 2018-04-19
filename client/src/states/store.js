import Vue from 'vue'
import Vuex from 'vuex'
import localUser from './modules/localUser'
import map from './modules/map'
import content from './modules/content'
import sidebarBehavior from './modules/sidebar-behavior'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    localUser: localUser,
    map: map,
    content: content,
    sidebarBehavior: sidebarBehavior
  },
  strict: debug
})

export default store
