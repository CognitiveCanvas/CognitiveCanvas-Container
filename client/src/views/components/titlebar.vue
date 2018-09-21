<template>
  <v-toolbar absolute class="management_titlebar">
    <v-toolbar-items v-on:click="iconClick">
      <img id="title_icon" src="../../asset/brain.svg">
    </v-toolbar-items>
    
    <v-toolbar-title class="title_inbar">{{ title }}</v-toolbar-title>
    
    <v-spacer></v-spacer>
  
    <v-toolbar-items>
      
       <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <v-btn fab flat>
            <icon name="user-regular" scale="2.3"></icon>
          </v-btn>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
            v-for="item in dropdown_user"
            :key="item"
            @click="signOut"
          >
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      
      <v-btn fab flat
             @click="dialog = true">
        <icon name="question-circle-regular" scale="2.3"></icon>
      </v-btn>

    </v-toolbar-items>
    
    <!-- HELP MODAL -->
    <v-dialog v-model="dialog"
              max-width="600"
              scrollable>
      <v-card>
        <v-card-title class="headline">CogCanvas User Guide & FAQ</v-card-title>

        <v-card-text>
          <v-expansion-panel>
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Create A New Map</div>
              <v-card>
                <v-card-text>Click on the top left card with title "Create New Map" and  <icon name="plus-circle"></icon>  icon to create a new map.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Access An Old Map</div>
              <v-card>
                <v-card-text>Click on any card with map name to access an old map.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Copy An Existing Map</div>
              <v-card>
                <v-card-text>Click on the <icon name="copy"></icon> button of a map you want to copy to create a deep copy of an existing map.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Delete An Existing Map</div>
              <v-card>
                <v-card-text>
                  Click on the <icon name="trash"></icon> button of a map you want to delete to delete an existing map.
                  <br><br>
                  Warning: This action cannot be undone! </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
            <v-expansion-panel-content expand-icon="mdi-menu-down">
              <div slot="header">Logout of My Account</div>
              <v-card>
                <v-card-text>Click on the <icon name="user-regular"></icon> button to open a dropdown and click on "Logout" to logout of your account.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            
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
          </v-expansion-panel>
          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="#182B49"
            flat="flat"
            @click="dialog = false"
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
  name: 'titlebar',
  data() {
    return {
      title: "Cognitive Canvas",
      query: null,
      dropdown_user: ['Logout'],
      dialog: false
    }
  },
  methods: {
    iconClick: function(e) {
      router.push('management')
    },
    signOut: function() {
      let self = this;
      let option = confirm("Do you really want to logout from Cognitive Canvas?");
      if (option == true) {
        this.$store.dispatch('localUser/logout')
      }
    }
  }
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
  
  .management_titlebar{
    background: #FAFAFA;
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20);
    position: fixed;
  }
  .title_inbar{
    font-size: 42px;
    color: #182B49;
    letter-spacing: -1.6px;
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
