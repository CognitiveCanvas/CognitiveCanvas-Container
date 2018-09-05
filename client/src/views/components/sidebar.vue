<template>
  <div :class="$style.sidebar">
    <vue-tabs :class="$style.sidebar_tabs">
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
        
        <div v-for="note in edited_notes">
          <content-card v-bind:title=note.title v-bind:url=note.url v-bind:type="note_type"></content-card>
        </div>
      </v-tab>

      <v-tab title="Elements">
        <div v-for="node in rel_nodes">
          <content-card v-bind:title=node.label v-bind:url=node.id v-bind:type="node_type"></content-card>
        </div>
        <div v-for="edge in rel_edges">
          <content-card v-bind:title=edge.label v-bind:url=edge.id v-bind:type="edge_type"></content-card>
        </div>
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
    rel_nodes: function() {
      return this.$store.state.relatedElement.relatedNodes
    },
    rel_edges: function() {
      return this.$store.state.relatedElement.relatedEdges
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
  .sidebar_tabs{
    margin-top: 64px !important;
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
