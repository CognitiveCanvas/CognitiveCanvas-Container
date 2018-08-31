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
            <icon name="user" scale="2.3"></icon>
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
      
      <v-btn fab flat>
        <icon name="question" scale="2.3"></icon>
      </v-btn>

    </v-toolbar-items>
    
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
      dropdown_user: ['Logout']
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