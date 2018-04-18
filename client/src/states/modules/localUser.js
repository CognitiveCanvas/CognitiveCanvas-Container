import LocalUser from "@models/user.js"
import API from "@models/constants"
import Axios from 'axios'

const state = {
  localUser: null
}

const mutations = {
  onLogin (state, id) {
    state.localUser = new LocalUser(id)
  },
  onLogout(state, { params })
}

const actions = {
  login(googleUser) {
    let user = {
      firstName: googleUser.getBasicProfile().getGivenName(),
      lastName: googleUser.getBasicProfile().getFamilyName(),
      email: googleUser.getBasicProfile().getEmail(),
      token: googleUser.getAuthResponse().id_token
    }

    Axios
      .post(`${API}/register`, user)
      .then(function (response) {
        // check if the user is in the whitelist
        let whitelisted = response.data;

        if (whitelisted) {
          //FIXIT: Check with michael with the specific data response
          context.commit('onLogin', response.data.id);
        } 
        else {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log(whitelisted);
            console.log('User not part of whitelist, signed out.');
          });
        }
      })
      .catch(function (error) {
        bugsnagClient.notify(error);
        console.log(error);
      })
  },
  logout() {

  }
}

export default {
    state,
    actions,
    mutations
}