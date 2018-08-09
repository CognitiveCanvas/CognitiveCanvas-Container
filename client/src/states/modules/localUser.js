import LocalUser from '../../models/user'
import constants from '../../models/constants'
import router from '../../router/index'
import Map from '../../models/map'
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
  }
}

const getters = {
  hasLocalUser (state) {
    return !! state.localUser
  }
}

const actions = {
  async login (context, googleUser) {
    let guser = {
      firstName: googleUser.getBasicProfile().getGivenName(),
      lastName: googleUser.getBasicProfile().getFamilyName(),
      email: googleUser.getBasicProfile().getEmail(),
      token: googleUser.getAuthResponse().id_token
    }
    
    //console.log('guser', guser)

    // get user information from the database
    let userRes = null

    await Axios
      .get(`${constants.api}/syncUser`, {
        params: {
          email: guser.email
        }
      })
      .then((res) => {
        userRes = res.data
        console.log('user res', userRes)
      })
      .catch(function (error) {
        bugsnagClient.notify(error)
      })

      console.log('sync user')

    // check whitelist status
    if (!userRes.authorized) {
      gapi.auth2
        .getAuthInstance()
        .signOut()
        .then(() => {
          console.log('unauthorized user ' + guser.email + ' attemps to login')
          // TODO: log unauthorized attempt login in database
        })
      return
    }

    // initialize user if not exist otherwise re-sync data
    // FIXME: is it even possible to have case that user oject exists before login?
    if (!!!context.state.localUser) {
      await context.commit('onLogin', userRes.user)
    }
    context.commit('sync', userRes.user)
    context.dispatch('map/syncMaps', userRes.maps, {root: true})
    console.log("push management")
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
