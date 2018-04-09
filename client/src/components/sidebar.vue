<template>
  <div :class="$style.sidebar">
<!--    <span onclick="this.parentElement.style.display='none'" class="topright">&times</span>-->
    <vue-tabs>
      <v-tab title="Resources">
        <div v-for="content in contents">
          <content-card :title=content.title :url=content.url :type=content.type></content-card>
        </div>
      </v-tab>

      <v-tab title="Notes">
        Second tab content
      </v-tab>

      <v-tab title="Toolbar">
        Third tab content
      </v-tab>
    </vue-tabs>
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

<style module>
  .sidebar{
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    max-width: 90vw;
    background-color: var(--accent-color);
    display: flex;
    flex-direction: column;
  }
  .title {
    top: 0;
    margin: 0 auto;
    padding: 0 auto;
    width: 100%;
    border-radius: 0px;
  }
</style>
