let mobilenet
let myImg;
function modelReady(){
  console.log("Model is ready!")
}

function preload(){
  console.log(ml5.version);
  myImg = loadImage("images/axolot.jpg");
  mobilenet = ml5.imageClassifier('MobileNet', modelReady())

}

function finishLoad(){
  console.log("Image loaded")
}

function setup() {
  createCanvas(600, 600);
  mobilenet.classify(myImg, gotResult);
  image(myImg, 0, 0);
}

// function draw() {
//   background(220);
// }

function gotResult(error, results){
  if(error){
    console.log(error)
  }
  console.log(results)
  createDiv(`Label: ${results[0].label}, ${results[1].label},  ${results[2].label}`)
  createDiv('Confidence: ' + nf(results[0].confidence, 0, 2)); 
}