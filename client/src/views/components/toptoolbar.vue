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
      
      <v-btn fab flat
             @click="map_dialog = true">
        <icon name="question-circle-regular" scale="2.5"></icon>
      </v-btn>

    </v-toolbar-items>
    
    <!-- HELP MODAL -->
    <v-dialog v-model="map_dialog"
              max-width="600"
              scrollable>
      <v-card>
        <v-card-title class="headline">CogCanvas User Guide & FAQ</v-card-title>

        <v-card-text>
          <v-expansion-panel>
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header"><img id="title_icon" src="../../asset/brain.svg" style="width:20px;height:20px;margin-top: -5px;"> &nbspGo Back to Map Management Page</div>
              <v-card>
                <v-card-text>Click on the <img id="title_icon" src="../../asset/brain.svg" style="width:25px;height:25px;margin-top: -5px;">  icon on the left corner of the topbar to return to map management page.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Change the Map Title</div>
              <v-card>
                <v-card-text>Double-click on the map title to enter the edit mode of the map title</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header"><icon name="sticky-note-regular"></icon> &nbsp Take Note for Node/Edge</div>
              <v-card>
                <v-card-text>
                  Click on the <icon name="sticky-note-regular"></icon> button to open a sidebar of notes attaching to your nodes/edges on the map. 
                  <br><br>
                  You need to select a node/edge in order to open the note attached to them and to edit the note.
                  <br><br>
                  The <icon name="sticky-note-regular"></icon> Note sidebar keep track of all edited notes for you. You can click on one of them to open the note and select the node/edge the note attached to.
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header"><icon name="light-bulb-regular"></icon> &nbsp Check Related Resources</div>
              <v-card>
                <v-card-text>
                  Click on the <icon name="light-bulb-regular"></icon> button or directly type keyword into the search bar to open a sidebar of Related Resources based on your selected nodes/edges on the map or keyword typed in the search bar. If you already open another sidebar, click on the <icon name="light-bulb-regular"></icon> button to switch to the Related Resource sidebar.
                  <br><br>
                  Select a node/edge automatically search through the related resources based on the label of the selected node/edge.
                  <br><br>
                  The <icon name="light-bulb-regular"></icon> Resource sidebar sorts the search results based on their types: <icon name="file-alt"></icon> research papers/articles/journals and <icon name="newspaper-regular"></icon> online blogs.
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header"><icon name="share-alt"></icon> &nbsp Find Related Nodes/Edges</div>
              <v-card>
                <v-card-text>
                  Click on the <icon name="share-alt"></icon> button or directly type keyword into the search bar to open a sidebar of Related Elements based on your selected nodes/edges on the map or keyword typed in the search bar. If you already open another sidebar, click on the <icon name="share-alt"></icon> button to switch to the Related Elements sidebar.
                  <br><br>
                  Select a node/edge or type keyword into the search bar automatically search through all the nodes/edges in the current map based on the label of the selected node/edge or the keyword typed in.
                  <br><br>
                  The <icon name="share-alt"></icon> Related Elements sidebar sorts the search results based on their types: <icon name="dot-circle"></icon> nodes and <icon name="exchange-alt"></icon> edges.
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header"><icon name="undo"></icon> &nbsp Undo Last Action</div>
              <v-card>
                <v-card-text>Click on the <icon name="undo"></icon> button to undo your last create/move/delete action on the map.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header"><icon name="repeat"></icon> &nbsp Redo Last undone Action</div>
              <v-card>
                <v-card-text>Click on the <icon name="repeat"></icon> button to redo your last undone action on the map.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Logout of My Account</div>
              <v-card>
                <v-card-text>Click on the <icon name="user-regular"></icon> button to open a dropdown and click on "Logout" to logout of your account.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
<!--
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Q: How do I change the name of an existing map?</div>
              <v-card>
                <v-card-text>A: You need to click on and enter an existing map in order to change its name.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Q: Why my copied map does not update with the original map?</div>
              <v-card>
                <v-card-text>A: The copy action create a deep copy of your original map, which means the copied map is a separate map from the moment you copy it from the original one, and no longer changes with the actions in original map.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Q: I accidentally delete one of my maps! HELP!!!</div>
              <v-card>
                <v-card-text>A: Please (calm down and) contact the Cognitive Canvas System Manager.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
-->
          </v-expansion-panel>
          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="#182B49"
            flat="flat"
            @click="map_dialog = false"
          >
            Got it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    
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
      query: null,
      map_dialog: false
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