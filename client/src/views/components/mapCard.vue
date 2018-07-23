<template>
  <div class="cards">
    <div class="map_card" v-on:mouseover="toggleDeleteBtn" v-on:mouseout="toggleDeleteBtn">
      <h1 v-on:click="navigaToMap">Title: {{title}}</h1>
      <div class="map_pic" v-on:click="navigaToMap">
        <img src="../../asset/screen1.png">
      </div>
      
      <div class="options" v-show="option_mode">
        <v-layout align-center justify-center>
          <v-flex xs5 md5 sm5 text-xs-center text-md-center text-sm-center>
            <v-btn class="raised share_btn" v-on:click="shareMap"> Share Map </v-btn>
          </v-flex>
          <v-flex xs1 md1 sm1></v-flex>
          <v-flex xs5 md5 sm5 text-xs-center text-md-center text-sm-center>
            <v-btn class="raised delete_btn" v-on:click="deleteMap"> Delete Map </v-btn>
          </v-flex>
        </v-layout>
        
        <v-layout align-center justify-center>
          <v-flex xs12 md12 sm12 text-xs-center text-md-center text-sm-center>
            <input type="hidden" id="idToShare" :value="hovered_map_id">
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>  
import constants from '../../models/constants'  
  
export default {
  name: 'mapCard',
  data() {
    return {
      option_mode: false,
      hidden: false,
      hovered_map_id: this.url.substring(`${constants.host}`.length)
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
    shareMap: function() {
      let self = this;
      let option = confirm("Do you want to share this map?\nClick OK will copy your map ID to clipboard.");
      
      if (option == true) {
        /* Select the text field */
        let copyText = document.querySelectorAll('#idToShare')[self.index];
        copyText.setAttribute('type', 'text')
        copyText.select();
        
        /* Copy the text inside the text field */
        try {
          var successful = document.execCommand('copy');
          if (successful) {
            alert("Map ID copied into clipboard!\nYou can share this ID with your partners, but please note that any person with your map ID has edit access of your map.")
          } else {
            alert('Oops, unable to copy!\nNothing is copied to clipboard.');
          }         
        } catch (err) {
          alert('Oops, unable to copy!\nNothing is copied to clipboard.');
        }  
        
        /* unselect the range */
        copyText.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
        
      } else {
        alert("Map Sharing Canceled!\nNothing is copied to clipboard.")
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
  