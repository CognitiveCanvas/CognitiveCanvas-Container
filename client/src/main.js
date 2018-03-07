import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import app from './app'
import container from './pages/container'
import topbar from './components/topbar'
import conceptmap from './components/conceptmap'
import sideBar from './components/sideBar'
import contentCard from './components/contentCard'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import router from './router/index'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(VueCookie)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.config.productionTip = false

var index = {
  _main: undefined,
  components: {
    // Icon components from font-awesome
    'icon' : Icon,

    // Pages
    'container' : container,

    //Container Components
    'topbar' : topbar,
    'concept-map' : conceptmap,
    'side-bar' : sideBar,
    'content-card': contentCard
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
