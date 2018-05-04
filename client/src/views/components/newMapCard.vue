<template>
  <v-card>
    <v-card-media
      class="white--text"
      height="200px"
      src="https://vuetifyjs.com/static/doc-images/cards/docks.jpg"
    >
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
           <div v-show = "description.editName == false">
              <label class="headline" @dblclick = "description.editName = true"> {{description.title}} </label>
            </div>
            <input v-show = "description.editName == true" v-model = "description.title"
            v-on:blur= "description.editName=false; $emit('update')"
            @keyup.enter = "description.editName=false; $emit('update')">
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-title>
      <div v-show = "description.editDesc == false">
        <label @dblclick = "description.editDesc = true"> {{description.text}} </label>
      </div>
      <input v-show = "description.editDesc == true" v-model = "description.text"
      v-on:blur= "description.editDesc=false; $emit('update')"
      @keyup.enter = "description.editDesc=false; $emit('update')">
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange" @click="createNewMap()">Explore</v-btn>
      <v-btn flat color="orange">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>  
export default {
  name: 'mapCard',
  data() {
    return {
      description: {'title':'Double click to add title for new concept map',
                    'text' :'Double click to add description for new concept map',
                    'editName' : false,
                    'editDesc' : false},
      editTitle: null,
      editedDescription: null,
      create: false
    }
  },
  computed: {
  },
  methods: {
    getId: function() {
      return this._uid + '_' + Date.now();
    },
    eventListener: function() {
      let self = this
      window.addEventListener('message', function(event) { 

        // IMPORTANT: Check the origin of the data! 
        if (~event.origin.indexOf('http://webstrates.ucsd.edu')) { 
          // The data has been sent from your site 

          // The data sent with postMessage is stored in event.data 
          //console.log(event.data); 
          self.$store.dispatch("content/queryContent", {
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
    },
    createNewMap: function() {
      let self = this;
      let mapId = self.getId();
      console.log(self.getId())
      
      self.$store.dispatch("map/createNewMap", {
        newID: mapId
      });
      
//      createNewMap (context, {newID}) 
    }
  }
}
</script>

<style module>
  input{
    width: 100%;
  }
</style>