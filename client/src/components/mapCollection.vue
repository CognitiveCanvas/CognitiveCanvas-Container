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
    min-width: 600px;
    width: 100%;
    background-color: whitesmoke;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: scroll;
  }
  .singleMapInCollection{
    position: default;
    width: 32%;
    min-width: 300px;
    padding-top: 1%;
    padding-left: 1%;
  }
</style>
