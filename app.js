// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
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
    i=0
    while (i<1000){
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");
        var encoded_str = cameraOutput.src.substring(23);
        var json_obj = {
            "image": encoded_str
        }
        var json_str = JSON.stringify(json_obj);
        cameraOutput.classList.add("taken");
        i++
        console.log("taking photo1"+ json_str+"\n")
    }
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);