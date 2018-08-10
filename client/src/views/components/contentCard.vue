<template>
  <div class="card m-2">
    <div class="card-header">
      {{ type }}
    </div>

    <div class="card-body bd-callout-info">
      <p class="card-title">{{ title }}</p>
      <v-btn v-show="type == 'blog' || type == 'article'" v-bind:href="url" class="raised goto_btn">Read</v-btn>
      <v-btn v-show="type == 'edge' || type == 'node'" v-on:click="traceElement" class="raised goto_btn">Go to Element</v-btn>
      <v-btn v-show="type == 'note'" v-on:click="openAndTrace" class="raised goto_btn">Open Note</v-btn>
    </div>
  </div>
</template>

<script>
import constants from '../../models/constants'
  
export default {
name: 'contentCard',
data() {
  return {
  }
},
methods: {
  traceElement: function() {
    let self = this
    self.$store.dispatch("relatedElement/startTracing", {
      label: self.title,
      id: self.url,
      type: self.type
    })
  },
  openAndTrace: function() {
    let self = this
    self.$store.dispatch("map/openNote", {
      label: self.title,
      id: self.url
    })
    
    let header = `${constants.host}` + 'note_'
    self.$store.dispatch("relatedElement/startTracing", {
      label: self.title,
      id: self.url.slice(header.length),
      type: self.type
    })
  }
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