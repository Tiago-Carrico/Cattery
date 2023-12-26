
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const getRandomIntInterval = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export {getRandomIntInterval};