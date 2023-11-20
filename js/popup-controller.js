import { createPopup } from './photo-popup.js';
import { isEscapeKey } from './utils.js';
import { photos } from './main.js';

const documentBody = document.querySelector('body');
const popup = document.querySelector('.big-picture');
const miniatures = document.querySelectorAll('.picture');
const closeButtonPopup = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClosePopup();
  }
};

function onOpenPopup (evt) {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  const selectedPhoto = photos.filter((photo) => +evt.currentTarget.getAttribute('data-id') === photo.id);
  createPopup(selectedPhoto[0]);
  documentBody.classList.add('modal-open');
}

function onClosePopup () {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  documentBody.classList.remove('modal-open');
}

miniatures.forEach((picture) => {
  picture.addEventListener('click', onOpenPopup);
});

closeButtonPopup.addEventListener('click', onClosePopup);
