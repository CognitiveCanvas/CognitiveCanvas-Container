<template>
  <div id="management">
    <topbar></topbar>
    <div id="maps">
      <map-collection />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Management'
}
</script>

<style>
  #management {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: whitesmoke;
  }
  #maps {
    width: 100%;
    height: 100%;
  }
</style>