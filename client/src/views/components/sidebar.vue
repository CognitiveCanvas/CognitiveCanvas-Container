<template>
  <div :class="$style.sidebar">
    <vue-tabs>
      <v-tab title="Resources">
        <div v-for="content in contents">
          <content-card :title=content.title :url=content.url :type=content.type></content-card>
        </div>
      </v-tab>

      <v-tab title="Notes">
<!--
        <iframe class="note-window" id="note-frame" v-on:load="eventListener" v-bind:src="source">
        </iframe>
-->
      </v-tab>

      <v-tab title="Toolbar">
        Third tab content
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
import store from '../../states/store'
import {TweenMax, Power4} from 'gsap'

export default {
  name: 'sideBar',
  store,
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
    label: function () {
      return store.content.state.label
    },
    contents: function () {
      return store.content.state.contents
    },
    open () {
      return store.sidebarBehavior.state.sidebarBehavior.sidebarOpen
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
    overflow: scroll;
  }
  .title {
    top: 0;
    margin: 0 auto;
    padding: 0 auto;
    width: 100%;
    border-radius: 0px;
  }
  .note-window {
    height: 100%;
    width: 100%;
  }
</style>
