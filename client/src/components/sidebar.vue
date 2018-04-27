<template>
  <div :class="$style.sidebar">
    <vue-tabs>
      <v-tab title="Resources">

        <!-- expandable list -->
        <button v-on:click="expandBlog">
          <h4>Blog</h4>
        </button><br></br>

        <ul id="blogContent">
          <div v-for="content in contents">
            <li>

              <!-- Used v-if= "blogType" to filter by type, but not working? -->           
              <content-card :title=content.title :url=content.url :type=content.type></content-card>
            </li>
          </div>
        </ul>

      </v-tab>

      <v-tab title="Notes">

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
</style>
