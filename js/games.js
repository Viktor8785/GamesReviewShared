import {gamesData} from './games-data.js';

const gamesTitle = document.querySelector('.games__title');
const gamesList = document.querySelector('.games__list');
const watchButton = document.querySelector('#watch-button');
const elementTemplate = document.querySelector('#element-template')
.content
.querySelector('.games__item');

let urlParams = new URLSearchParams(window.location.search);
let param = urlParams.get('param');
let gamesFiltered = [];

if(param == 'watch') {
  gamesFiltered = getWatchGames();
  gamesTitle.textContent = 'Watchlist';
  watchButton.classList.add('main-nav__item--active');
} else {
  gamesFiltered = getFilteredGames();
  gamesTitle.textContent = param + ' Games';
}

let gamesLength = gamesFiltered.length;
if(gamesLength > 0) {
  for(let i=0; i < gamesLength; i++) {
    const gameTemplate = elementTemplate.cloneNode(true);
    gameTemplate.querySelector('.games__text').textContent = gamesFiltered[i].name;
    gameTemplate.querySelector('.games__img').src = gamesFiltered[i].imgIcon + '-mobile.jpg';
    gameTemplate.querySelector('.games__img').srcset = gamesFiltered[i].imgIcon + '-mobile@2x.jpg 2x';
    gameTemplate.querySelector('.games__img').alt = gamesFiltered[i].name;
    const gameTemplateSource = gameTemplate.querySelectorAll('source');
    gameTemplateSource[0].srcset = gamesFiltered[i].imgIcon + '-tablet.webp 1x, '
     + gamesFiltered[i].imgIcon + '-tablet@2x.webp 2x';
    gameTemplateSource[1].srcset = gamesFiltered[i].imgIcon + '-mobile.webp 1x, '
     + gamesFiltered[i].imgIcon + '-mobile@2x.webp 2x';
    gameTemplateSource[2].srcset = gamesFiltered[i].imgIcon + '-tablet.jpg 1x, '
     + gamesFiltered[i].imgIcon + '-tablet@2x.jpg 2x';
    gameTemplate.addEventListener('click', () => {
      gameTemplate.querySelector('.games__link').href = 'game.html?param=' + gamesFiltered[i].id;
    });
    gamesList.appendChild(gameTemplate);
  }
}

function getFilteredGames() {
   return gamesData.filter((game) => {
    if(game.genre == param) {
      return true;
    }
  });
}

function getWatchGames() {
  let watchList = localStorage.getItem('watch');
  let watchGames = [];
  if(watchList) {
    if(watchList.length > 0) {
      for(let i=0; i < watchList.length / 3; i++) {
        let j = i * 3;
        let gameId = watchList.slice(j, j + 2);
        gamesData.forEach((game) => {
          if(game.id == gameId) {
            watchGames[i] = game;
          }
        });
      }
    }
  }
  return watchGames;
}

watchButton.addEventListener('click', () => {
  watchButton.href = 'games.html?param=watch';
});
