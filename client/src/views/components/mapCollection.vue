<template>
  <div :class="$style.mapCollection">
    <div :class="$style.newMapInCollection">
      <new-map-card></new-map-card>
    </div>
    <div v-for="(map, index) in maps" v-if="map.permission=='EDIT'" :class="$style.existingMapInCollection">
      <map-card v-bind:title=map.title v-bind:url=map.url v-bind:index=index></map-card>
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
      return this.$store.state.map.maps
    }
  },
  methods: {
    
  }
}
</script>

<style module>
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
  .mapCollection{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin:1%;
  }
  .newMapInCollection{
    position: default;
    width: 32%;
    height: 100%;
    padding: 1%;
  }
  .existingMapInCollection{
    position: default;
    padding: 1%;
    width: 32%;
    height: 100%;
  }
  @media only screen and (max-width: 850px) {
    .newMapInCollection{
      position: default;
      width: 49vw;
      height: 38vh;
      padding: 1%;
    }
    .existingMapInCollection{
      position: default;
      padding: 1%;
      width: 49vw;
      height: 38vh;
    }
  }
  @media only screen and (max-width: 500px) {
    .newMapInCollection{
      position: default;
      width: 98vw;
      height: 38vh;
      padding: 1%;
    }
    .existingMapInCollection{
      position: default;
      width: 98vw;
      height: 38vh;
      padding: 1%;
    }
  }
  
</style>
