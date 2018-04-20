<template>
  <div class="signin_page">
    <div class="signin_box">
      <div class="logo"><h1>Cognitive Canvas</h1></div>
      <div class ="login-b">
        <g-signin-button 
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          <p>Sign in with Google</p> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
     width="40" height="40"
     viewBox="0 0 252 252"
     style="fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,252v-252h252v252z" fill="none"></path><g fill="#ffffff"><g id="surface1"><path d="M228.94922,105.43066h-8.44922v-0.43066h-94.5v42h59.34961c-8.67481,24.44531 -31.93067,42 -59.34961,42c-34.80176,0 -63,-28.19824 -63,-63c0,-34.80176 28.19824,-63 63,-63c16.05762,0 30.67969,6.04981 41.79492,15.95508l29.69531,-29.69531c-18.74414,-17.47266 -43.8252,-28.25977 -71.49024,-28.25977c-57.99609,0 -105,47.00391 -105,105c0,57.99609 47.00391,105 105,105c57.99609,0 105,-47.00391 105,-105c0,-7.03418 -0.71777,-13.90429 -2.05078,-20.56934z"></path><path d="M33.09961,77.12988l34.51464,25.30664c9.33106,-23.11231 31.93067,-39.43652 58.38574,-39.43652c16.05762,0 30.67969,6.04981 41.79492,15.95508l29.69531,-29.69531c-18.74414,-17.47266 -43.8252,-28.25977 -71.49024,-28.25977c-40.33887,0 -75.30469,22.76367 -92.90039,56.12988z"></path><path d="M126,231c27.11133,0 51.76172,-10.37695 70.40332,-27.25488l-32.50488,-27.50098c-10.54101,7.97754 -23.64551,12.75586 -37.89844,12.75586c-27.31641,0 -50.49023,-17.41113 -59.22656,-41.71289l-34.24804,26.37304c17.37011,34.00196 52.66406,57.33984 93.47461,57.33984z"></path><path d="M228.94922,105.43066h-8.44922v-0.43066h-94.5v42h59.34961c-4.16309,11.75098 -11.73047,21.86133 -21.47168,29.24414c0.02051,0 0.02051,0 0.02051,0l32.50488,27.50098c-2.29687,2.07129 34.59668,-25.24512 34.59668,-77.74512c0,-7.03418 -0.71777,-13.90429 -2.05078,-20.56934z"></path></g></g></g></svg>
        </g-signin-button>
      </div>
    </div>
  </div>
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
    width: 230px;
    height: 50px;
    padding: 8px 8px;
    font-size: 18px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    bottom: 0;
    position: absolute;
    margin-bottom: 50px;
    vertical-align: text-top;
  }
  .g-signin-button p{
    padding-top: 3px;
    padding-left: 5px;
    float:left;
  }
  .g-signin-button:hover{
    opacity: 0.7;
  }
  .g-signin-button svg{
    margin-left: 10px;
    padding-bottom: 5px;
  }

  .login-b{
    margin: 0 auto;
    width: 200px;
    height: 100px;
  }
  .logo {
    text-align: center;
    color:white;
    width: 75%;
    margin: 0 auto;
  }
  .signin_page{
    width:100%;
    height:100%;
    top:0px;
    background-color: #182B49;
  }
  .signin_box{
    width: 33%;
    height: 300px;
    position: absolute;
    padding-bottom: 200px;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;
  }
</style>
