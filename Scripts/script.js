import {giveTestURL} from "./catAPI.js";
import {getRandomIntInterval} from "./random.js";
import {getPics} from "./picsumAPI.js";

const regularRequest = 'https://cataas.com/cat?position=centre';

const testRequest = 'https://picsum.photos/300/200';

//Setting up elements vars

const countInput = document.getElementById("countInput");
let count = 10;

const reloadBtn = document.getElementById("reloadBtn");
reloadBtn.addEventListener("click", reloadCats);

const container = document.getElementById("gallery");


const cols = [];
cols.push(document.getElementById("imgCol1"),document.getElementById("imgCol2"),document.getElementById("imgCol3"),document.getElementById("imgCol4"));

const delay = ms => new Promise(res => setTimeout(res, ms));


document.addEventListener('DOMContentLoaded', async () => {
    //TODO if possible, recheck how to do a masonry layout
    //TODO replace 7 with the amount specified in the frontend

    //getPics();

    for(let col of cols){
        const pics = await getPics();
        console.log(pics);
        for(let i = 0; i < count; i++){
            //const imageUrl = URL.createObjectURL(pics[i]["download_url"]);
            const imageUrl = pics[i]["download_url"];
            const imageElement = document.createElement("img");
            imageElement.classList.add("picture");
            imageElement.src = imageUrl;

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
function reloadCats(){
    console.log("Bravo six, reloading cats");
    //TODO delete previous cat images and get new ones according to categories/tags
    //Maybe concatenate color choice and other tags?
    //Example:
    ///api/cats?tags=tag1,tag2&skip=0&limit=10

    let countTemp = countInput.value;
    if(countTemp !== ""){
        count = countTemp;
    }

}

//Function to make the query to fetch based on the filters set? Or is there a better way to do this?
function makeQuery(){

}


