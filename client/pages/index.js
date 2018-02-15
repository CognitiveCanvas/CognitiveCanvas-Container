import Vue from 'vue';
import Router from 'vue-router';





































function setSize() {
    document.getElementById('webstratesHere').style.height = document['body'].offsetHeight +'px';
    document.getElementById('webstratesHere').style.width = document['body'].offsetWidth + 'px';
}

// window.onmessage = function(event) {
//     console.log('receive message');
//     console.log(event.data);
//     document.getElementById("nodeList").innerHTML+=event.data;
// };

function listElements() {
    // document.getElementById('webstratesHere').contentWindow.postMessage('','*');
    console.log(document.getElementById('webstratesHere').contentWindow.canvas.childNodes);

    for (i = 0; i < document.getElementById('webstratesHere').contentWindow.canvas.childNodes.length; i++) {
        if (document.getElementById('webstratesHere').contentWindow.canvas.childNodes[i].nodeName === "#text") {
            document.getElementById("labelList").innerHTML+=" Find Label ";
        }
        else if (document.getElementById('webstratesHere').contentWindow.canvas.childNodes[i].nodeName === "line") {
            document.getElementById("edgeList").innerHTML+=" Find Edge ";
        }
        else if (document.getElementById('webstratesHere').contentWindow.canvas.childNodes[i].nodeName === "circle") {
            document.getElementById("nodeList").innerHTML+=" Find Node ";
        }

    }


}
function menu(x) {
    x.classList.toggle("change");
}
function openTool(evt, toolName) {
    // Declare all variables
    var i, tabcontent, anchor;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    anchor = document.getElementsByClassName("anchor");
    for (i = 0; i < anchor.length; i++) {
        anchor[i].className = anchor[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(toolName).style.display = "block";
    evt.currentTarget.className += " active";
}

function drop(a) {
  a.parentNode.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

$.get('/searchKeyword', parameters, function(data) {
});





//     $('.nodeList').append( '<p id="Node-'+ i +'">' + inside.elements.nodes[i].data.id + '</p>' );
// }
//
// for (i = 0; i < inside.edges.length; i++){
//     $('.edgeList').append( '<p id="Edge-'+ i +'">' + inside.elements.nodes[i].data.id + '</p>' );
// }