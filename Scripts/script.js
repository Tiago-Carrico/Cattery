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

    //TODO if possible, recheck how to do a masonry layout

    

    //TODO still possible to just get 4 times the amount of pictures per column and divide them here
    for(let col of cols){
        const pics = await getPics();
        //TODO don't forget to order pics by order criteria

        //console.log(pics);
        for(let i = 0; i < count; i++){
            //const imageUrl = URL.createObjectURL(pics[i]["download_url"]);
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
    /*
    for (let col of cols){
        for(let i = 0; i < count; i++){
            fetch(giveTestURL(), {
                method: 'GET'
            })
            .then(response => response.blob())
            .then(blob => {
        // Do something with the image data
                const imageUrl = URL.createObjectURL(blob);
                const imageElement = document.createElement("img");
                imageElement.classList.add("catPicture");
                imageElement.src = imageUrl;
                //To get a more crooked/homely appearance
                imageElement.style.setProperty("margin-left", getRandomIntInterval(20, 100) + "px");
                imageElement.style.setProperty("margin-right", getRandomIntInterval(20, 100) + "px");
                
                col.appendChild(imageElement);
            })
            .catch(error => console.error(error));
        }
    };*/
})

//Function for the button
function reloadPics(){
    console.log("Bravo six, reloading cats");
    //TODO delete previous cat images and get new ones according to categories/tags
    //Maybe concatenate color choice and other tags?
    //Example:
    ///api/cats?tags=tag1,tag2&skip=0&limit=10


    makeQuery();

    let countTemp = countInput.value;
    if(countTemp !== ""){
        count = countTemp;
        if(count > 50){
            count = 50;
        }
    };

}

//Function to make the query to fetch based on the filters set? Or is there a better way to do this?
function makeQuery(){
    let tempPreset = presetInput.value;
    switch(tempPreset){
        case "null":
            console.log("No preset selected");
            //TODO actually gather the stuff from the form here and pass it to the picsumAPI or something
            runParamsFromForm("idk fam", blurInput.value, grayInput.value);

            break;
        case "veryOld":
            console.log("Very old preset selected, add grayscale to all pictures and some blur");
            

            break;
        case "old":
            console.log("Old preset selected, add grayscale pictures");


            break;
        case "recent":
            console.log("Recent preset selected, don't add grayscale nor blur");


            break;
    }
}

//TODO alright so since the api list function doesn't accept optional parameters as a list (can't use blur or grayscale) this function will use the id's of the pics returned and apply that stuff to them
//This will even allow the previously thought feature of random bluring and grayscaling
function runParamsFromForm(imageData, blurParam, grayParam){

    if(blurParam === "0" && grayParam === "0"){
        console.log("squeaky clean");
        return imageData;
    } else if(blurParam !== "0" && grayParam === "0"){
        console.log("some blur " + blurParam);
    } else if(blurParam === "0" && grayParam !== "0"){
        console.log("some grayscale " + grayParam);
    } else {
        console.log("a bit of both blur: " + blurParam + " gray: " + grayParam);
    }
    /*
    let params = {};
    if(blurParam === true){
        params = {
            ...params,
            blur: "1"
        };
    };

    if(grayParam === true){
        params = {
            ...params,
            grayscale: ""
        }
    }*/

    let params = new URLSearchParams();
    params.append("grayscale", '');
    //let paramsTest = params.toString().replace('=remove', '');
    //console.log("paramssTest: " + paramsTest);

    console.log("params: " + params);

    let picsParamTest = getPics(params);
    console.log(picsParamTest)

}

