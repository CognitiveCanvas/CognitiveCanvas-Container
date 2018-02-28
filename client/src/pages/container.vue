<template>
  <div id="container">
    <topbar></topbar>
    <concept-map />
  </div>
</template>

<script>
export default {
  name : 'Container'
}
</script>

<style>
  #container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: #008F95;
    background-color: grey;
  }
</style>