import {giveTestURL} from "./catAPI.js";
import {getRandomIntInterval} from "./random.js";
import {getPics} from "./picsumAPI.js";

const regularRequest = 'https://cataas.com/cat?position=centre';

const testRequest = 'https://picsum.photos/300/200';

//Setting up elements vars

const presetInput = document.getElementById("picPreset");

const blurInput = document.getElementById("blurInput");

const grayInput = document.getElementById("grayInput");

const orderInput = document.getElementById("orderCriteria");

const countInput = document.getElementById("countInput");
let count = 10;

const reloadBtn = document.getElementById("reloadBtn");
reloadBtn.addEventListener("click", reloadPics);

const container = document.getElementById("gallery");


const cols = [];
cols.push(document.getElementById("imgCol1"),document.getElementById("imgCol2"),document.getElementById("imgCol3"),document.getElementById("imgCol4"));

function setBackground(){
    const root = document.querySelector(":root");
    let r = getRandomIntInterval(0, 256);
    let g = getRandomIntInterval(0, 256);
    let b = getRandomIntInterval(0, 256);
    root.style.setProperty('--wallpaperColorLight', 'rgb(' + r + ',' + g + ',' + b + ',1)');
    root.style.setProperty('--wallpaperColorDark', 'rgb(' + (r/2) + ',' + (g/2) + ',' + (b/2) + ',1)');
}

document.addEventListener('DOMContentLoaded', async () => {
    //Here is the random wallpaper color generator for the background
    setBackground();

    await createPics();
})

//Function for the button
async function reloadPics(){
    console.log("Bravo six, reloading cats");

    let countTemp = countInput.value;
    if(countTemp !== ""){
        count = countTemp;
        if(count > 50){
            count = 50;
        }
    };

    //alright this sucessfully deletes everything inside the columns
    for(let col of cols){
        col.innerHTML = '';
    }


    await createPics();
}

async function createPics(){

    let paramsTemp = {};

    if(countInput.value > 50 || countInput.value < 0 || countInput.value === ""){
        count = 10;
        paramsTemp = {
            ...paramsTemp,
            limit: count
        };
    }else {
        count = countInput.value;
        paramsTemp = {
            ...paramsTemp,
            limit: count
        };
    }

    for(let col of cols){
        const pics = await getPics(paramsTemp);
        orderPics(pics);    //can confirm it works, as pics are ordered when option is selected, just can't confirm with console.logs, probably due to the asynchronous nature of the website
        for(let i = 0; i < count; i++){
            //const imageUrl = URL.createObjectURL(pics[i]["download_url"]);
            pics[i]["download_url"] = makeQuery(pics[i]["download_url"]);   //sends the pic for processing in the API
            const imageUrl = pics[i]["download_url"];
            const imageElement = document.createElement("img");
            imageElement.classList.add("picture");
            imageElement.src = imageUrl;

            //TODO try to find a solution that won't overextend but still looks "disorganized"
            imageElement.style.setProperty("margin-left", getRandomIntInterval(20, 100) + "px");
            imageElement.style.setProperty("margin-right", getRandomIntInterval(20, 100) + "px");

            col.appendChild(imageElement);
        }
    }
}

function orderPics(picsArr){
    let orderCrit = orderInput.value;

    if(orderCrit === "sizeAsc"){
        //console.log("ordering ascending size")
        picsArr.sort(compareAsc);
    }
    else if(orderCrit === "sizeDesc"){
        //console.log("ordering descending size");
        picsArr.sort(compareDesc);
    }
    else{
        return;
    }
}

function compareAsc(a, b) {
    if(a["size"] < b["size"]){
      return -1;
    }else if(a["size"] > b["size"]){
      return 1;
    }
    return 0;
}

function compareDesc(a, b) {
    if(a["size"] < b["size"]){
      return 1;
    }else if(a["size"] > b["size"]){
      return -1;
    }
    return 0;
}

//Function to make the query to fetch based on the filters set? Or is there a better way to do this?
function makeQuery(imageUrl){
    //console.log("default image url: " + imageUrl);

    let tempPreset = presetInput.value;
    switch(tempPreset){
        case "null":
            //console.log("No preset selected");
            return runParamsFromForm(imageUrl, blurInput.value, grayInput.value);
        case "veryOld":
            //console.log("Very old preset selected, add grayscale to all pictures and some blur");
            return runParamsFromForm(imageUrl, "5", "10");
        case "old":
            //console.log("Old preset selected, add grayscale pictures");
            return runParamsFromForm(imageUrl, "0", "3");  //only old has some grayscaled, but no blur
        case "recent":
            //console.log("Recent preset selected, don't add grayscale nor blur");
            return imageUrl;    //since recent is without modifications, we can just send it
    }
}

//TODO alright so since the api list function doesn't accept optional parameters as a list (can't use blur or grayscale) this function will use the id's of the pics returned and apply that stuff to them
//This will even allow the previously thought feature of random bluring and grayscaling
//I'm thinking, make another function (makeQuery) that takes the whole image list, differentiates between presets, and then runs this on a loop, and the new request urls are made here, and the request in the root function (above the one that calls this one)
function runParamsFromForm(imageData, blurParam, grayParam){
    //console.log(imageData);

    //This is for freestyle
    if(blurParam === "0" && grayParam === "0"){
        //console.log("squeaky clean");
        return imageData;
    } else if(blurParam !== "0" && grayParam === "0"){
        if(getRandomIntInterval(0, 10) < blurParam){
            imageData = imageData+"?blur=2";
            //console.log("blurred");
        }
        return imageData;
    } else if(blurParam === "0" && grayParam !== "0"){
        if(getRandomIntInterval(0, 10) < grayParam){
            imageData = imageData+"?grayscale";
            //console.log("gray");
        }
        return imageData;
    } else {
        if(getRandomIntInterval(0, 10) < blurParam){
            imageData = imageData+"?blur=2";
            if(getRandomIntInterval(0, 10) < grayParam){
                imageData = imageData+"&grayscale";
                //console.log("blurred and gray");
            }
        }
        else{
            if(getRandomIntInterval(0, 10) < grayParam){
                imageData = imageData+"?grayscale";
                //console.log("gray");
            }
        }
        return imageData;
    }
}

