<template>
    <div class="card m-2">
    <div class="card-header">
      <h1>Note for {{ label }}</h1>
    </div>
    <div class="card-body bd-callout-info">
      <iframe id="add-Window" v-on:load="noteListener" v-bind:src="url">
        <p>ERROR: Your browser does not support iframes.</p>
      </iframe>
<!--
      <button type="button" id="addNoteBtn" onclick="appendNote()">Add Sticky Note</button>
      <input type="file" id="addPicBtn" onchange="appendPic()">
-->
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
              console.log(event.data)
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
  #add-Window {
    width: 95%; 
    height: 350px;
  }
  
  button {
    width:100%;
    height: 20px;
    font-size: 15;
  }
</style>