<template>
  <div class="sidebar">
    <v-navigation-drawer>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title v-if="active_tab == 0"
                               class="title">
              Resources
            </v-list-tile-title>
            <v-list-tile-title v-if="active_tab == 1"
                               class="title">
              Notes
            </v-list-tile-title>
            <v-list-tile-title v-if="active_tab == 2"
                               class="title">
              Related Elements
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
    
      <!-- ACTIVE TAB: RESOURCE -->
      <v-list v-if="active_tab == 0"
              dense>
        <v-subheader v-if="contents.filter(content => content.type == 'article').length>0">Articles</v-subheader>
        
        <v-list-tile v-if="content.type == 'article'"
                     v-for="content in contents"
                     :key="content._id"
                     v-bind:href="content.url"
                     class='list_tile'>
          <v-list-tile-action>
            <icon name="file-alt"></icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ content.title }}</v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
        
        <v-subheader v-if="contents.filter(content => content.type == 'blog').length>0">Blogs</v-subheader>
        
        <v-list-tile v-if="content.type == 'blog'"
                     v-for="content in contents"
                     :key="content._id"
                     v-bind:href="content.url"
                     class='list_tile'>
          <v-list-tile-action>
            <icon name="newspaper-regular"></icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ content.title }}</v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
      </v-list>
      
      
      
      <!-- ACTIVE TAB: NOTE -->
      <v-list v-if="active_tab == 1"
              dense>
        <note-card v-bind:label=note.title v-bind:url=note.url></note-card>
        
        <v-subheader v-if="edited_notes.length>0">All Notes in This Map</v-subheader>
        
        <v-subheader v-if="edited_notes.length<=0">There is No Note in This Map Yet!</v-subheader>
        
        <v-list-tile v-for="note in edited_notes"
                     :key="note._id"
                     class='list_tile'
                     v-on:click="openAndTrace(note)">
          <v-list-tile-action>
            <icon name="sticky-note"></icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ note.title }}</v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
      </v-list>
      
      
      
      <!-- ACTIVE TAB: RELATED ELEMENTS -->
      <v-list v-if="active_tab == 2"
              dense>
  
        <v-subheader>Nodes</v-subheader>
        
        <v-list-tile v-for="node in rel_nodes"
                     :key="node._id"
                     class='list_tile'
                     v-on:click="traceElement(node)">
          <v-list-tile-action>
            <icon name="dot-circle" scale="0.8"></icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ node.label }}</v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
        
        <v-subheader>Edges</v-subheader>
        
        <v-list-tile v-for="edge in rel_edges"
                     :key="edge._id"
                     class='list_tile'
                     v-on:click="traceElement(edge)">
          <v-list-tile-action>
            <icon name="exchange-alt"></icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ edge.label }}</v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
  
      
      </v-list>
      
      
      
    </v-navigation-drawer>
  </div>
</template>

<script>
import {TweenMax, Power4} from 'gsap'
import constants from '../../models/constants'

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
    active_tab () {
      return this.$store.state.sidebarBehavior.active_tab
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
    }
  },
  methods: {
    openAndTrace: function(note) {
      let self = this
      self.$store.dispatch("map/openNote", {
        label: note.title,
        id: note.url
      })

      let header = `${constants.host}` + 'note_'
      console.log("start tracing: ", note.url.slice(header.length))
      self.$store.dispatch("relatedElement/startTracing", {
        id: note.url.slice(header.length),
      })
    },
    traceElement: function(element) {
      let self = this
      console.log("start tracing: ", element.id)
      self.$store.dispatch("relatedElement/startTracing", {
        id: element.url
      })
    }
  },
  watch: {
    open: function (open) {
      const dY = open ? 0 : -this.$el.offsetHeight
      TweenMax.to(this.$el, 0.6, {
        y: dY,
        ease: Power4.easeOut
      })
    },
    active_tab: function (active_tab) {
      console.log("ACTIVE TAB: ", active_tab)
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
  .list_tile:hover{
    background-color: #FFCD00 !important;
  }
  .blogContent {
      display: none;
      overflow: hidden;
  }
</style>
