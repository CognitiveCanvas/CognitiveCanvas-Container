<template>
  <div :class="$style.sidebar">
<!--    <span onclick="this.parentElement.style.display='none'" class="topright">&times</span>-->
    <div v-for="content in contents">
      <content-card :title=content.title :url=content.url :type=content.type></content-card>
    </div>
<!--
    <div v-for="note in notes">
      
    </div>
-->
  </div>
</template>

<script>
import contentStore from '../stores/content'
import sidebarStore from '../stores/sidebar-store'
import {TweenMax, Power4} from 'gsap'

export default {
  name: 'sideBar',
  contentStore,
  sidebarStore,
  data() {
    return {
    }
  },
  mounted () {
    TweenMax.set(this.$el, {
      x: this.$el.offsetWidth
    })
  },
  computed: {
    label: function() {
      return contentStore.state.label
    },
    contents: function() {
      return contentStore.state.contents
    },
    open () {
      return sidebarStore.state.sidebarBehavior.sidebarOpen
    }
  },
  methods: {
  },
  watch: {
    open: function (open) {
      const dX = open ? 0 : this.$el.offsetWidth
      TweenMax.to(this.$el, 0.6, {
        x: dX,
        ease: Power4.easeOut
      })
    }
  }
}
</script>

<!--
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
</style>-->

<style module>
  .sidebar{
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    max-width: 90vw;
    background-color: var(--accent-color);
  }
</style>
