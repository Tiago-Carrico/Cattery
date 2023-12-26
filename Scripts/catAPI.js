import {getRandomIntInterval} from "./random.js";

const regularBaseRequest = 'https://cataas.com/cat?position=centre';

const testBaseRequest = 'https://picsum.photos';

function buildTestURL(height, width) {
    const testAdd = "/" + width + "/" + height;

    const url = new URL(testAdd, testBaseRequest);
    console.log(url);
    return url;
}

const giveTestURL = () => {
    return buildTestURL(getRandomIntInterval(400, 700), getRandomIntInterval(400, 700));
}

export {giveTestURL};