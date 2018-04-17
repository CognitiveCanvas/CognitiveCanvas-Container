import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import app from './app'
import container from './pages/container'
import management from './pages/management'
import topbar from './components/topbar'
import conceptmap from './components/conceptmap'
import sidebar from './components/sidebar'
import sidebarToggle from './components/sidebarToggle'
import contentCard from './components/contentCard'
import mapCard from './components/mapCard'
import mapCollection from './components/mapCollection'
import noteCard from './components/noteCard'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import router from './router/index'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueCookie)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueTabs)
Vue.config.productionTip = false

var index = {
  _main: undefined,
  components: {
    // Icon components from font-awesome
    'icon' : Icon,

    // Pages
    'container' : container,
    'management' : management,

    //Container Components
    'topbar' : topbar,
    'concept-map' : conceptmap,
    'side-bar' : sidebar,
    'side-bar-toggle': sidebarToggle,
    'content-card': contentCard,
    'map-card': mapCard,
    'map-collection': mapCollection,
    'note-card': noteCard
  },
  initiate () {
    this.initiateComponents();
    this.initiateMain();
  },
  initiateComponents() {
      for (var k in this.components) {
        Vue.component(k, this.components[k]);
      }
  },
  initiateMain () {
    this._main =
      new Vue({
        el: '#app',
        router,
        render: h => h(app)
      })
  }
}

index.initiate()
