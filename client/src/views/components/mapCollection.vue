<template>
  <div :class="$style.mapCollection">
    
    <div :class="$style.singleMapInCollection">
      <new-map-card></new-map-card>
    </div>
    <div v-for="(map, index) in maps" :class="$style.singleMapInCollection">
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
  }
  .singleMapInCollection{
    position: default;
    width: 100%;
    height: 100%;
  }
</style>
