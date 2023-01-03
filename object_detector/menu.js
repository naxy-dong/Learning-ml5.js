pageTitle = "ml5.js: Object Detector using mobilenet"; 
let detector
let myImg;
let label
let confidence
let fullsrc
let canvas_div 
let preloadTime
let ratio

/*************************ML5.js****************************/
function modelReady() {
    console.log("Model is ready!")
}

function detect() {
    console.log("Detecting... Please wait...")
    detector.detect(myImg, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log("detected");
        console.log(results);

        if(results.length == 0){
            label.innerText = "Nothing Detected";
            confidence.innerText = 'Confidence: 100%';
        }

        for(let i = 0; i < results.length; i++){
            let obj = results[i];
            stroke(0,255,0);
            strokeWeight(4);
            noFill();
            rect(obj.x, obj.y + (canvas_div.clientHeight - myImg.height)/2, obj.width, obj.height)
            // label.innerText = `Label: ${results[0].label}, ${results[1].label},  ${results[2].label}`
            // confidence.innerText = 'Confidence: ' + nf(results[0].confidence, 0, 2);
            console.log(obj);
        }
    }
}

/*************************Interface/UI/p5 stuff****************************/
function preload() {
    detector = ml5.objectDetector('cocossd', modelReady)
    captionOutput = document.getElementById("caption");
    infoOutput = document.getElementById("info");
    itemThumbs = document.getElementsByClassName("thumb");
    label = document.getElementById("label");
    confidence = document.getElementById("confidence");
    document.getElementById("pagetitle").innerHTML = pageTitle;
    currentItemIdx = 0;
    offset = 0;
    preloadTime = true;
    display();
}

function display() {
    relativesrc = itemList[currentItemIdx].itemImage;
    fullsrc = "../assets/images/" + relativesrc;
    if(!preloadTime){
        drawImage();
    }
    preloadTime = false;

    captionOutput.innerHTML = itemList[currentItemIdx].itemName == null ? relativesrc.substring(0, relativesrc.lastIndexOf(".")) : itemList[currentItemIdx].itemName;
    infoOutput.innerHTML = itemList[currentItemIdx].itemInfo == null ? "no information found" : itemList[currentItemIdx].itemInfo;
    label.innerText = "Label: "
    confidence.innerText = "Confidence: "
    for (var i = 0; i < itemThumbs.length; i++)
        itemThumbs[i].src = "../assets/images/" + itemList[i + offset].itemImage;
}

function setup(){
    canvas_div = document.getElementById("canvas-div")
    canvas = createCanvas(canvas_div.clientWidth, canvas_div.clientHeight);
    canvas.parent("canvas-div");
    // getContext('2d', { willReadFrequently: true });
    drawImage();
}

//to keep the ratio of the image properly, also draws it in the center
function drawImage(){
    myImg = loadImage(fullsrc, () =>{
        ratio = myImg.width / myImg.height;
        myImg.resize(canvas_div.clientWidth, canvas_div.clientWidth / ratio);
        resizeCanvas(myImg.width, canvas_div.clientHeight);
        image(myImg, 0,(canvas_div.clientHeight - myImg.height)/2);
    })
}

function windowResized() {
    drawImage();
}

function moveOffset(mod) {
    offset += mod;
    if (offset < 0)
        offset = 0;
    if (offset >= itemList.length - 3)
        offset = itemList.length - 3;
    display();
}

function selectItem(idx) {
    currentItemIdx = idx + offset;
    display();
}

