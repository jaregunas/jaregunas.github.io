// Set constraints for the video stream
var front = false;
// document.getElementById("#flip--button").onclick = function(){ front = !front; };
var constraints = { video: { facingMode: (front? "user": "environment") }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Tilt feature
// let acl = new Accelerometer({frequency: 60});

// acl.addEventListener('reading', () => {
//   console.log("Acceleration along the X-axis " + acl.x);
//   console.log("Acceleration along the Y-axis " + acl.y);
//   console.log("Acceleration along the Z-axis " + acl.z);
// });

// acl.start();
function handleOrientation(event) {
    var absolute = event.acceleration;
    var alpha = event.alpha;

    var beta     = event.beta;
    var gamma    = event.gamma;
    var output_str = "orientation "+absolute+" "+alpha+" "+beta+" "+gamma;
    cameraOutput.innerHTML=output_str;
    // console.log("heyyy in orientation"+absolute+" "+alpha+" "+beta+" "+gamma)
    // Do stuff with the new orientation data
}


function handleOrientation2(event) {
    // console.log("the orientation of the device is now " + event.target.screen.orientation.angle);
  }

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


// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    console.log("im here in button")
//     i=0
//     while (i<5){
//         cameraSensor.width = cameraView.videoWidth;
//         cameraSensor.height = cameraView.videoHeight;
//         cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
//         cameraOutput.src = cameraSensor.toDataURL("image/webp");
//         var encoded_str = cameraOutput.src.substring(23);
//         var json_obj = {
//             "image": encoded_str
//         }
//         var xhr = new XMLHttpRequest();
//         var url = "127.0.0.1:5000";
//         xhr.open("POST", url, true);
//         xhr.setRequestHeader("Content-Type", "application/json");
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 var json = JSON.parse(xhr.responseText);
//                 console.log(xhr.responseText);
//             }
//         };
//         var data = JSON.stringify({"image":"adfw"});
//         xhr.send(data);
//         // var json_str = JSON.stringify(json_obj);
//         // cameraOutput.classList.add("taken");
//         // i++
//         // console.log("taking photo1"+ json_str+"\n")
//         // const Http = new XMLHttpRequest();
//         // const url='https://ch-jgunas-mbp.local:5000';
//         // Http.open("GET", url);
//         // Http.send(json_str);

//         // Http.onreadystatechange = function(){
//         //     if(this.readyState==4 && this.status==200){
//         //         console.log(Http.responseText)
//         //     }
//         // }
//     }
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
// window.addEventListener("deviceoriention", handleOrientation, true);
window.addEventListener('deviceorientation', function(event) {
    console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
  });

// window.addEventListener("orientationchange", );
window.addEventListener("load", handleOrientation, true);
window.addEventListener("load", handleOrientation2, true);
