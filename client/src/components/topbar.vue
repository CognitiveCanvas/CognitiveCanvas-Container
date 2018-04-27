<template>
  <nav class="topTitle navbar navbar-expand-lg navbar-light">
    <div class="navbar-brand my-2 mr-md-4" v-on:click="menu">
      <img src="../asset/CC Icon.png">
    </div>
    <h1 class="mr-md-4"> {{ title }} </h1>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2"v-model="query" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="queryContentByLable" style="background-color:#E55060; color:white">Search</button>
    </form>
    <div class="right">
      <div class="account">
        <a href="#"  v-on:click="/*Help button*/"><img id="help" src="../asset/help_icon.png"></a>
        <a href="#" v-on:click="googleSignOut"><img id="acc" src="../asset/account_icon.png"></a>
        
      </div>
    </div>
  </nav>
</template>

<script>
import contentStore from '../stores/content'
import router from '../router/index'

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
      if (label && label !== "") {
        contentStore.dispatch("queryContent", {
        label: label
      });
      }
    },
    googleSignOut: function() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        router.push(`login`);
      });
    }
  }
}
</script>

<style>
  .topTitle {
  background-color: #FCE946;
  top: 0;
  margin: 0 auto;
  padding: 0 auto;
  height: 60px;
  width: 100%;
  border-radius: 0px;
  list-style-type: none;
  box-shadow: 0 2px 6px 0 rgba(176,186,197,0.60);
}
.topTitle h1{
  font-size: 20px;
  text-align: left;
  float:left;
  color: #30323D;
  height: 45px;
  padding: 10px 0%;
  margin: 0;
}
.navbar-brand  img{
  margin-left: 10px;
  height: 42px;
  width: 42px;
}
.account img#acc{
  margin: 5px;
  height: 35px;
  width: 35px;
  float: right;
}
.account img#help{
  margin-top: 10px;
  height: 30px;
  width: 30px;
  float: right;
}
.right{
  margin-left: auto;
  padding-right: 2px;
  margin-right: 20px;
  float: right;
}
.help img{
  height: 20px;
  width: 20px;
  float: right;
}
</style>
