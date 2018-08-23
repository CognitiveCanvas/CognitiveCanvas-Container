<template>
  <div id="container">
    <maptopbar v-bind:mapTitle=map.title v-bind:mapUrl=map.url></maptopbar>
    
<!--
    <form ref="login" target="frame" method="post" action=map.url>
      <input type="hidden" name="username" value="web" />
      <input type="hidden" name="password" value="strate" />
    </form>
-->
    
    <div id="map-container">
      <concept-map :source=map.url></concept-map>
      <side-bar />
      <side-bar-toggle />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container',
  computed: {
    map: function () {
      return this.$store.state.map.currentMap
    }
  },
//  mounted: function () {
//    this.$nextTick(function () {
//      // Code here will run only after the 
//      // entire view has been rendered
//      console.log("Full Container mounted with, ", this.$refs.login)
//      this.$refs.login.submit()
//    })
//  }
}
</script>

<style>
  #container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: whitesmoke;
  }
  #map-container {
    width: 100%;
    height: 100%;
    margin-top: 60px;
    position: relative;
  }
</style>
