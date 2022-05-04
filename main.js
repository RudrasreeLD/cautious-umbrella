prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 330,
    height: 300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img = "captured_image" src = "' + data_uri + '"/>';
    })
}

console.log('ml5 version:', ml5.version);

Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QctwxmCZ1/model.json", modelLoaded);

function modelLoaded() {
    console.log('Yahoo!!! Model Is Working');
}

function speak() {
    var synth = window.speechSynthesis;
    v1 = "The first prediction is" + prediction_1;
    v2 = "and the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(v1 + v2);
    synth.speak(utterThis);
}

function click() {
    img = document.getElementById('captured_image');
    Classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "HAPPY") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if (results[0].label == "ANGRY") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if (results[0].label == "SAD") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if (results[1].label == "HAPPY") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }

        if (results[1].label == "ANGRY") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }

        if (results[1].label == "SAD") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
    }
}