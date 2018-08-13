<template>
  <iframe class="concept-map" id="map-frame" v-on:load="eventListener" v-bind:src="source">
  </iframe>
</template>

<script>  
  import constants from '../../models/constants'
  
  export default {

    name: 'conceptmap',
    data() {
      return {
        temp_buffer: []
      }
    },
    computed: {
      toSearchLabel () {
        return this.$store.state.content.toBrowse
      },
      toTraceId () {
        return this.$store.state.relatedElement.toTrace
      },
      toUpdateNote () {
        return this.$store.state.map.noteCollection
      }
    },
    watch: {
      toSearchLabel (newLabel, oldLabel) {
        //console.log(`Searching ${newLabel} instead of ${oldLabel} now!`)
        let self = this;
        let toBrowseRelatedElement = {
          id: "search",
          query: newLabel
        }
        //console.log("Sending Browse Request:")
        //console.log(toBrowseRelatedElement)
        self.$el.contentWindow.postMessage(toBrowseRelatedElement, '*')
      },
      toTraceId (newId, oldId) {
        //console.log(`Tracing ${newId} instead of ${oldId} now!`)
        let self = this;
        let toTraceRelatedElement = {
          id: "trace",
          query: newId
        }
        self.$el.contentWindow.postMessage(toTraceRelatedElement, '*')
      },
      toUpdateNote (newCollection, oldCollection) {
        let self = this
        let header = `${constants.host}` + 'note_'
        let toSetEdited = {
          id: "edited",
          query: newCollection[0].url.slice(header.length)
        }
        //console.log(newCollection[0].url)
        //console.log(toSetEdited)
        self.$el.contentWindow.postMessage(toSetEdited, '*')
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
              //console.log(`In Message Listener: Searching ${this.$store.state.content.label} Done!`)
              
              self.$store.dispatch("map/selectNode", {
                nodeId: event.data.uid,
                nodeLabel: event.data.label
              })
            } 
            else if (event.data.id == "related_element") {
              //console.log(event.data)
              self.$store.dispatch("relatedElement/storeElements", {
                status_code: event.data.response_status,
                label: event.data.query,
                nodes: event.data.nodes,
                edges: event.data.edges
              }) 
            }
            else if (event.data.id == "edited_elements") {
              console.log("logging edited elements, ", event.data)
              self.$store.dispatch("map/refreshNoteCollection", {
                edited: event.data.elements
              })
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