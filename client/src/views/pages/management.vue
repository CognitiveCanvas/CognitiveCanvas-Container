<template>
  
  <div id="management">
    <topbar></topbar>
    <div class="contain_main">
     <!--<div class="maps">-->
        <map-collection />
      <!--</div>-->
    </div>
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
  
</style>