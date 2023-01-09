pageTitle = "ml5.js: Object Detector using mobilenet";
let detector
let myImg;
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
        return;
    }
    console.log("detected");
    console.log(results);

    document.getElementById("detectMsg").innerHTML = results.length == 0 ?
    "Nothing Detected": "Object Detected";

    table = document.getElementById("detection-table")

    for (let i = 0; i < results.length && i < 3; i++) {
        let obj = results[i];
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(obj.x, obj.y + (canvas_div.clientHeight - myImg.height) / 2, obj.width, obj.height)
        noStroke();
        fill(222,222,222);
        textStyle(BOLD);
        textSize(32);
        text(obj.label, obj.x + 20, obj.y + (canvas_div.clientHeight - myImg.height) / 2 + 40);

        let newRow = table.insertRow();
        let newCell;
        
        newCell = newRow.insertCell();
        newCell.innerHTML = obj.label;
        newCell = newRow.insertCell();
        newCell.innerHTML = obj.confidence * 100 + "%";
    }
}

/*************************Interface/UI/p5 stuff****************************/
function preload() {
    detector = ml5.objectDetector('cocossd', modelReady)
    captionOutput = document.getElementById("caption");
    infoOutput = document.getElementById("info");
    itemThumbs = document.getElementsByClassName("thumb");
    document.getElementById("pagetitle").innerHTML = pageTitle;
    currentItemIdx = 0;
    offset = 0;
    preloadTime = true;
    display();
}

function display() {
    relativesrc = itemList[currentItemIdx].itemImage;
    fullsrc = "../assets/images/" + relativesrc;
    if (!preloadTime) {
        drawImage();
    }
    preloadTime = false;

    captionOutput.innerHTML = itemList[currentItemIdx].itemName == null ? relativesrc.substring(0, relativesrc.lastIndexOf(".")) : itemList[currentItemIdx].itemName;
    infoOutput.innerHTML = itemList[currentItemIdx].itemInfo == null ? "no information found" : itemList[currentItemIdx].itemInfo;
    for (var i = 0; i < itemThumbs.length; i++)
        itemThumbs[i].src = "../assets/images/" + itemList[i + offset].itemImage;
}

function setup() {
    canvas_div = document.getElementById("canvas-div")
    canvas = createCanvas(canvas_div.clientWidth, canvas_div.clientHeight);
    canvas.parent("canvas-div");
    // getContext('2d', { willReadFrequently: true });
    drawImage();
}

//to keep the ratio of the image properly, also draws it in the center
function drawImage() {
    myImg = loadImage(fullsrc, () => {
        ratio = myImg.width / myImg.height;
        myImg.resize(canvas_div.clientWidth, canvas_div.clientWidth / ratio);
        resizeCanvas(myImg.width, canvas_div.clientHeight);
        image(myImg, 0, (canvas_div.clientHeight - myImg.height) / 2);
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