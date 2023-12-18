import { randomSort } from './utils.js';

const RANDOM_NUMBER_PHOTOS = 10;

const documentBody = document.querySelector('body');
const imageFiltres = documentBody.querySelector('.img-filters');
const filterDefaultButton = documentBody.querySelector('#filter-default');
const filterRandomButton = documentBody.querySelector('#filter-random');
const filterDiscussedButton = documentBody.querySelector('#filter-discussed');
let pictures = [];
let callback = null;

const showImageFiltres = () => {
  imageFiltres.classList.remove('img-filters--inactive');
};

const overrideActiveElement = (clickElement) => {
  const activeElement = documentBody.querySelector('.img-filters__button--active');
  activeElement.classList.remove('img-filters__button--active');
  clickElement.target.classList.add('img-filters__button--active');
};

const onFilterDefaultButtonClick = (evt) => {
  evt.preventDefault();
  overrideActiveElement(evt);
  callback([...pictures]);
};

const onFilterRandomButtonClick = (evt) => {
  evt.preventDefault();
  overrideActiveElement(evt);
  callback([...pictures].sort(randomSort).slice(0,RANDOM_NUMBER_PHOTOS));
};

function sortArrayComments (pictureA, pictureB) {
  return pictureB.comments.length - pictureA.comments.length;
}

const onFilterDiscussedButtonClick = (evt) => {
  evt.preventDefault();
  overrideActiveElement(evt);
  callback([...pictures].sort(sortArrayComments));
};

const initFiltration = (data, cb) => {
  pictures = [...data];
  showImageFiltres();
  filterDefaultButton.addEventListener('click', onFilterDefaultButtonClick);
  filterRandomButton.addEventListener('click', onFilterRandomButtonClick);
  filterDiscussedButton.addEventListener('click', onFilterDiscussedButtonClick);
  callback = cb;
};

export { initFiltration };
