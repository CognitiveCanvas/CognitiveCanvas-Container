import LocalUser from '../../models/user'
import constants from '../../models/constants'
import Axios from 'axios'

const state = {
  localUser: null
}

const mutations = {
  onLogin (state, email) {
    state.localUser = new LocalUser(email)
  },
  onLogout (state, { params }) {

  }
}

const getters = {
  hasLocalUser (state) {
    return !! state.localUser
  }
}

const actions = {
  login (module, googleUser) {
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
          module.commit('onLogin', user.email)
          console.log('local user', module.state.localUser)
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
  logout () {

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
