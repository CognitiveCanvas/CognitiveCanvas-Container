<template>
  <div class="cards">
    <div class="map_card" v-on:mouseover="toggleDeleteBtn" v-on:mouseout="toggleDeleteBtn">
      <h1 v-on:click="navigaToMap">Title: {{title}}</h1>
      <div class="map_pic" v-on:click="navigaToMap">
        <img src="../../asset/screen1.png">
      </div>
      
      
<!--
      <div class="deletion" v-show="delete_mode">
        <v-layout align-center justify-center>
          <v-flex xs6 md6 sm6 text-xs-center text-md-center text-sm-center>
            <v-btn class="raised delete_btn" v-on:click="deleteMap"> Delete Map </v-btn>
          </v-flex>
        </v-layout>
      </div>
-->
      
      <div class="options" v-show="option_mode">
        <v-layout align-center justify-center>
          <v-flex xs5 md5 sm5 text-xs-center text-md-center text-sm-center>
            <v-btn class="raised share_btn" v-on:click="copyMap"> Copy Map </v-btn>
          </v-flex>
          <v-flex xs1 md1 sm1></v-flex>
          <v-flex xs5 md5 sm5 text-xs-center text-md-center text-sm-center>
            <v-btn class="raised delete_btn" v-on:click="deleteMap"> Delete Map </v-btn>
          </v-flex>
        </v-layout>
      </div>
      
    </div>
  </div>
</template>

<script>  
export default {
  name: 'mapCard',
  data() {
    return {
      option_mode: false
    }
  },
  computed: {
  },
  methods: {
    navigaToMap: function() {
      let self = this;
      this.$store.dispatch("map/navigateToMap", {
        index: self.index
      });
    },
    toggleDeleteBtn: function() {
      let self = this;
      this.option_mode = !(this.option_mode);
    },
    deleteMap: function() {
      let self = this;
      let option = confirm("Do you really want to delete this map?\nThis action cannot be undone later.");
      if (option == true) {
        this.$store.dispatch("map/retractPermission", {
          index: self.index,
          url: self.url
        });
        alert("Map Deletion Confirmed!")
      } else {
        alert("Map Deletion Canceled!")
      }
    },
    copyMap: function() {
      let self = this;
      let option = confirm("Do you want to make a copy of this map?\nClick OK will make a deep copy of this map in your management page.")
      
      if (option == true) {
        
      } else {
        alert("Map Copying was Cancelled!")
      }
    }
  },
  props: ['title','url', 'index']
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
  .map_card{
    min-height: 320px;
    //min-width: 350px;
    max-height: 350px;
    height: 42vh;
    width: 100%;
    background-color: #D8D8D8;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }
  .map_card:hover{
    opacity: 0.7;
  }
  .map_card h1{
    white-space: nowrap;  
    overflow: hidden;
  }
  .map_pic {
    height: 72%;
  }
  .map_pic img{
    min-width: 420px;
    width: 100%;
    height: 120%;
    padding-left: 15%;
    overflow: hidden;
  }
  input{
    width: 100%;
  }
  .delete_btn {
    background-color:  red;
    color: whitesmoke;
    font-size: 2.5vh;
  }
  .delete_btn .btn__content {
    padding-bottom: 0.5em;
  }
  .share_btn {
    background-color:  #5EB6DD;
    color: whitesmoke;
    font-size: 2.5vh;
  }
  .share_btn .btn__content {
    padding-bottom: 0.5em;
  }

</style>
  