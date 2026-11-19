// MBAJI SHOP - VISUAL RECOGNITION

let visualCamera = null;
let visualStream = null;
let detectedProducts = [];

function startVisualCamera() {

    const cameraArea = document.getElementById("visualCamera");

    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "environment"
        },
        audio: false
    })
    .then(function(stream) {

        visualStream = stream;

        cameraArea.innerHTML = "";

        const video = document.createElement("video");

        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.style.width = "100%";

        cameraArea.appendChild(video);

    })
    .catch(function(error) {
        alert("Unable to open camera. Please allow camera permission.");
        console.error(error);
    });
}

function stopVisualCamera() {

    if (visualStream) {
        visualStream.getTracks().forEach(track => track.stop());
        visualStream = null;
    }

    document.getElementById("visualCamera").innerHTML = "";
}

function confirmVisualProducts() {

    alert("Product recognition will be connected in the next stage.");
}
