<template>
  <div class="g-signin2" id="google-signin-btn"></div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index'

export default {
  mounted() {
    console.log(this.$store);
    var self = this;
    gapi.signin2.render('google-signin-btn', {
      onsuccess: function (googleUser) {
        self.$store.dispatch('localUser/login', googleUser)
      }
    })
  }
}
</script>

<style>
</style>
