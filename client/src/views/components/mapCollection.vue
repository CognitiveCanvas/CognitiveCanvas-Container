<template>
  <div :class="$style.mapCollection">
    <div v-for="map in maps" :class="$style.singleMapInCollection">
      <map-card :lastEdit=map.lastEditTime :url=map.url></map-card>
    </div>
    <div :class="$style.singleMapInCollection">
      <map-card ></map-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapCollection',
  data() {
    return {
    }
  },
  computed: {
    maps: function() {
      return this.$store.map.maps
    }
  },
  methods: {
    
  }
}
</script>

<style module>
  .mapCollection{
    width: 100%;
    height: 94%;
    background-color: whitesmoke;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: scroll;
  }
  .singleMapInCollection{
    position: default;
    width: 32%;
    padding-top: 1%;
    padding-left: 1%;
  }
</style>
