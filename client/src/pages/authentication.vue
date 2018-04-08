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
      console.log("User signed in");
      var user = {
        firstName: googleUser.getBasicProfile().getGivenName(),
        lastName: googleUser.getBasicProfile().getFamilyName(),
        email: googleUser.getBasicProfile().getEmail(),
        token: googleUser.getAuthResponse().id_token
      }
      // send user to backend
      axios.post(`${API}/register`, user)
        .then(function (response) {
          console.log("Hello");
          console.log(response);
          router.push(`map`); // may be a temporary fix
        })
        .catch(function (error) {
          bugsnagClient.notify(error);
          console.log(error);
        })
    }
  },
  mounted() {
    gapi.signin2.render('google-signin-btn', { // this is the button "id"
      onsuccess: this.onSignIn // note, no "()" here
    })
  }
}
</script>

<style>
</style>
