<template>
  <div class="new_map" v-on:mouseover="toggleCollaboration" v-on:mouseout="toggleCollaboration">
    <h1 class="new_map_prompt" v-on:click="createNewMap">Start New Map</h1>
    
    <svg width="99px" height="99px" viewBox="0 0 99 99" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" v-on:click="createNewMap">
        <!-- Generator: Sketch 50 (54983) - http://www.bohemiancoding.com/sketch -->
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Hi-Fi-Prototypes" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Map-Management" transform="translate(-327.000000, -333.000000)" fill="#FEFEFE">
                <path d="M376.502825,333 C349.164474,333 327,355.161797 327,382.5 C327,409.838203 349.163062,432 376.502825,432 C403.836938,432 426,409.838203 426,382.5 C426,355.161797 403.836938,333 376.502825,333 Z M396.890932,385.109447 L378.11207,385.109447 L378.11207,403.890553 C378.11207,405.055137 377.16732,406 376.002876,406 C374.838431,406 373.893681,405.055137 373.893681,403.890553 L373.893681,385.109447 L355.109195,385.109447 C353.94475,385.109447 353,384.164583 353,383 C353,381.835417 353.94475,380.890553 355.109195,380.890553 L373.888056,380.890553 L373.893554,362.109447 C373.893554,360.944863 374.838305,360 376.002749,360 C377.167193,360 378.111944,360.944863 378.111944,362.109447 L378.111944,380.890553 L396.890805,380.890553 C398.05525,380.890553 399,381.835417 399,383 C399,384.164583 398.05525,385.109447 396.890805,385.109447 L396.890932,385.109447 Z" id="Page-1"></path>
            </g>
        </g>
    </svg>
    <br>
    <div class="collaboration" v-show="create_mode">
      <v-layout align-center justify-center>
        <v-flex xs12 md12 sm12 text-xs-center text-md-center text-sm-center>
          <h1>or Collaborate on Existing Map</h1>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center>
        <v-flex xs3 md3 sm3 text-xs-center text-md-center text-sm-center>
          <h2>Map ID: </h2>
        </v-flex>
        <v-flex xs5 md5 sm5 text-xs-center text-md-center text-sm-center>
          <input class="mapId_input" v-model="collaboration_id" style="background: white">
        </v-flex>
        <v-flex xs3 md3 sm3 text-xs-center text-md-center text-sm-center>
          <v-btn outline class="confirm_btn" color="indigo" v-on:click="enterCollaboration">Confirm</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>  
export default {
  name: 'newMapCard',
  data(){
    return {
      create_mode: false,
      collaboration_id: null
    }
  },
  computed: {
  },
  methods: {
    getId: function() {
      return this._uid + '_' + Date.now();
    },
    createNewMap: function() {
      let self = this;
      let mapId = self.getId();
      //console.log(mapId);
      let userId = this.$store.state.localUser.localUser.email._id;
      self.$store.dispatch("map/createNewMap", {
        userID: userId,
        newID: mapId,
        owner: true
      });
    },
    toggleCollaboration: function() {
      let self = this;
      self.create_mode = !(this.create_mode);
    },
    enterCollaboration: function() {
      let self = this;
      let userId = this.$store.state.localUser.localUser.email._id;
      let mapId = self.collaboration_id;
      console.log("collaboration_id: " + mapId);
      if (mapId == null || mapId == '') {
        mapId = self.getId();
        alert("Map ID is not entered, CogCanvas creates a new map for you instead!")
        self.$store.dispatch("map/createNewMap", {
          userID: userId,
          newID: mapId,
          owner: true
        });
      } else {
        self.$store.dispatch("map/createNewMap", {
          userID: userId,
          newID: mapId,
          owner: false
        });
      }
      
    }
  }
}
</script>
  
<style>
  .new_map{
    top: 100px;
    background-color: #5EB6DD;
    max-height: 350px;
    height:42vh;
    width: 100%;
  }
  .new_map .new_map_prompt{
    padding-top: 60px;
    font-size: 34px;
    text-align: center;
  }
  .new_map svg{
    margin-top: 40px;
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 60px;
    width: 60px;
  }
  .new_map:hover {
    opacity: 0.8;
  }
  .mapId_input {
    height: 33px
  }
  .confirm_btn .btn__content {
    padding-bottom: 0.5em;
  }
</style>