import {gamesData} from './games-data.js';

const gameImg = [];
gameImg[0] = document.querySelector('#img1');
gameImg[1] = document.querySelector('#img2');
gameImg[2] = document.querySelector('#img3');
const cardContainer = document.querySelector('.game__card-container');
const gameName = document.querySelector('.game__name');
const gameGenre = document.querySelector('.game__genre');
const gameText = document.querySelector('.game__text');
const buttonBack = document.querySelector('.game__button-back');
const buttonWatchlist = document.querySelector('.game__button-watchlist');
const buttonSvg = document.querySelector('.game__button-svg');
const buttonLeft = document.querySelector('.game__button-left');
const buttonRight = document.querySelector('.game__button-right');
const watchButton = document.querySelector('#watch-button');

let urlParams = new URLSearchParams(window.location.search);
let param = urlParams.get('param');
let game = gamesData.find(game => game.id == param);
let currentIndex = 0;

let leftXs = [];
leftXs[0] = 0;
leftXs[1] = -374;
leftXs[2] = -748;
let leftX = 0;
cardContainer.style.left = 0;

let watchList = localStorage.getItem('watch');
let watchListFlag = false;

if(watchList) {
  if(watchList.indexOf(param) >= 0) {
    buttonSvg.classList.add('game__button-svg--active');
    watchListFlag = true;
  }
}

gameImg[0].src = game.imgMobile1;
gameImg[1].src = game.imgMobile2;
gameImg[2].src = game.imgMobile3;
gameName.textContent = game.name;
gameGenre.textContent = game.genre;
gameText.textContent = game.text;

buttonBack.addEventListener('click', () => {
  window.history.go(-1);
});

buttonWatchlist.addEventListener('click', () => {
  buttonSvg.classList.toggle('game__button-svg--active');
  watchList = localStorage.getItem('watch');
  let watchListNew = '';
  if(watchListFlag) {
    watchListFlag = false;
    if(watchList.length == 3) {
      watchListNew = '';
    } else {
      let indexWatch = watchList.indexOf(param);
      if(indexWatch == 0) {
        watchListNew = watchList.slice(watchList.indexOf(param) + 3);
      }
      if(indexWatch == watchList.length - 3) {
        watchListNew = watchList.slice(0, watchList.indexOf(param));
      }
      if(indexWatch > 0 && indexWatch < watchList.length - 3) {
        watchListNew = watchList.slice(0, watchList.indexOf(param))
        + watchList.slice(watchList.indexOf(param) + 3);
      }
    }
  } else {
    watchListNew = param + ' ' ;
    if(watchList) {
      if(watchList.length > 0) {
        watchListNew = watchList + param + ' ' ;
      }
    }
    watchListFlag = true;
  }
  localStorage.setItem('watch', watchListNew);
});

buttonLeft.addEventListener('click', () => {
  if(currentIndex > 0) {
    currentIndex--;
    leftX = leftXs[currentIndex];
    cardContainer.style.left = leftX + 'px';
  }
});

buttonRight.addEventListener('click', () => {
  if(currentIndex < 2) {
    currentIndex++;
    leftX = leftXs[currentIndex];
    cardContainer.style.left = leftX + 'px';
  }
});

watchButton.addEventListener('click', () => {
  watchButton.href = 'games.html?param=watch';
});
