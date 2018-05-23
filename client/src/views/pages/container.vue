<template>
  <div id="container">
    <topbar></topbar>
    <div id="map-container">
      <concept-map :source=source></concept-map>
      <side-bar />
      <side-bar-toggle />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container',
  computed: {
    source: function () {
      return this.$store.state.map.currentMap.url
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
  }
</style>
