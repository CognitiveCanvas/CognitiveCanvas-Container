<template>
  <div class="sidebar">
    <v-navigation-drawer permanent>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Resources
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
    
      <v-list dense>
        <v-subheader>Articles</v-subheader>
        
        <v-list-tile v-if="content.type == 'article'"
                     v-for="content in contents"
                     :key="content.title"
                     v-bind:href="content.url">
          <v-list-tile-action>
            <icon name="file-alt"></icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ content.title }}</v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
        
        <v-subheader>Blogs</v-subheader>
        
        <v-list-tile v-if="content.type == 'blog'"
                     v-for="content in contents"
                     :key="content.title"
                     v-bind:href="content.url">
          <v-list-tile-action>
            <icon name="newspaper-regular"></icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ content.title }}</v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {TweenMax, Power4} from 'gsap'

export default {
  name: 'sideTab',
  data() {
    return {
    }
  },
  mounted () {
    TweenMax.set(this.$el, {
      x: 0,
      y: -this.$el.offsetHeight
    })
  },
  computed: {
    label: function () {
      return this.$store.state.content.label
    },
    contents: function () {
      return this.$store.state.content.contents
    },
    open () {
      return this.$store.state.sidebarBehavior.sidebarOpen
    },
    note: function() {
      return this.$store.state.map.note
    },
    edited_notes: function() {
      return this.$store.state.map.noteCollection
    },
    node_type: function() { return 'node'},
    edge_type: function() { return 'edge'},
    note_type: function() { return 'note'}
  },
  data: function() {
      return {
        blogType: false
      }
  },
  methods: {
    expandBlog: function () {
      if (blogContent.style.display === "block") {
        blogContent.style.display = "none";
      } else {
        blogContent.style.display = "block";
      }
    },
    expandArticle: function () {
      if (articleContent.style.display === "block") {
        articleContent.style.display = "none";
      } else {
        articleContent.style.display = "block";
      }
    }
  },
  watch: {
    open: function (open) {
      const dY = open ? 0 : -this.$el.offsetHeight
      TweenMax.to(this.$el, 0.6, {
        y: dY,
        ease: Power4.easeOut
      })
    }
  }
}
</script>

<style>
  .sidebar{
    position: fixed;
    right: 0;
    top: 64px;
    width: 300px;
    height: 100vh;
    max-width: 90vw;
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20);
    display: flex;
    flex-direction: column;
    overflow: scroll;
    z-index: 1;
  }
  .sidebar_tabs{
    margin-top: 66px !important;
    font-size: 15px
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

  .blogContent {
      display: none;
      overflow: hidden;
  }
</style>
