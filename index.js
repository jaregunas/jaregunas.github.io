// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor")
var front = false;
// document.getElementById("#flip--button").onclick = function(){ front = !front; };
var constraints = { video: { facingMode: (front? "user": "environment") }, audio: false };

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  
// var base64 = getBase64Image(document.getElementById("imageid"));

// function sendJSON(){ 
let result = document.querySelector('.result'); 
console.log("im here in button")

// let name = document.querySelector('#name');    

var i=0
function myLoop(){
    setTimeout(function(){
        i++
        console.log("count"+i)
        // Creating a XHR object 
        let xhr = new XMLHttpRequest(); 
        let url = "http://ch-jgunas-mbp.local:5000/index"; 
        // open a connection 
        xhr.open("POST", url, true); 
        // Set the request header i.e. which type of content you are sending 
        xhr.setRequestHeader("Content-Type", "application/json"); 
        // var canvas = document.createElement("canvas");
        // canvas.width = cameraView.width;
        // canvas.height = cameraView.height;
        // var ctx = canvas.getContext("2d");
        // ctx.drawImage(cameraView, 0, 0);
        // var dataURL = canvas.toDataURL("image/png");
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        var img= new Image();
        img.src = cameraSensor.toDataURL("image/png");
        var path = img.src
        // var dataURL = cameraSensor.toDataURL("image/png");
        var base64 = path.replace(/^data:image\/(png|jpg);base64,/, "");
        result.innerHTML = base64;
        // result.appendChild(img)
        console.log(base64)
        // Create a state change callback 
        xhr.onreadystatechange = function () { 
            if (xhr.readyState === 4 && xhr.status === 200) { 
                // Print received data from server 
                result.innerHTML = this.responseText + i; 
                console.log(this.responseText)
            } 
        }; 

        // Converting JSON data to string 
        var data = JSON.stringify({ "image": base64}); 
        // Sending data with the request 
        xhr.send(data); 
        if (i<5){
            myLoop();
        }
    }, 3000)
    
}
            
myLoop();




// } 

window.addEventListener("load", cameraStart, false);
