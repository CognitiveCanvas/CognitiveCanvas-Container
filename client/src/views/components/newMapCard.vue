<template>
  <div class="new_map" v-on:click="createNewMap">
    <h1>Start New Map</h1>
    <img src="../../asset/add.png">
  </div>
</template>

<script>  
export default {
  name: 'newMapCard',
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
  .new_map{
    top: 100px;
    background-color: #5EB6DD;
    max-height: 350px;
    height:42vh;
    width: 100%;
  }
  .new_map h1{
    padding-top: 60px;
    font-size: 34px;
    text-align: center;
  }
  .new_map img{
    margin-top: 40px;
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 60px;
    width: 60px;
  }
  .new_map:hover {
    opacity: 0.7;
  }
</style>