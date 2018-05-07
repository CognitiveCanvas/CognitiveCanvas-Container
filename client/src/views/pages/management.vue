<template>
  
  <div id="management">
    <topbar></topbar>
    <div class="contain_main">
      <div class="maps">
        <div class="new_map" v-on:click="createNewMap">
          <h1>Start New Map</h1>
          <img src="../../asset/add.png">
        </div>
        <div><map-collection /></div>
        <div><map-collection /></div>
        <div><map-collection /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Management',
  methods: {
    createNewMap: function(e) {
      this.$store.dispatch('map/createNewMap');
    }
  }
}
</script>

<style>

  .management {
    margin: auto;
    padding: auto;
    width: 100%;
    height: 100%;
  }
  .maps {
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .maps > div {
    width: 45.5vw;
    margin: 1.5%;
    min-width: 350px;
    min-height: 320px; 
    max-height: 500px;
    height: 42vh;
  }
  .new_map{
    top: 100px;
    background-color: #5EB6DD;
    height: 100%;
    width: 320px;
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