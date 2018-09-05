<template>
  <div id="container">
    <top-toolbar v-bind:mapTitle=map.title v-bind:mapUrl=map.url></top-toolbar>
    <div id="map-container">
      <concept-map :source=map.url></concept-map>
      <side-bar />
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
  }
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
