<template>
  <div class="card m-2">
    <div class="card-header">
      {{ type }}
    </div>

    <div class="card-body bd-callout-info">
      <p class="card-title">{{ title }}</p>
      <v-btn v-show="type == 'blog' || type == 'article'" v-bind:href="url" class="raised goto_btn">Read</v-btn>
      <v-btn v-show="type == 'edge' || type == 'node'" v-on:click="url" class="raised goto_btn">Go to Element</v-btn>
    </div>
  </div>
</template>

<script>
export default {
name: 'contentCard',
data() {
  return {
  }
},
methods: {
  
},
props: ['title','url', 'type']
}
</script>

<style>
  .goto_btn {
    background-color:  skyblue;
    color: whitesmoke;
    font-size: 2.5vh;
  }
  .goto_btn .btn__content {
    padding-bottom: 0.5em;
  }
</style>