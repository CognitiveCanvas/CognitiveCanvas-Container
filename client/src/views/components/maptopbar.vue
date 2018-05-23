<template>
  <nav class="topTitle navbar navbar-expand-lg navbar-light" style="background-color: #D2D2CF">    
    <div class="navbar-brand my-2 mr-md-4" v-on:click="menu">
      <icon name="bars"></icon>
    </div>
    <img src="/static/images/CClogo.png" width="3%" class="mr-0 ml-0">
    <h1 class="mr-md-4" style="color: black"> {{ title }} </h1>

    <ul class="navbar-nav mr-auto">
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2"v-model="query" placeholder="Search" aria-label="Search">

        <!-- Used to have class="btn btn-outline-success my-2 my-sm-0"
        but can't seem to stop huge button spacing. Should fix later. -->

        <button v-on:click="queryContentByLable">
          <img src="/static/images/search-icon.png" width="5%" class="m-0">
        </button>
      </form>
    </ul>
    </ul>

    <ul class="navbar-nav ml-auto">
      <a href="#" class="my-2 my-auto" v-on:click="googleSignOut">Sign out</a>
      <img src="/static/images/helpButton.png" width="" height="auto" class="px-2 my-auto mx-auto" v-on:click="showHelp">
      <!-- Toolbar Tabs  -->
      <vue-tabs>
        <v-tab title="Resources" on:click="showResources"></v-tab>
        <v-tab title="Notes" on:click="showNotes"></v-tab>
        <v-tab title="Toolbar" on:click="showToolbar"></v-tab>
      </vue-tabs>
    </ul>

    <!-- Help Modal -->
    <div id="helpModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Help</h2>
          <span class="close" v-on:click="closeModal">&times;</span>
        </div>
        <div class="modal-body">
          <p>To create a node, double click on the canvas and type a label.</p>
          <img src="/static/images/double-click.png" width="20%"><br><br>
          <p>Click and drag nodes to move them around.</p>
          <img src="/static/images/click-and-drag.jpg" width="20%"><br><br>
          <p>To remove nodes, use your local undo shortcut.</p>
          <ul>
            <li>Ctrl + Z for Windows</li>
            <li>Cmd + Z for Mac</li>
            <li>Undo/Redo for iPad</li>
            <li>Currently no undo or delete feature for other tablets.</li>
          </ul>
          <p>Right click anywhere to access the context menu.</p>
          <img src="/static/images/right-click.png" width="15%"><br><br>
          <img src="/static/images/context-menu.png"><br></br>
          <p>Click to start drawing. A toolbar will appear in the top left.</p>
          <img src="/static/images/draw.png"><br></br>
          <p>Delete specific drawings.</p>
          <img src="/static/images/delete-specific-drawing.png"><br><br>
          <p>Clear map of all drawings.</p>
          <img src="/static/images/clear-drawings.png"><br><br>
          <p>Increase/decrease text size.</p>
          <img src="/static/images/textSize.png"><br><br>
          <p>Bold or italicize your text.</p>
          <img src="/static/images/boldItalic.png"><br><br>
          <p>Pick a text color.</p>
          <img src="/static/images/textColor.png"><br><br>
          <p>Pick a node color.</p>
          <img src="/static/images/nodeColor.png"><br><br>
        </div>
        <div class="modal-footer">
          <span class="close" v-on:click="closeModal">
            <button id="closeButton" class="toolbar">Close</button>
          </span>
        </div>
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
    },
    showHelp: function() {
      var modal = document.getElementById("helpModal");
      modal.style.display = "block";
    },
    closeModal: function() {
      var modal = document.getElementById("helpModal");
      modal.style.display = "none";
    }
  }
}
</script>

<style>

@font-face {
  font-family: "Miso Bold";
  src: url("/static/miso-bold-webfont.woff");
}

@font-face {
  font-family: "Miso Light";
  src: url("/static/miso-light-webfont.woff");
}

@font-face {
  font-family: "Miso Regular";
  src: url("/static/miso-regular-webfont.woff");
}


.topTitle {
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

.topTitle h1{
  font-size: 28px;
  text-align: left;
  float:left;
  color: white;
  height: 45px;
  padding: 5px 0%;
  color: #0099FA;
  margin: 0;
}

/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 75px;
    width: 600px;
    height: 100%;
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0); /* Black w/ opacity */
}

/* Modal Header */
.modal-header {
    padding: 2px 16px;
    background-color: #5CB8E0;
    color: white;
}

/* Modal Body */
.modal-body {
    padding: 16px;
}

/* Modal Footer */
.modal-footer {
    padding: 4px 16px;
    background-color: #5CB8E0;
    color: white;
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    animation-name: animatetop;
    animation-duration: 0.4s
}

@keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
}

h1, h2, {
  font-family: 'Miso Bold';
}

p, div, ul {
  font-family: 'Miso Regular';
  font-size: 18px;
}

ul {
  list-style-type: none;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
