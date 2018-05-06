<template>
  <div class="cards">
    <div class="map_card">
      <h1>Title</h1>
      <div class="map_pic">
        <img src="../../asset/screen1.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: 'mapCard',
data() {
  return {
  }
},
props: ['title','url']
}
</script>

<style>
  .map_card{
    min-height: 320px;
    min-width: 350px;
    max-height: 500px;
    height: 42vh;
    width: 100%;
    background-color: #D8D8D8;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }
  .map_card:hover{
    opacity: 0.7;
  }
  .map_pic img{
    min-width: 420px;
    width: 100%;
    height: 100%;
    padding-left: 15%;
    overflow: hidden;
  }

</style>