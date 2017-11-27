function setSize() {
    document.getElementById('webstratesHere').style.height = document['body'].offsetHeight +'px';
    document.getElementById('webstratesHere').style.width = document['body'].offsetWidth +'px';
}

window.onmessage = function(event) {
    console.log('receive message');
    console.log(event.data);
    document.getElementById("nodeList").innerHTML+=event.data;
};

function listElements() {
    console.log(document.getElementById('webstratesHere').contentWindow);
    document.getElementById('webstratesHere').contentWindow.postMessage('','*');
}

// for (i = 0; i < inside.nodes.length; i++){
//     $('.nodeList').append( '<p id="Node-'+ i +'">' + inside.elements.nodes[i].data.id + '</p>' );
// }
//
// for (i = 0; i < inside.edges.length; i++){
//     $('.edgeList').append( '<p id="Edge-'+ i +'">' + inside.elements.nodes[i].data.id + '</p>' );
// }