<template>
  <iframe class="concept-map" id="map-frame" v-on:load="eventListener" v-bind:src="source">
  </iframe>
</template>

<script>
  export default {

    name: 'topbar',
    data() {
      return {
        //source: "http://localhost:7007/ConceptMapping/" //Local Mapping
        //source: "http://webstrates.ucsd.edu/moriarty/" //Xavier Mapping
        source: "http://webstrates.ucsd.edu/master/"
      }
    },
    methods: {
      eventListener: function() {
        window.addEventListener('message', function(event) { 
          
          // IMPORTANT: Check the origin of the data! 
          if (~event.origin.indexOf('http://webstrates.ucsd.edu')) { 
            // The data has been sent from your site 

            // The data sent with postMessage is stored in event.data 
            //console.log(event.data); 
            this.$store.content.dispatch("queryContent", {
              elementUrl: event.data.id,
              label: event.data.label
            });
            
          } 
          else { 
              // The data hasn't been sent from your site! 
              // Be careful! Do not use it. 
              return;
          }
          
        }); 
      }
      
    }
  }
</script>

<style>
.concept-map {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>