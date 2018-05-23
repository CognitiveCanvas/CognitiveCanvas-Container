<template>  
  <nav class="topTitle navbar navbar-expand-lg navbar-light">
    <div class="navbar-brand my-2 mr-md-4" v-on:click="menu">
      <img src="../../asset/CC Icon.png">
    </div>
    <h1 class="mr-md-4"> {{ title }} </h1>
    <div class="right">
      <div class="account">
        <a href="#"  v-on:click="/*Help button*/">
          <img id="help" src="../../asset/help_icon.png">
        </a>
    		<div class="dropdown">
    		  <button class="dropbtn">
            <img id="acc" src="../../asset/account_smile.svg">
          </button>
    		  <div class="dropdown-content">
    		    <a href="#" v-on:click="signOut">Sign Out</a>
    		  </div>
    		</div>
      </div>
    </div>
  </nav>
</template>

<script>
import router from '../../router/index'

export default {
  name: 'topbar',
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
      if ( !!label && label !== "") {
        if (this.$store.state.content.label !== label) {
          this.$store.dispatch("content/queryContent", {
            label: label
          });
        }
      }

      if (!this.$store.getters['sidebarBehavior/sidebarOpen']) {
        this.$store.dispatch('sidebarBehavior/toggleSidebar')
      }
    },
    signOut: function() {
      this.$store.dispatch('localUser/logout')
    }
  }
}
</script>

<style>
  @font-face {
    font-family: 'miso-regular';
    src: url('../../asset/font/miso_regular_macroman/miso-regular-webfont.woff2') format('woff2'),
         url('../../asset/font/miso_regular_macroman/miso-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'miso-bold';
    src: url('../../asset/font/miso_bold_macroman/miso-bold-webfont.woff2') format('woff2'),
         url('../../asset/font/miso_bold_macroman/miso-bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  *{
    font-family: "miso-regular"
  }

.topTitle {
  background-color: #4D5160;
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
  font-family: "miso-bold";
  color: #CDD0C5;
  font-size: 41px;
  text-align: left;
  float:left;
  height: 50px;
  margin: 0;
}
.navbar-brand  img{
  margin-left: 10px;
  height: 55px;
  width: 55px;
}
.account img#acc{
  height: 40px;
  width: 40px;
  float: right;
}
.account img#help{
  margin-top: 10px;
  height: 40px;
  width: 40px;
  float: right;
}
.account img#help:hover{
  opacity: 0.7;
}
.right{
  margin-left: auto;
  padding-right: 2px;
  margin-right: 20px;
  float: right;
}
.dropbtn {
    padding:10px;
    border: none;
    cursor: pointer;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    font-size: 20px;
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 110px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    opacity: 0.7;
  }
</style>
