<template>
  <div :class="$style.mapCollection">
    <div :class="$style.singleMapInCollection">
<!--      <map-card :title=content.title :url=content.url></map-card>-->
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
