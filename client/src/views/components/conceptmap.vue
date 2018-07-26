<template>
  <iframe class="concept-map" id="map-frame" v-on:load="eventListener" v-bind:src="source">
  </iframe>
</template>

<script>  
  export default {

    name: 'topbar',
    data() {
      return {
        temp_buffer: []
      }
    },
    methods: {
      eventListener: function() {
        let self = this
        window.addEventListener('message', function(event) { 
          
          // IMPORTANT: Check the origin of the data! 
          if (~event.origin.indexOf('https://webstrates.ucsd.edu')) { 
            // The data has been sent from your site 
            
            if (event.data.id == "action_log") {
              // Save action-log to db
              event.data.data["user_id"] = self.$store.state.localUser.localUser.email._id;
              self.$data.temp_buffer.push(event.data.data);
            } 
            else if (event.data == "post_action_log") {
              // Receive post request from webstrates, flush db
              let action_log = self.$data.temp_buffer;
              if (action_log.length > 0) {
                self.$store.dispatch("map/actionLog", action_log);
                self.$data.temp_buffer = [];
                action_log = [];
              }
            } 
            else if (event.data.id == "selected_element") {
              // The data sent with postMessage is stored in event.data 
              self.$store.dispatch("content/queryContent", {
                elementUrl: event.data.uid,
                label: event.data.label
              });
              
              self.$store.dispatch("map/selectNode", {
                nodeId: event.data.uid,
                nodeLabel: event.data.label
              })
            } 
            else if (event.data.id == "related_element") {
              // TODO: Process the related element
              
              
              
              
            }
            
          } 
          else { 
              // The data hasn't been sent from your site! 
              // Be careful! Do not use it. 
              return;
          }
          
        }); 
      }
      
    },
    props: ['source']
  }
</script>

<style>
.concept-map {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>