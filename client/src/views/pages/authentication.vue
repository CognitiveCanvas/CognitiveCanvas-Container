<template>
  <div class="g-signin2" id="google-signin-btn"></div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index'
import store from '../../states/store'

export default {
  store,
  mounted() {
    gapi.signin2.render('google-signin-btn', {
      onsuccess: store.localUser.login
    })
  }
}
</script>

<style>
</style>
