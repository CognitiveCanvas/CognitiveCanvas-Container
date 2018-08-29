<template>
  <div id="management">
    <v-app>
      <titlebar></titlebar>
      <div class="contain_main">
      <map-collection />
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'Management',
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
  .contain_main {
    margin-top: 60px;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(34deg, #006A96 6%, #FFCD00 55%, #F5EFEF 100%);
    position: fixed;
    opacity: 0.1;
  }
  
</style>