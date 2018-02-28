<template>
  <div id="container">
    <topbar></topbar>
    <concept-map />
  </div>
</template>

<script>
export default {
  name : 'container',
  data: {
  }
}
</script>

<style>
  #container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
  }
</style>