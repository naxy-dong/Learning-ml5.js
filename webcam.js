let mobilenet
let myImg;
let width = 680
let height = 540
let div1
let div2

function modelReady() {
    mobilenet.classify(gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    else{
        div1.html(`Label: ${results[0].label}, ${results[1].label},  ${results[2].label}`)
        div2.html('Confidence: ' + nf(results[0].confidence, 0, 2))
        mobilenet.classify(gotResult)
    }
}

function setup() {
    canvas = createCanvas(width, height);
    canvas.hide()
    video = createCapture(VIDEO)
    // video.hide();
    div1 = createDiv()
    div2 = createDiv()
    mobilenet = ml5.imageClassifier('MobileNet', video, modelReady)
}


// if you want to draw the video on the canvas
// function draw() {
//     background(0)
//     image(video, 0, 0)
//     frameRate(60)
// }