<template>
  <div id="management">
    <v-app>
      <titlebar></titlebar>
      <map-folder class="main" />
      <div class="main_bkg"></div>
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
  .main_bkg {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(34deg, #006A96 16%, #FFCD00 55%, #F5EFEF 100%);
    position: fixed;
    opacity: 0.2;
  }
  .main {
    padding-top: 60px;
    z-index: 1;
  }
  
</style>