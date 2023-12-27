import {getRandomIntInterval} from "./random.js";

const regularBaseRequest = 'https://picsum.photos';
const listAdd = '/v2/list'
//let randomPage = '?page=' + getRandomIntInterval(0, 20);


function createRandomPage(){
    let randomPage = '?page=' + getRandomIntInterval(0, 20);
    return randomPage;
}

function buildTestURL(height, width) {
    const testAdd = "/" + width + "/" + height;

    const url = new URL(testAdd, regularBaseRequest);
    console.log(url);
    return url;
}

function buildURL(addition, page, params) {
    const url = new URL(addition + page, regularBaseRequest);    //TODO shouldn't it have more before regularRequest?
    const paramsVar = new URLSearchParams(params);
    paramsVar.forEach((v, k) => {
        url.searchParams.append(k, v);
    });

    return url;
}

//TODO don't forget to make sure number of elements is contained in params, also to call one of these for each column, maybe choose different pages for each?
async function getPics(params){
    let randomPage = createRandomPage();
    console.log(randomPage);
    const url = buildURL(listAdd, randomPage,params);
    const picList = await fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
        //console.log(response);
        return response.map((pic) => {
            const {author, download_url, height, width} = pic;
            //can pass things correctly like this, so you don't have to parse it all on the main script and it gets better organized
            const size = height * width;
            return {author, download_url, height, width, size}; //this format is good
        })
    });
    //console.log(picList);
    //console.log(picList);
    return picList;
}


const giveTestURL = () => {
    return buildTestURL(getRandomIntInterval(400, 700), getRandomIntInterval(400, 700));
}

export {getPics};