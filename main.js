video = "";
valorInput = "";
status1 = false;
objects = [];
function preload() {

}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";

    objectName = document.getElementById("chosedObject").value = valorInput;
}
function modelLoaded() {
    console.log("Modelo Carregado!");
    status1 = true;
}
function draw() {
    image(video, 0, 0, 380, 380)
    if (status1 != "") {
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objetos Detectados";
            document.getElementById("objectStatus").innerHTML = "Quantidade de Objetos detectados: " + objects.length;


            fill("red")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == objectName) {
                video.stop()
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML = objectName + "Encontrado";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectName);
                synth.speak(utterThis);
            }
        }

    }
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
