const genreText = document.querySelectorAll('.genre__text');
const genreItem = document.querySelectorAll('.genre__item');
const genreSvgChecked = document.querySelectorAll('.genre__svg-checked');
const genreButton = document.querySelector('.genre__button');
const watchButton = document.querySelector('#watch-button');

let currentIndex = -1;

genreItem.forEach((item, index) => {
  item.addEventListener('click', () => {
    if(currentIndex >= 0) {
      genreItem[currentIndex].classList.remove('genre__item--active');
      genreSvgChecked[currentIndex].classList.remove('genre__svg-checked--active')
    }
    currentIndex = index;
    item.classList.add('genre__item--active');
    genreSvgChecked[index].classList.add('genre__svg-checked--active')
    genreButton.classList.add('genre__button--active')
  });
});

genreButton.addEventListener('click', () => {
  if(currentIndex >= 0) {
    genreButton.href = 'games.html?param=' + genreText[currentIndex].textContent;
  }
});

watchButton.addEventListener('click', () => {
  watchButton.href = 'games.html?param=watch';
});
