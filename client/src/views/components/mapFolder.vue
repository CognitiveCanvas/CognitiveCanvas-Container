<template>
  <div class="map_folder">
    <v-container class="folder_container">
      <v-layout align-start row wrap>
        <v-flex xs12 sm3 md3 lg3>
          <create-map-card class="map_representation"></create-map-card>
        </v-flex>
        <v-flex v-for="(map, index) in maps" 
                v-if="map.permission=='EDIT'" 
                v-bind:key="map.id"
                class="existingMapInCollection" xs12 sm3 md3 lg3>
          <enter-map-card v-bind:title=map.title 
                    v-bind:url=map.url 
                    v-bind:index=index 
                    class="map_representation" ></enter-map-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'mapFolder',
  data() {
    return {
    }
  },
  computed: {
    maps: function() {
      return this.$store.state.map.maps
    }
  },
  methods: {
    
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
  
  .map_representation{
    margin: 5%;
  }
</style>