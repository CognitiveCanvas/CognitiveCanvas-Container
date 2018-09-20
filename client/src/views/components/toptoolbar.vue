<template>
  <v-toolbar absolute class="map_titlebar">
    <v-toolbar-items v-on:click="iconClick">
      <img id="title_icon" src="../../asset/brain.svg">
    </v-toolbar-items>
    
    <v-toolbar-title class="map_title_inbar">
      <div v-show="subTitle.edit == false">
        <h1 class="mr-md-4" 
            style="color: #4D5160" 
            @dblclick = "subTitle.edit = true">{{ subTitle.name }}</h1>
      </div>
      <input class="map_title_input_inbar"
             v-show = "subTitle.edit == true" 
             v-model = "subTitle.name" 
             v-on:blur = "subTitle.edit = false; updateMapTitle(subTitle.name)" 
             @keyup.enter = "subTitle.edit = false; updateMapTitle(subTitle.name)"
             style = "background: white">
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <v-toolbar-items class="map_search_bar">
        <input class="map_search_bar_input" 
               placeholder="Search" 
               aria-label="Search" 
               v-model="query" 
               v-on:input="queryContentByLable" 
               v-on:keyup.delete="closeSearchResults"
               width="5vw"> 
    </v-toolbar-items>
    
    <v-spacer></v-spacer>
    
    <v-toolbar-items>
      
      <v-btn fab flat
             v-on:click="sendUndo">
        <icon name="undo" scale="2"></icon>
      </v-btn>
      
      <v-btn fab flat
             v-on:click="sendRedo">
        <icon name="repeat" scale="2"></icon>
      </v-btn>

    </v-toolbar-items>
    
    <v-spacer></v-spacer>
  
    <v-toolbar-items>
      
      <v-btn fab flat 
             v-on:click="swapSideTab('note')">
        <icon name="sticky-note-regular" scale="2.3"></icon>
      </v-btn>
      
      <v-btn fab flat 
             v-on:click="swapSideTab('resource')">
        <icon name="light-bulb-regular" scale="2.3"></icon>
      </v-btn>
      
      <v-btn fab flat 
             v-on:click="swapSideTab('related_element')">
        <icon name="share-alt" scale="2.3"></icon>
      </v-btn>
      
      <v-btn fab flat>
        <icon name="question-circle-regular" scale="2.5"></icon>
      </v-btn>

    </v-toolbar-items>
    
  </v-toolbar>
</template>

<script>
import router from '../../router/index'

export default {
  name: 'toptoolbar',
  data() {
    return {
      title: "Cognitive Canvas",
      subTitle: { 'name': this.mapTitle, 'edit': false },
      query: null
    }
  },
  methods: {
    iconClick: function(e) {
      router.push('management')
    },
    queryContentByLable: function(e) {
      let label = this.$data.query;
      //console.log(label);
      if ( !!label && label !== "") {
        if (this.$store.state.content.label !== label) {
          this.$store.dispatch("content/queryContent", {
            label: label
          });
        }
      }
      
      if (!this.$store.getters['sidebarBehavior/sidebarOpen'] && e.data) {
        this.$store.dispatch('sidebarBehavior/toggleSidebar')
      }
    },
    closeSearchResults: function(e) {
      // Close Search Results Sidebar when deleting
      if (this.$store.getters['sidebarBehavior/sidebarOpen']) {
        this.$store.dispatch('sidebarBehavior/toggleSidebar')
      }
    },
    updateMapTitle: function(newTitle) {
      let self = this;
      if (newTitle == this.mapTitle) return;
      this.$store.dispatch("map/updateMapName", {
        mapUrl: this.mapUrl,
        newTitle: newTitle
      });
    },
    sendUndo: function() {
      this.$store.dispatch("map/fireUndo", {
            command: true
      });
    },
    sendRedo: function() {
      this.$store.dispatch("map/fireRedo", {
            command: true
      });
    },
    showHelp: function() {
      var modal = document.getElementById("helpModal");
      modal.style.display = "block";
    },
    closeModal: function() {
      var modal = document.getElementById("helpModal");
      modal.style.display = "none";
    },
    toggleSidebar: function() {
      this.$store.dispatch('sidebarBehavior/toggleSidebar');
    },
    swapSideTab: function(newTab) {
      this.$store.dispatch('sidebarBehavior/swapActiveSideTab', {
        label: newTab
      });
    }
  },
  props: ['mapTitle', 'mapUrl']
}
</script>

<style>
  @font-face {
    font-family: 'miso-regular';
    src: url('../../asset/font/miso_regular_macroman/miso-regular-webfont.woff2') format('woff2'),
         url('../../asset/font/miso_regular_macroman/miso-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'miso-bold';
    src: url('../../asset/font/miso_bold_macroman/miso-bold-webfont.woff2') format('woff2'),
         url('../../asset/font/miso_bold_macroman/miso-bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  *{
    font-family: "miso-regular"
  }
  
  .map_titlebar{
    background: #FAFAFA;
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20);
    position: fixed;
  }
  .map_title_inbar{
    color: #182B49;
    letter-spacing: -1px;
  }
  .map_search_bar{
    height: 70%;
  }
  .map_title_input_inbar{
    height: 60%;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    letter-spacing: -1px;
  }
  .map_search_bar_input{
    display: block;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    color: #495057;
    background-color: #FFF;
    border-radius: 0.25rem;
  }
  #title_icon{
    height: 75%;
    margin-top: 12.5%;
  }
  #user_icon{
    height: 50%;
  }
  #question_icon{
    height: 50%;
  }
</style>