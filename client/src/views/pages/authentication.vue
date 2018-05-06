<template>
  <div class="signin_page">
    <div class="signin_box">
      <img src="../../asset/logo.svg">
      <p>Use your @ucsd.edu</p>
      <div class ="login-b">
        <div class="g-signin2" id="google-signin-btn"></div>
        <p></p>
      </div>
    </div>
  </div>
  <!-- <div class="g-signin2" id="google-signin-btn"></div> -->
</template>

<script>
import axios from 'axios'
import router from '../../router/index'

export default {
  mounted() {

    //check if google is logged in but localUser does not initialize
    if (gapi.auth2 && gapi.auth2.getAuthInstance().currentUser.isSignedIn
        && ! this.$store.getters['localUser/hasLocalUser']) {
      gapi.auth2.getAuthInstance().signOut()
    }

    var self = this;
    gapi.signin2.render('google-signin-btn', {
      onsuccess: function (googleUser) {
        console.log("login on success")
        self.$store.dispatch('localUser/login', googleUser)
      }
    })
  }
}
</script>

<style>
  @import '../../../font/miso_regular_macroman/stylesheet.css';
  .g-signin2{
    margin-top: 40px;
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
    width: 410px;
    height: 625px;
    position: absolute;
    padding-bottom: 200px;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;
  }
  .signin_box p{
    font-size: 24px;
    padding:0;
    margin: 0;
    text-align: center;
  }
  .signin_box img{
    height: 450px;
    width: 380px;
    padding: 10%;
    padding-bottom: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
