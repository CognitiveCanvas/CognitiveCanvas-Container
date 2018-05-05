import LocalUser from '../../models/user'
import constants from '../../models/constants'
import router from '../../router/index'
import Axios from 'axios'

const state = {
  localUser: null
}

const mutations = {
  onLogin (state, user) {
    state.localUser = new LocalUser(user.email)
    this.sync(state, user)
  },
  onLogout (state) {
    state.localUser = null
  },
  sync (state, user) {
    state.localUser.firstName = user.firstName
    state.localUser.lastName = user.lastName
    state.localUser.maps = user.maps
  }
}

const getters = {
  hasLocalUser (state) {
    return !! state.localUser
  }
}

const actions = {
  async login (context, googleUser) {
    let user = {
      firstName: googleUser.getBasicProfile().getGivenName(),
      lastName: googleUser.getBasicProfile().getFamilyName(),
      email: googleUser.getBasicProfile().getEmail(),
      token: googleUser.getAuthResponse().id_token
    }

    // get user information from the database
    await Axios
      .get(`${constants.api}/syncUser`, {'email': user.email})
      .then((res) => {
        var userRes = res.data
      })
      .catch(function (error) {
        bugsnagClient.notify(error)
      })

    // check whitelist status
    if (!userRes.authorized) {
      gapi.auth2
        .getAuthInstance()
        .signOut()
        .then(() => {
          console.log('unauthorized user ' + user.email + ' attemps to login')
          // TODO: log unauthorized attempt login in database
        })
      return
    }

    // initialize user if not exist otherwise re-sync data
    // FIXME: is it even possible to have case that user oject exists before login?
    context.state.localUser ?
      context.commit('sync', userRes.user) :
      context.commit('onLogin', userRes.user)

    if (!context.state.localUser) {
      context.commit('onLog')
    }

    router.push('management')
  },
  logout (context) {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(function () {
        console.log('User signed out.')
        context.commit('onLogout')
        router.push('login')
      })
  }
}

const localUser = {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}

export default localUser
