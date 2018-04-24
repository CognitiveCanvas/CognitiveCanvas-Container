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
  onLogout (state, { params }) {
    state.localUser = null
    router.push({ path: 'login' })
  }
}

const getters = {
  hasLocalUser (state) {
    return !! state.localUser
  }
}

const actions = {
  login (context, googleUser) {
    console.log("start login")
    let user = {
      firstName: googleUser.getBasicProfile().getGivenName(),
      lastName: googleUser.getBasicProfile().getFamilyName(),
      email: googleUser.getBasicProfile().getEmail(),
      token: googleUser.getAuthResponse().id_token
    }

    Axios
      .post(`${constants.api}/login`, user)
      .then(function (response) {
        // check if the user is in the whitelist
        let whitelisted = response.data

        if (whitelisted) {
          context.commit('onLogin', user.email)
          console.log('local user', context.state.localUser)
          router.push({ path: 'map' })
        } else {
          var auth2 = gapi.auth2.getAuthInstance()
          auth2.signOut().then(function () {
            console.log(whitelisted)
            console.log('User not part of whitelist, signed out.')
          })
        }
      })
      .catch(function (error) {
        bugsnagClient.notify(error)
        console.log(error)
      })
  },
  logout (context) {
    
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
