import Vue from 'vue'
import Vuex from 'vuex'
import localUser from './modules/localUser'
import map from './modules/map'
import content from './modules/content'
import sidebarBehavior from './modules/sidebarBehavior'
import reporting from './modules/reporting'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    localUser: localUser,
    map: map,
    content: content,
    sidebarBehavior: sidebarBehavior,
    reporting: reporting
  },
  strict: true
})

export default store
