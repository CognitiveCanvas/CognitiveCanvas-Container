<template>
  <div class="login_container">
    <v-container class="card_container">
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 sm6 md6 lg6>
        <v-card class="logo_button_container">
          <v-card-text>
            <br>
            <p class="logo_text text-xs-center">Cognitive Canvas</p>
          </v-card-text>
          
          <v-layout align-center justify-center column fill-height>
            <img src="../../asset/cogcanvas-logo.svg">
            <br>
            <br>
            <v-flex>
                <div id="google-signin-btn"></div>
            </v-flex>
            
            <br>
            <br>
          </v-layout> 
        </v-card>
        
        <v-card-text>
            <br>
            <p class="tagline_text text-xs-center">Concepts, from paper to pixels</p>
        </v-card-text>

      </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index'

export default {
  name: 'Login',
  methods: {
    onSignIn(googleUser) {
      console.log("login on success")
      this.$store.dispatch('localUser/login', googleUser)
    },
    onSignInFailure() {
      console.log("sign in failure")
    }
  },
  beforeCreate() {
    let initiateSignIn = () => {
      let self = this
      // This is a work around about the issue of sign in only work upon refresh
      gapi.load('auth2', function() {
        let auth2 = gapi.auth2.init()
        // Listen for sign-in state changes.
        auth2.isSignedIn.listen(signInChanged.bind(self))

        // Sign in the user if they are currently signed in.
        if (auth2.isSignedIn.get() == true) {
          auth2.signIn()
        }
      })
    }

    let signInChanged = (val) => {
      console.log("in signInChanged", this)
      console.log('Signin state changed to ', val)
      if (val) this.$store.dispatch('localUser/login', 
        gapi.auth2.getAuthInstance().currentUser.get())
    }

    initiateSignIn()
  },
  mounted() {
    //check if google is logged in but localUser does not initialize
    if (gapi.auth2 && gapi.auth2.getAuthInstance().currentUser.isSignedIn
        && ! this.$store.getters['localUser/hasLocalUser']) {
      gapi.auth2.getAuthInstance().signOut()
    }
    gapi.signin2.render('google-signin-btn', {
        'width': 250,
        'height': 45,
        'longtitle': true
    })
  } 
}
</script>

<style>
  @font-face {
    font-family: 'miso-regular';
    src: url('../../asset/font/miso_regular_macroman/miso-regular-webfont.woff2') format('woff2'),
         url('../../asset/font/miso_regular_macroman/miso-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'miso-bold';
    src: url('../../asset/font/miso_bold_macroman/miso-bold-webfont.woff2') format('woff2'),
         url('../../asset/font/miso_bold_macroman/miso-bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  *{
    font-family: "miso-regular"
  }
  
  .login_container {
    background-color: #006A96;
    width: 100%;
    height: 100%;
  }
  .card_container {
    height: 100%;
  }
  .logo_text {
    font-size: 90px;
    color: #182B49;
    letter-spacing: -5px;
    line-height: 80px;
  }
  .tagline_text {
    font-size: 50px;
    color: #FFFFFF;
    letter-spacing: 0.37px;
  }
  
</style>