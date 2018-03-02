<template>
  <iframe class="concept-map" id="map-frame" v-on:load="eventListener" v-bind:src="source">
  </iframe>
</template>

<script>
import contentStore from '../stores/content'
  export default {

    name: 'topbar',
    data() {
      return {
        source: "http://localhost:7007/ConceptMap/"
        //source: "http://webstrates.ucsd.edu/master/"
      }
    },
    contentStore,
    methods: {
      eventListener: function() {
        window.addEventListener('message', function(event) { 

          // IMPORTANT: Check the origin of the data! 
          if (~event.origin.indexOf('http://localhost:7007')) { 
              // The data has been sent from your site 

              // The data sent with postMessage is stored in event.data 
              console.log(event.data); 
              contentStore.dispatch("queryContent", {
              label: event.data
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