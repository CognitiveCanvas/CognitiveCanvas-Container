<template>
  <nav class="title navbar navbar-expand-lg navbar-light bg-white">
    <div class="navbar-brand my-2 mr-md-4" v-on:click="menu">
      <icon name="bars"></icon>
    </div>
    <h1 class="mr-md-4" style="color: #168FC7"> {{ title }} </h1>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2"v-model="query" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="queryContentByLable">Search</button>
    </form>
  </nav>
</template>

<script>
import contentStore from '../stores/content'

export default {
  name: 'topbar',
  contentStore,
  data() {
    return {
      title: "Cognitive Canvas",
      query: null
    }
  },
  methods: {
    menu: function(e) {
      console.log("clicked on menu")
    },
    queryContentByLable: function(e) {
      let label = this.$data.query;
      if (label && label != "") {
        contentStore.dispatch("queryContent", {
        label: label
      });
      }
    }
  }
}
</script>

<style>
  .title {
  background-color: white;
  top: 0;
  margin: 0 auto;
  padding: 0 auto;
  height: 60px;
  width: 100%;
  border-radius: 0px;
  list-style-type: none;
  box-shadow: 0 2px 6px 0 rgba(176,186,197,0.60);
}
.title h1{
  font-size: 28px;
  text-align: left;
  float:left;
  color: white;
  height: 45px;
  padding: 5px 0%;
  color: #0099FA;
  margin: 0;
}
</style>