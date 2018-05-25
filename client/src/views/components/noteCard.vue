<template>
    <div class="card m-2">
    <div class="card-header">
      <h1>Note</h1>
    </div>
    <div class="card-body bd-callout-info">
      <p class="card-title">{{ label }}</p>
      <iframe id="add-Window" v-bind:src="url">
        <p>ERROR: Your browser does not support iframes.</p>
      </iframe>
<!--
      <button type="button" id="addNoteBtn" onclick="appendNote()">Add Sticky Note</button>
      <input type="file" id="addPicBtn" onchange="appendPic()">
      <button type="button" id="closeWindowBtn" onclick="closeContentWindow()">Close Content Window</button>
-->
    </div>
    
  </div>
</template>

<script>
    export default {
        name: "noteCard",
        data () {
            return {
            }
        },
        methods: {
          appendNote: function(){
            let appendElement = '<div class="note" contenteditable="true" style="left: 8px;top: 8px;width: 235px;min-height: 100px;padding: 16px;box-shadow: 5px 5px 10px gray;background-color: rgb(255, 255, 150);font-size: 12pt;word-wrap: break-word;"></div><br>';  
            let addWindow = document.getElementById("add-Window");
            addWindow.contentWindow.document.body.innerHTML += appendElement;
          },
          appendPic: function(){
            let appendElement = document.createElement('img');
            appendElement.setAttribute("width", "235");
            appendElement.setAttribute("alt", "Loading Image...");
            let addWindow = document.getElementById("add-Window");
            addWindow.contentWindow.document.body.appendChild(appendElement);

            let imgList = addWindow.contentWindow.document.querySelectorAll('img'); //selects the query named img
            let preview = imgList[imgList.length-1];
            let file    = document.querySelector('input[type=file]').files[0];
            let reader  = new FileReader();

            reader.onloadend = function () {
              preview.src = reader.result;
            }

            if (file) reader.readAsDataURL(file); //reads the data as a URL
            else preview.src = "";
          },
          closeContentWindow: function() {
            console.log("Close the window here.");
          }
        },
        components: {
        },
        props: ['label','url']
    }
</script>

<style>
  #add-Window {
    width: 95%; 
    height: 350px;
  }
  
  button {
    width:100%;
    height: 20px;
    font-size: 15;
  }
</style>