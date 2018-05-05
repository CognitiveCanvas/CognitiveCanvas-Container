import LocalUser from '../../models/user'
import constants from '../../models/constants'
import router from '../../router/index'
import Axios from 'axios'

const state = {
  localUser: null
}

const mutations = {
  onLogin (state, email) {
    state.localUser = new LocalUser(email)
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
    console.log("start login")
    let user = {
      firstName: googleUser.getBasicProfile().getGivenName(),
      lastName: googleUser.getBasicProfile().getFamilyName(),
      email: googleUser.getBasicProfile().getEmail(),
      token: googleUser.getAuthResponse().id_token
    }

    if (!context.state.localUser) {
      await Axios
        .post(`${constants.api}/syncUser`, {'email': user.email})
        .then(function (res) {
          if (res.data.authorized) {
            context.commit('onLogin', res.data.user)
          } else {
            var auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut().then(function () {
              console.log('User not part of whitelist, signed out.')
            })
          }
        })
        .catch(function (error) {
          bugsnagClient.notify(error)
          console.log(error)
        })
    }

    console.log("localuser", context.state.localUser)

    if (context.state.localUser) {
      await Axios
        .post(`${constants.api}/login`, user.email)
        .then(function (res) {
          router.push('management')
        })
        .catch(function (error) {
          bugsnagClient.notify(error)
          console.log(error)
        })
    }
  },
  logout (context) {
    console.log("gapi", !!gapi)
    console.log("auth2", !!gapi.auth2)
    var auth2 = gapi.auth2.getAuthInstance()
    auth2
      .signOut()
      .then(function () {
        console.log('User signed out.')
        context.commit('onLogout')
        router.push('login')
      })
  },
  sync (context, email) {
    Axios
      .get(`${constants.api}/syncUser`, email)
      .then(function (res) {
        if (res.data.authorized) {
          context.commit('sync', res.data.user)
        }
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
