<template>
  <div class="signin_page">
    <div class="signin_box">
      <img src="../../asset/logo.png">
      <div class="line_box"></div>
      <p>Sign-in with your @ucsd.edu</p>
      <div class ="login-b">
        <div class="g-signin2" id="google-signin-btn"></div>
      </div>
      
    <h1>Concepts, from paper to pixels</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index'

export default {
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

      // Listen for changes to current user.
      //auth2.currentUser.listen(userChanged.bind(self))

      // Sign in the user if they are currently signed in.
      if (auth2.isSignedIn.get() == true) {
        auth2.signIn()
      }
    })
  }

    let signInChanged = (val) => {
      console.log("in", this)
      console.log('Signin state changed to ', val)
      if (val) this.$store.dispatch('localUser/login', 
        gapi.auth2.getAuthInstance().currentUser.get())
    }

    /*
    let userChanged = (user) => {
      console.log('user', user)
    }
    */

    initiateSignIn()
  },
  mounted() {

    //check if google is logged in but localUser does not initialize
    if (gapi.auth2 && gapi.auth2.getAuthInstance().currentUser.isSignedIn
        && ! this.$store.getters['localUser/hasLocalUser']) {
      gapi.auth2.getAuthInstance().signOut()
    }

    console.log("mounted")
    gapi.signin2.render('google-signin-btn')
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
  .g-signin2{
    margin-top: 20px;
    margin-left: 40px; 
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
    background-image: url("../../asset/Background.png");
    width:100%;
    height:100%;
    top:0px;
    background-size: cover;
  }
  .signin_box{
    /* Rectangle 2: */
    background: #FCE946;
    box-shadow: 0 13px 4px 0 rgba(0,0,0,0.50);
    border-radius: 8px;
    width: 375px;
    height: 550px;
    position: absolute;
    padding-bottom: 0;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-top:60px;
  }
  .line_box{
  	border-top: 5px solid black;
  	padding-bottom: 20px;
  	width: 300px;
  	margin: auto;

  }
  .signin_box p{
    font-size: 24px;
    padding:0;
    margin: 0;
    text-align: center;
  }
  .signin_page h1{
  	width: 100%;
  	font-size: 38px;
    color:white;
    margin-top: 50px;
    text-align: center;
  }
  .signin_box img{
    height: 375px;
    width: 350px;
    padding: 10%;
    padding-bottom: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
