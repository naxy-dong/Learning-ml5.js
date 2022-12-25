//current implementation: have a bunch of images and you can select them
//Future ideas: create a form to drop images and clasify them
let mobilenet
let myImg;
let width = 720
let height = 576
let label
let confidence

function modelReady() {
  console.log("Model is ready!")
}

// function preload(){
//   image_input.addEventListener("change", function(){
//     const reader = new FileReader()
//     reader.addEventListener("load", ()=>{
//       src = reader.result;
//       myImg = loadImage(src, call);
//       image(myImg, 0, 0, width, height);
//     })
//     reader.readAsDataURL(this.files[0])
//   })
//   image(myImg, 0, 0, width, height);
//   src = "images/axolot.jpg"
//   console.log(src)
//   createCanvas(width, height);
// }

function setup() {
  mainImage = document.getElementById("mainimg");
  mobilenet = ml5.imageClassifier('MobileNet', modelReady())
}

function classify() {
  src = mainImage.src;
  myImg = loadImage(src, () => {
    mobilenet.classify(myImg, gotResult);
  });
}

function gotResult(error, results) {
  if (error) {
    console.log(error)
  }
  else{
    label.innerText = `Label: ${results[0].label}, ${results[1].label},  ${results[2].label}`
    confidence.innerText = 'Confidence: ' + nf(results[0].confidence, 0, 2);
  }
}