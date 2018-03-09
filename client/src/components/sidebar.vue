<template>
  <div class="sideBar">
    <span onclick="this.parentElement.style.display='none'" class="topright">&times</span>
    <div v-for="content in contents">
      <content-card :title=content.title :url=content.url :type=content.type></content-card>
    </div>
    <div v-for="note in notes">
      
    </div>
  </div>
</template>

<script>
import contentStore from '../stores/content'

export default {
  name: 'sideBar',
  contentStore,
  data() {
    return {
    }
  },
  computed: {
    label: function() {
      return contentStore.state.label;
    },
    contents: function() {
      return contentStore.state.contents;
    }
  },
  methods: {
  }
}
</script>

<style>
  .sideBar {
    position: absolute;
    height: 100%;
    width: 25%;
    background-color: white;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    z-index: 10;
    right: 0px;
  }
  .topright {
    cursor: pointer;
    font-size: 28px;
  }
</style>