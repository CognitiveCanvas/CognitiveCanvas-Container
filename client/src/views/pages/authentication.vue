<template>
  <div class="g-signin2" id="google-signin-btn"></div>
</template>

<script>
import axios from 'axios'
import router from '../router/index'
const API = `http://${window.location.hostname}:8081`
export default {
  methods: {
    onSignIn: function(googleUser) {
      var user = {
        firstName: googleUser.getBasicProfile().getGivenName(),
        lastName: googleUser.getBasicProfile().getFamilyName(),
        email: googleUser.getBasicProfile().getEmail(),
        token: googleUser.getAuthResponse().id_token
      }
      console.log("User signed in", user.email);
      // send user to backend
      axios.post(`${API}/register`, user)
        .then(function (response) {
          console.log(response);
          // check if the user is in the whitelist
          var whitelisted = response.data;
          if (whitelisted) {
            router.push(`map`); // may be a temporary fix
          } else {
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
    }
  },
  mounted() {
    gapi.signin2.render('google-signin-btn', {
      onsuccess: this.onSignIn
    })
  }
}
</script>

<style>
</style>
