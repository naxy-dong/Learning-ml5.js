// const express = require('express')
// const app = express()

// app.listen(8080, () => {
//   console.log('FARM STAND APP LISTENING on PORT 8080!')
// })

let mobilenet
let myImg;
let width = 780
let height = 600

function modelReady(){
  console.log("Model is ready!")
}

function preload(){
  console.log(ml5.version);
  src = "images/axolot.jpg"
  console.log(src)
  myImg = loadImage(src);
  mobilenet = ml5.imageClassifier('MobileNet', modelReady())
}

function setup() {
  createCanvas(width, height);
  mobilenet.classify(myImg, gotResult);
  image(myImg, 0, 0, width, height);
}

function gotResult(error, results){
  if(error){
    console.log(error)
  }
  console.log(results)
  createDiv(`Label: ${results[0].label}, ${results[1].label},  ${results[2].label}`)
  createDiv('Confidence: ' + nf(results[0].confidence, 0, 2)); 
}