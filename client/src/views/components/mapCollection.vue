<template>
  <div :class="$style.mapCollection">
    <div :class="$style.singleMapInCollection">
<!--      <map-card :title=content.title :url=content.url></map-card>-->
      <map-card></map-card>
    </div>
  </div>
</template>

<script>
import store from '../../states/store'
  
export default {
  name: 'mapCollection',
  store,
  data() {
    return {
    }
  },
  computed: {
    label: function() {
      return store.content.state.label
    },
    contents: function() {
      return store.content.state.contents
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
