const reloadBtn = document.getElementById("reloadBtn");
reloadBtn.addEventListener("click", reloadCats);

document.addEventListener('DOMContentLoaded', () => {
    for(let i = 0; i < 10; i++){
        fetch('https://cataas.com/cat?position=centre', {
            method: 'GET'
        })
        .then(response => response.blob())
        .then(blob => {
    // Do something with the image data
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            const container = document.getElementById("gallery");
            container.appendChild(imageElement);
        })
        .catch(error => console.error(error));
    }
})

function reloadCats(){
    console.log("Bravo six, reloading cats");
    //TODO delete previous cat images and get new ones according to categories/tags
    //Maybe concatenate color choice and other tags?
    //Example:
    ///api/cats?tags=tag1,tag2&skip=0&limit=10
}

//Function to make the query to fetch based on the filters set? Or is there a better way to do this?
function makeQuery(){

}