<template>
  <div class="cards">
    <div class="map_card" v-on:click="navigaToMap">
      <h1>Title: {{title}}</h1>
      <div class="map_pic">
        <img src="../../asset/screen1.png">
  <!--<v-card>
    <v-card-media
      class="white--text"
      height="200px"
      src="https://vuetifyjs.com/static/doc-images/cards/docks.jpg"
    >
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{title}}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-title>
      <div> 
        <label class="grey--text">Number 10</label><br> -->
      </div>
    </div>
  </div>
</template>

<script>  
export default {
  name: 'mapCard',
  data() {
    return {
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
  .map_pic img{
    min-width: 420px;
    width: 100%;
    height: 100%;
    padding-left: 15%;
    overflow: hidden;
  }
  input{
    width: 100%;
  }

</style>
  