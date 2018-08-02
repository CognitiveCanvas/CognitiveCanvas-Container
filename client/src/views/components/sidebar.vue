<template>
  <div :class="$style.sidebar">
    <vue-tabs>
      <v-tab title="Resources">

        <!-- expandable list, not sure why it won't show as button but is functional -->

        <button id="blogTab" class="expandResource" v-on:click="expandBlog">
        Blogs
        </button>

        <ul id="blogContent">
          <div v-for="content in contents">
            <li>     
              <content-card v-if="content.type == 'blog'" :title=content.title :url=content.url :type=content.type></content-card>
            </li>
          </div>
        </ul>
        
        <button id="articleTab" class="expandResource" v-on:click="expandArticle">
        Articles
        </button>

        <ul id="articleContent">
          <div v-for="content in contents">
            <li>     
              <content-card v-if="content.type == 'article'" :title=content.title :url=content.url :type=content.type></content-card>
            </li>
          </div>
        </ul>
      </v-tab>

      <v-tab title="Notes">
        <div>
          <note-card v-bind:label=note.title v-bind:url=note.url></note-card>
        </div>
      </v-tab>

      <v-tab title="Elements">
      </v-tab>
    </vue-tabs>

  </div>
</template>

<script>
import {TweenMax, Power4} from 'gsap'

export default {
  name: 'sideBar',
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
    }
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
    z-index: 1;
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
