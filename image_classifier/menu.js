function initialize()
{
    mainImage = document.getElementById("mainimg");
    captionOutput = document.getElementById("caption");
    infoOutput = document.getElementById("info");
    itemThumbs = document.getElementsByClassName("thumb");
    label = document.getElementById("label");
    confidence = document.getElementById("confidence");
    document.getElementById("pagetitle").innerHTML = pageTitle;
    currentItemIdx = 0;
    offset = 0;
    display();
}
function display()
{
    mainImage.src = "images/" + itemList[currentItemIdx].itemImage;
    captionOutput.innerHTML = itemList[currentItemIdx].itemName;
    infoOutput.innerHTML = itemList[currentItemIdx].itemInfo;
    label.innerText = "Label: "
    confidence.innerText = "Confidence: "
    for(var i = 0; i < itemThumbs.length; i++)
        itemThumbs[i].src = "images/" + itemList[i + offset].itemImage;
}
function moveOffset(mod)
{
    offset += mod;
    
    if(offset < 0)
        offset = 0;
        
    if (offset >= itemList.length - 3)
        offset = itemList.length - 3;
        
    display();
}
function selectItem(idx)
{
    currentItemIdx = idx + offset;
    display();
}