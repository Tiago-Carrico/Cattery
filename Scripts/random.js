
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function getRandomIntInterval(max, min){
    return Math.floor(Math.random() * (max - min)) + min;
};
