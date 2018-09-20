<template>
  <v-card class="new_map_card white--text"
          color="#006A96"
          height="20vh">
    <v-layout v-on:click="createNewMap" 
              align-center justify-space-between column fill-height>
      <v-flex xs12>
        <v-card-text class="prompt">
          <p class="prompt_text text-xs-center">Create New Map</p>
        </v-card-text>
      </v-flex>
      
      <v-flex xs12>
        <icon name="plus-circle" scale="3"></icon>
      </v-flex>

    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'createMap',
  computed: {
  },
  methods: {
    getId: function() {
      return this._uid + '_' + Date.now();
    },
    createNewMap: function() {
      let self = this;
      let mapId = self.getId();
      console.log(mapId);
      let userId = this.$store.state.localUser.localUser.email._id;
      self.$store.dispatch("map/createNewMap", {
        userID: userId,
        newID: mapId
      });
    }
  }
}
</script>

<style>
  @font-face {
    font-family: 'roboto-regular';
    src: url('../../asset/font/roboto/Roboto-Regular.woff2') format('woff2'),
         url('../../asset/font/roboto/Roboto-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'roboto-bold';
    src: url('../../asset/font/roboto/Roboto-Bold.woff2') format('woff2'),
         url('../../asset/font/roboto/Roboto-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  .new_map_card{
    background-color: #006A96;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20);
    overflow: hidden;
    min-height: 175px;
    min-width: 255px;
  }
  .prompt{
    margin-top: 2vh;
  }
  .prompt_text{
    font-family: Roboto-Bold;
    font-size: 24px;
    letter-spacing: -1px;
  }
  .create_icon{
    height: 60px;
    width: 60px;
  }
  
</style>