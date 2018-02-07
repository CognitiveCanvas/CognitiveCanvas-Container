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

// for (i = 0; i < inside.nodes.length; i++){
//     $('.nodeList').append( '<p id="Node-'+ i +'">' + inside.elements.nodes[i].data.id + '</p>' );
// }
//
// for (i = 0; i < inside.edges.length; i++){
//     $('.edgeList').append( '<p id="Edge-'+ i +'">' + inside.elements.nodes[i].data.id + '</p>' );
// }