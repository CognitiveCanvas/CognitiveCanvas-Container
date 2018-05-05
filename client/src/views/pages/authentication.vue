<template>
  <div class="g-signin2" id="google-signin-btn"></div>
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
</style>
