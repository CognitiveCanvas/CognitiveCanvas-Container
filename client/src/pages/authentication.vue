<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
</template>

<script>
  import axios from 'axios'
  const API = `http://${window.location.hostname}:8081`

  export default {
    data () {
      return {
        /**
         * The Auth2 parameters, as seen on
         * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
         * As the very least, a valid client_id must present.
         * @type {Object}
         */
        googleSignInParams: {
          client_id: '808266692102-5mmtiel3cvue10q5t7ibnjlui94f5d96.apps.googleusercontent.com'
        }
      }
    },
    methods: {
      onSignInSuccess (googleUser) {
        var user = {
          firstName: googleUser.getBasicProfile().getGivenName(),
          lastName: googleUser.getBasicProfile().getFamilyName(),
          email: googleUser.getBasicProfile().getEmail(),
          token: googleUser.getAuthResponse().id_token
        }
        axios.post(`${API}/register`, user)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      onSignInError (error) {
        // `error` contains any error occurred.
      }
    }
  }
</script>

<style>
  .g-signin-button {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }
</style>
