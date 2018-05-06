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
  .mapCollection{
    width: 100%;
  }
  .singleMapInCollection{
    position: default;
    width: 100%;
    height: 100%;
  }
</style>
