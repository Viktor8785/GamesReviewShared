
/*const photoInput = document.querySelector('.photo__input');
const photo = document.querySelector('.photo__img');
const closeButton = document.querySelector('.close-button');
const contrastButton = document.querySelector('#contrast-button');
const brightnessButton = document.querySelector('#brightness-button');
const saturateButton = document.querySelector('#saturate-button');
const grayButton = document.querySelector('#gray-button');
const sepiaButton = document.querySelector('#sepia-button');
const blurButton = document.querySelector('#blur-button');
const saveButton = document.querySelector('#save-button');
const rangeInput = document.querySelector('.range__input');
const footerItem = document.querySelectorAll('.footer__item');
const backButton = document.querySelector('#back-button');

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d", { willReadFrequently: true });
var image = new Image();
let photoChanged = false;
let filterName = '';
let currentItem = 0;
let filterComposit = '';
rangeInput.disabled = true;

photoInput.addEventListener('change', () => {
  let file = photoInput.files[0];
  let reader = new FileReader();
  reader.addEventListener('load', () => {
    image.src = reader.result;
    photo.src = reader.result;
    photo.classList.add('photo__img--active');
    closeButton.classList.add('close-button--active');
  })
  reader.readAsDataURL(file);

});

closeButton.addEventListener('click', () => {
  filterComposit = '';
  filterName = '';
  photo.style.filter = filterComposit;
  photoChanged = false;
  rangeInput.value = 15;
  rangeInput.disabled = true;
  photo.classList.remove('photo__img--active');
  closeButton.classList.remove('close-button--active');
  footerItem[currentItem].classList.remove('footer__item--active');
  currentItem = 0;
});

backButton.addEventListener('click', () => {
  backFilter();
  photo.style.filter = filterComposit;
  footerItem[currentItem].classList.remove('footer__item--active');
  currentItem = 0;
  rangeInput.value = 15;
  rangeInput.disabled = true;
  filterName = '';
});

contrastButton.addEventListener('click', () => {
  if(!photo.classList.contains('photo__img--active')) {
    return;
  }
  footerItem[currentItem].classList.remove('footer__item--active');
  currentItem = 0;
  footerItem[currentItem].classList.add('footer__item--active');
  rangeInput.disabled = false;
  photoChanged = true;
  changeFilter(rangeInput.value);
  filterName = 'contrast';
  rangeInput.value = 15;
});

brightnessButton.addEventListener('click', () => {
  if(!photo.classList.contains('photo__img--active')) {
    return;
  }
  footerItem[currentItem].classList.remove('footer__item--active');
  currentItem = 1;
  footerItem[currentItem].classList.add('footer__item--active');
  rangeInput.disabled = false;
  photoChanged = true;
  changeFilter(rangeInput.value);
  filterName = 'brightness';
  rangeInput.value = 15;
});

saturateButton.addEventListener('click', () => {
  if(!photo.classList.contains('photo__img--active')) {
    return;
  }
  footerItem[currentItem].classList.remove('footer__item--active');
  currentItem = 2;
  footerItem[currentItem].classList.add('footer__item--active');
  rangeInput.disabled = false;
  photoChanged = true;
  changeFilter(rangeInput.value);
  filterName = 'saturate';
  rangeInput.value = 15;
});

grayButton.addEventListener('click', () => {
  if(!photo.classList.contains('photo__img--active')) {
    return;
  }
  footerItem[currentItem].classList.remove('footer__item--active');
  currentItem = 3;
  footerItem[currentItem].classList.add('footer__item--active');
  rangeInput.disabled = false;
  photoChanged = true;
  changeFilter(rangeInput.value);
  filterName = 'grayscale';
  rangeInput.value = 0;
});

sepiaButton.addEventListener('click', () => {
  if(!photo.classList.contains('photo__img--active')) {
    return;
  }
  footerItem[currentItem].classList.remove('footer__item--active');
  currentItem = 4;
  footerItem[currentItem].classList.add('footer__item--active');
  rangeInput.disabled = false;
  photoChanged = true;
  changeFilter(rangeInput.value);
  filterName = 'sepia';
  rangeInput.value = 0;
});

blurButton.addEventListener('click', () => {
  if(!photo.classList.contains('photo__img--active')) {
    return;
  }
  footerItem[currentItem].classList.remove('footer__item--active');
  currentItem = 5;
  footerItem[currentItem].classList.add('footer__item--active');
  rangeInput.disabled = false;
  photoChanged = true;
  changeFilter(rangeInput.value);
  filterName = 'blur';
  rangeInput.value = 0;
});

saveButton.addEventListener('click', (evt) => {
  if(!photoChanged) {
    evt.preventDefault();
    return;
  }
  footerItem[currentItem].classList.remove('footer__item--active');
  currentItem = 0;
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  changeCanvas(rangeInput.value);
  ctx.drawImage(image, 0, 0);
  //const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //ctx.putImageData(imageData, 0, 0);
  var dataURL = canvas.toDataURL('image/jpeg');
  saveButton.href = dataURL;
  saveButton.download = 'canvas_photo_editor_1.jpg';
});

rangeInput.addEventListener('input', (evt) => {
  changePhoto(rangeInput.value);
});

let changePhoto = function(value) {
  if(!filterName) {
    return;
  }
  if(filterName == 'contrast') {
    photo.style.filter = filterComposit + ' contrast(' + value / 15 + ')';
  }
  if(filterName == 'brightness') {
    photo.style.filter = filterComposit + ' brightness(' + value / 15 + ')';
  }
  if(filterName == 'saturate') {
    photo.style.filter = filterComposit + ' saturate(' + value / 15 + ')';
  }
  if(filterName == 'grayscale') {
    photo.style.filter = filterComposit + ' grayscale(' + value / 30 + ')';
  }
  if(filterName == 'sepia') {
    photo.style.filter = filterComposit + ' sepia(' + value / 30 + ')';
  }
  if(filterName == 'blur') {
    photo.style.filter = filterComposit + ' blur(' + value / 3 + 'px)';
  }
}

let changeCanvas = function(value) {
  if(!filterName && !filterComposit) {
    return;
  }
  if(filterComposit) {
    ctx.filter = filterComposit;
  }
  if(filterName == 'contrast') {
    ctx.filter = filterComposit + ' contrast(' + value / 15 + ')';
  }
  if(filterName == 'brightness') {
    ctx.filter = filterComposit + ' brightness(' + value / 15 + ')';
  }
  if(filterName == 'saturate') {
    ctx.filter = filterComposit + ' saturate(' + value / 15 + ')';
  }
  if(filterName == 'grayscale') {
    ctx.filter = filterComposit + ' grayscale(' + value / 30 + ')';
  }
  if(filterName == 'sepia') {
    ctx.filter = filterComposit + ' sepia(' + value / 30 + ')';
  }
  if(filterName == 'blur') {
    ctx.filter = filterComposit + ' blur(' + value / 3 + 'px)';
  }
}

let changeFilter = function(value) {
  if(!filterName) {
    return;
  }
  if(filterName == 'contrast') {
    filterComposit = filterComposit + ' contrast(' + value / 15 + ')';
  }
  if(filterName == 'brightness') {
    filterComposit = filterComposit + ' brightness(' + value / 15 + ')';
  }
  if(filterName == 'saturate') {
    filterComposit = filterComposit + ' saturate(' + value / 15 + ')';
  }
  if(filterName == 'grayscale') {
    filterComposit = filterComposit + ' grayscale(' + value / 30 + ')';
  }
  if(filterName == 'sepia') {
    filterComposit = filterComposit + ' sepia(' + value / 30 + ')';
  }
  if(filterName == 'blur') {
    filterComposit = filterComposit + ' blur(' + value / 3 + 'px)';
  }
}

let backFilter = function() {
  if(filterComposit) {
    let lastIndex = filterComposit.lastIndexOf(' ');
    filterComposit = filterComposit.slice(0, lastIndex);
  }
}*/
