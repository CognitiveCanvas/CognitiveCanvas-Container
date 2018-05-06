<template>
  <div :class="$style.mapCollection">
    <div :class="$style.singleMapInCollection">
<!--      <map-card :title=content.title :url=content.url></map-card>-->
      <map-card></map-card>
    </div>
  </div>
</template>

<script>
import contentStore from '../stores/content'
  
export default {
  name: 'mapCollection',
  contentStore,
  data() {
    return {
    }
  },
  computed: {
    label: function() {
      return contentStore.state.label
    },
    contents: function() {
      return contentStore.state.contents
    }
  },
  methods: {
    
  }
}
</script>

<style module>
@font-face {
    font-family: 'miso-regular';
    src: url('../miso_regular_macroman/miso-regular-webfont.woff2') format('woff2'),
         url('../miso_regular_macroman/miso-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'miso-bold';
    src: url('../miso_bold_macroman/miso-bold-webfont.woff2') format('woff2'),
         url('../miso_bold_macroman/miso-bold-webfont.woff') format('woff');
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
