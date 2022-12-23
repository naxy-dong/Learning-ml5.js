//current implementation: have a bunch of images and you can select them
//Future ideas: create a form to drop images and clasify them
let mobilenet
let myImg;
let width = 720
let height = 576
let div1
let div2

function modelReady(){
  console.log("Model is ready!")
}

function preload(){
  const image_input = document.querySelector("#image_input")
  // image_input.addEventListener("change", function(){
  //   const reader = new FileReader()
  //   reader.addEventListener("load", ()=>{
  //     src = reader.result;
  //     myImg = loadImage(src, call);
  //     image(myImg, 0, 0, width, height);
  //   })
  //   reader.readAsDataURL(this.files[0])
  // })
  src = "images/axolot.jpg"
  myImg = loadImage(src);
  image(myImg, 0, 0, width, height);
   
  // src = "images/axolot.jpg"
  // console.log(src)
  mobilenet = ml5.imageClassifier('MobileNet', modelReady())
}

function setup() {
  createCanvas(width, height);
}

function classify(){
  mobilenet.classify(myImg, gotResult);
}

function gotResult(error, results){
  if(error){
    console.log(error)
  }
  console.log(results)
  div1.html(`Label: ${results[0].label}, ${results[1].label},  ${results[2].label}`)
  div2.html('Confidence: ' + nf(results[0].confidence, 0, 2)); 
}