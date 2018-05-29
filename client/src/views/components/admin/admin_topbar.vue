<template>
  <nav class="title navbar navbar-expand-lg navbar-light bg-white" id="myNav">
  <div class="container-fluid">
      <div class="navbar-header">
          <button id="bt" class="navbar-brand" @click="navToSys">System</button>
          <button id="bt" class="navbar-brand" @click="navToUser">Single User</button>
          <button id="bt" class="navbar-brand" @click="navToMap">Single Map</button>
      </div>
  </div>
  </nav>
</template>

<script>
import router from '../../../router/index'

export default {
    name: 'admin_topbar',

    data () {
      return {
      }
    },

    methods: {
      navToSys: function() {
        router.push({ name: "AdminPage" });
      },
      navToUser: function() {
        router.push({ name: "userStat" });
      },
      navToMap: function() {
        router.push({ name: "mapStat" });
      }
    }
}
</script>

<style>
#bt {
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
}
</style>
