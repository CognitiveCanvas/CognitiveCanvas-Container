<template>
  <v-card class="enter_map_card"
          color="#FAFAFA"
          height="20vh">
    <v-layout align-space-between justify-space-between column fill-height>
      <v-flex v-on:click="navigaToMap"
              xs12>
        <v-card-text class="title">
          <br>
          <p class="title_text text-xs-center">{{title}}</p>
        </v-card-text>
      </v-flex>
      

      <v-layout align-center justify-center row fill-width>
        <v-flex xs6>
          <v-btn class="enter_map_btn"
                 v-on:click="copyMap"
                 color="#747678"
                 depressed block>
            <icon name="copy" 
                  scale="1.5"
                  color="white"></icon>
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn class="enter_map_btn"
                 v-on:click="deleteMap" 
                 color="#747678"
                 depressed block>
            <icon name="trash" 
                  scale="1.5"
                  color="white"></icon>
          </v-btn>
        </v-flex>
      </v-layout>

    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'enterMap',
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    getId: function() {
      return this._uid + '_' + Date.now();
    },
    navigaToMap: function() {
      let self = this;
      this.$store.dispatch("map/navigateToMap", {
        index: self.index
      });
    },
    toggleBtn: function() {
      let self = this;
      console.log(self)
      console.log(self.color)
    },
    deleteMap: function() {
      let self = this;
      let option = confirm("Do you really want to delete this map?\nThis action cannot be undone later.");
      if (option == true) {
        this.$store.dispatch("map/retractPermission", {
          index: self.index,
          url: self.url
        });
        alert("Map Deletion Confirmed!")
      } else {
        alert("Map Deletion Canceled!")
      }
    },
    copyMap: function() {
      let self = this;
      let option = confirm("Do you want to make a copy of this map?\nClick OK will make a deep copy of this map in your management page.")
      
      if (option == true) {
        let userId = this.$store.state.localUser.localUser.email._id;
        self.$store.dispatch("map/copyToNewMap", {
          userId: userId,
          title:  self.title,
          url:    self.url,
          index:  self.index,
          newId:  self.getId()
        })
      } else {
        alert("Map Copying was Cancelled!")
      }
    }
  },
  props: ['title','url', 'index']
}
</script>

<style>
  @font-face {
    font-family: 'raleway-regular';
    src: url('../../asset/font/raleway/Raleway-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  .enter_map_card{
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20);
    overflow: hidden;
    min-height: 175px;
    min-width: 255px;
  }
  .title{
    margin-top: 1vh;
  }
  .title_text{
    font-family: raleway-regular;
    font-size: 20px;
    color: #182B49;
    text-align: center;
  }
  .enter_map_btn{
    margin-bottom:  0.4vh !important;
    padding: 0px !important;
  }
  .enter_map_btn:hover{
    background-color: #FFCD00 !important;
  }
  
</style>