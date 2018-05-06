<template>
  
  <div id="management">
    <topbar></topbar>
      <div id="maps">
        <div class="new_map" v-on:click="createNewMap">
          <h1>Start New Map</h1>
          <img src="../../asset/add.png">
        </div>
        <map-collection />
        <map-collection />
      </div>
  </div>
</template>

<script>
export default {
  name: 'Management',
  methods: {
    createNewMap: function(e) {
      this.$store.dispatch('map/createNewMap')
    }
  }
}
</script>

<style>
  @import '../../../font/miso_regular_macroman/stylesheet.css';
  body{
    font-family: "miso"
  }
  #management {
    width: 100%;
    height: 100%;
    //display: flex;
    flex-flow: column;
    background-color: whitesmoke;
  }
  #maps {
    padding: 10px;

    width: 100%;
    height: 100%;
  }
  .new_map{
    margin-left: 1%;
    top: 100px;
    background-color: #5EB6DD;
    height: 300px;
    width: 31%;
  }
  .new_map h1{
    padding-top: 60px;
    font-size: 28px;
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