<template>
  <div :class="$style.mapCollection">
    <div :class="$style.singleMapInCollection">
<!--      <map-card :title=content.title :url=content.url></map-card>-->
      <map-card></map-card>
    </div>
    <div :class="$style.singleMapInCollection">
      <map-card></map-card>
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
    label: function() {
      return this.$store.content.state.label
    },
    contents: function() {
      return this.$store.content.state.contents
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
