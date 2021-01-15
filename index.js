// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraSensor = document.querySelector("#camera--sensor")

// document.getElementById("#camera--sensor").style.visibility = "hidden";
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
        canvas_context.fillStyle = "rgb(111, 199, 28)";
        canvas_context.fill();
    }
    else if(event.gamma > -45.0 || event.gamma < -90.0){
        var canvas = document.getElementById("myCanvas")
        var canvas_context = canvas.getContext("2d");
        canvas_context.fillStyle = "rgb(242, 69, 39)";
        canvas_context.fill();
    }

    // canvas_context.font = "20px Arial";
    // canvas_context.fillText(gamavalue, 185, 65);
    document.getElementById("Gama").innerHTML = "Orientation: "
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
            canvas_context.arc(250,30,30,start_angle,end_angle,true);
            
            canvas_context.fillStyle = "teal";
            canvas_context.fill();
            canvas_context.translate(350, 20);
           
        }
    }
}
let result = document.querySelector('.result'); 
// document.getElementById("Gama").innerHTML = "Magnetometer: 45555555"
var i=0

function myLoop(){
    setTimeout(function(){
        i++
        console.log("count"+i)
        // Creating a XHR object 
        let xhr = new XMLHttpRequest(); 
        // xhr.withCredentials = true;
        // let url = "http://ch-jgunas-mbp.local:5000/index"; 
        let url = "https://vpdwiepwke.execute-api.us-east-1.amazonaws.com/exp_analyzer/predict";

        // open a connection 
        xhr.open("POST", url, true); 
        // Set the request header i.e. which type of content you are sending 
        xhr.setRequestHeader("x-api-key", "mww4JDyy4d9FCtxHAOD392Zbs71ggWv41gHpmGTj")
        // xhr.setRequestHeader("Content-Type", "application/json"); 
        // iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAAA10dzkAAAgAElEQVR4X
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        var img= new Image();
        img.src = cameraSensor.toDataURL("image/png");
        var path = img.src
        // var dataURL = cameraSensor.toDataURL("image/png");
        var base64 = path.replace(/^data:image\/(png|jpg);base64,/, "");
        // result.innerHTML = base64;
        // result.appendChild(img)
        // console.log(base64)
        // Create a state change callback 
        xhr.onreadystatechange = function () { 
            if (xhr.readyState === 4 && xhr.status === 200) { 
                // Print received data from server 
                result.innerHTML = this.responseText; 
                // result.innerHTML = predicted_json["result"];
                console.log(this.responseText)
            } 
        }; 

        // Converting JSON data to string 
        var data = JSON.stringify({ "image": base64}); 
        // Sending data with the request 
        xhr.send(data); 
        if (i>0){
            myLoop();
        }
    }, 1000)
    
}
            
setTimeout(myLoop(), 2000);




// } 

window.addEventListener("load", cameraStart, false);
