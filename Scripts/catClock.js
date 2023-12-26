var time = new Date();
var hours = ((time.getHours() % 12) + time.getMinutes()/60) * 360;
var minutes = time.getMinutes() * 60;
var seconds = time.getSeconds();

document.querySelector('.hours').style.animationDelay = '-' + hours + 's';
document.querySelector('.minutes').style.animationDelay = '-' + minutes + 's';
document.querySelector('.seconds').style.animationDelay = '-' + seconds + 's';