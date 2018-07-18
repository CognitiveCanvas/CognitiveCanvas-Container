<template>
  <div class="cards">
    <div class="map_card" v-on:click="navigaToMap">
      <h1>Title: {{title}}</h1>
      <div class="map_pic">
        <img src="../../asset/screen1.png">
      </div>
    </div>
    <button class="delete_btn">
      <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
      <path style="fill:#E04F5F;" d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.003,0,111.063,0,248.085
        c0,137.002,111.07,248.07,248.082,248.07C385.088,496.155,496.158,385.087,496.158,248.085z"/>
      <path style="fill:#FFFFFF;" d="M277.042,248.082l72.528-84.196c7.91-9.182,6.876-23.041-2.31-30.951
        c-9.172-7.904-23.032-6.876-30.947,2.306l-68.236,79.212l-68.229-79.212c-7.91-9.188-21.771-10.216-30.954-2.306
        c-9.186,7.91-10.214,21.77-2.304,30.951l72.522,84.196l-72.522,84.192c-7.91,9.182-6.882,23.041,2.304,30.951
        c4.143,3.569,9.241,5.318,14.316,5.318c6.161,0,12.294-2.586,16.638-7.624l68.229-79.212l68.236,79.212
        c4.338,5.041,10.47,7.624,16.637,7.624c5.069,0,10.168-1.749,14.311-5.318c9.186-7.91,10.22-21.77,2.31-30.951L277.042,248.082z"/>
      </svg>
    </button>
  </div>
</template>

<script>  
export default {
  name: 'mapCard',
  data() {
    return {
      delete_mode: false
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
  .delete_btn{
    margin-bottom: -20vh;
    z-index: 1;
  }
  .delete_btn svg{
    margin-bottom: -20vh;
  }

</style>
  