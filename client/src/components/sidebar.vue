<template>
  <div :class="$style.sidebar">
    <vue-tabs>
      <v-tab title="Resources">

        <!-- expandable list, not sure why it won't show as button but is functional -->
        <button id="resourcesTab" class="expandResource" v-on:click="expandBlog">
          <h4>Blog</h4>
        </button>

        <ul id="blogContent">
          <div v-for="content in contents">
            <li>     
              <content-card v-if="content.type == 'blog'" :title=content.title :url=content.url :type=content.type></content-card>
            </li>
          </div>
        </ul>

        <!-- Originally meant to show the Notes and Toolbar when clicking on tabs on navbar, but never got it linked/working
        
        <button id="notesTab">
          <h4>Notes</h4>
        </button>

        <button id="toolbarTab">
          <h4>Toolbar</h4>
        </button> -->

      </v-tab>

      <v-tab title="Notes">

      </v-tab>

      <v-tab title="Toolbar">
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
  data: function() {
      return {
        blogType: false
      }
  },
  methods: {
    expandBlog: function () {
      
      console.log("expandBlog working")

      /* To filter cards by type*/
      if ( this.type === "blog") {
        blogType = true;
        console.log("blogType true")
      } else {
        console.log("blogType false")
      }

      if (blogContent.style.display === "block") {
        blogContent.style.display = "none";
      } else {
        blogContent.style.display = "block";
      }

    }
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

.blogContent {
    display: none;
    overflow: hidden;
}

.expandResource {
  margin-top: 20px;
}
</style>
