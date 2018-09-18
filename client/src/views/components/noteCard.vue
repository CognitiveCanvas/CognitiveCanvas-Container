<template>
  <div class="card">
    <v-list-tile>
      <h4 class="card-title">Note for {{ label }}</h4>
    </v-list-tile>
    <div class="card-body">
      <iframe id="add-Window" v-on:load="noteListener" v-bind:src="url">
        <p>ERROR: Your browser does not support iframes.</p>
      </iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: "noteCard",
    data () {
      return {
      }
    },
    methods: {
      noteListener: function() {
        let self = this
        window.addEventListener('message', function(event) {
          
          // Check the origin of the data
          if (~event.origin.indexOf('https://webstrates.ucsd.edu')) { 
            // The data has been sent from your site 
            if (event.data.id == "edit_note") {              
              self.$store.dispatch("map/markNoteEdit", {
                edited: true,
                label: self.label,
                url: self.url
              })
            }
          }
          else return;
          
        })
      }
    },
    components: {
    },
    props: ['label','url']
  }
</script>

<style>
  .card{
    margin-top: -4px;
  }
  .card-title{
    padding-top: 15px
  }
  #add-Window {
    margin-top: -1vh;
    width: 100%; 
    height: 270px;
  }
</style>