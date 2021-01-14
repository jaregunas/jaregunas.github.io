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

function orientation(event){
    gamavalue = event.gama
    if(event.gamma < -45.0 && event.gamma > -90.0){
        var canvas = document.getElementById("myCanvas")
        var canvas_context = canvas.getContext("2d");
        canvas_context.fillStyle = "green";
        canvas_context.fill();
    }
    else if(event.gamma > -45.0 || event.gamma < -90.0){
        var canvas = document.getElementById("myCanvas")
        var canvas_context = canvas.getContext("2d");
        canvas_context.fillStyle = "red";
        canvas_context.fill();
    }
    document.getElementById("Gama").innerHTML = "Magnetometer: "
    + event.gamma;
}
    
function go(){
    if(window.DeviceOrientationEvent){
        window.addEventListener("deviceorientation", orientation, true);
        var canvas = document.getElementById("myCanvas")
        if(canvas.getContext){
            console.log("All clear");
            var canvas_context = canvas.getContext("2d");
            var start_degree = 0 ;
            var start_angle = (Math.PI/180) * start_degree;
            var end_degree = 360 ;
            var end_angle = (Math.PI/180) * end_degree;
            canvas_context.beginPath();
            canvas_context.arc(150,150,100,start_angle,end_angle,true);
            canvas_context.fillStyle = "blue";
            canvas_context.fill();
        }
    }
    else{
        var status = document.getElementById("status");
        status.innerHTML = status.innerHTML.replace(
        "is supported", "is not supported"
        );
    }
}

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
        xhr.withCredentials = true;
        // let url = "http://ch-jgunas-mbp.local:5000/index"; 
        let url = "https://vpdwiepwke.execute-api.us-east-1.amazonaws.com/exp_analyzer/predict";

        // open a connection 
        xhr.open("POST", url, true); 
        // Set the request header i.e. which type of content you are sending 
        xhr.setRequestHeader("x-api-key", "mww4JDyy4d9FCtxHAOD392Zbs71ggWv41gHpmGTj")
        xhr.setRequestHeader("Content-Type", "application/json"); 
        // var canvas = document.createElement("canvas");
        // canvas.width = cameraView.width;
        // canvas.height = cameraView.height;
        // var ctx = canvas.getContext("2d");
        // ctx.drawImage(cameraView, 0, 0);
        // var dataURL = canvas.toDataURL("image/png");
        // Request request = new Request.Builder()
        // .url("https://vpdwiepwke.execute-api.us-east-1.amazonaws.com/exp_analyzer/predict")
        // .addHeader("x-api-key", "mww4JDyy4d9FCtxHAOD392Zbs71ggWv41gHpmGTj")
        // .post(body)
        // .build();
        // iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAAA10dzkAAAgAElEQVR4X
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
        if (i<10){
            myLoop();
        }
    }, 1500)
    
}
            
myLoop();




// } 

window.addEventListener("load", cameraStart, false);
