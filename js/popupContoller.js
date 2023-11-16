import { createPopup } from './popup.js';
import { isEscapeKey, setAttributesId } from './utils.js';
import { photos } from './main.js';

setAttributesId('.picture');

const SelectorNames = {
  PICTURE_SELECTOR: '.big-picture',
  BODY_SELECTOR: 'body'
};
const miniatures = document.querySelectorAll('.picture');
const closeButtonPopup = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function onOpenPopup (evt) {
  document.querySelector(SelectorNames.PICTURE_SELECTOR).classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  photos.forEach((photo) => {
    if ( +evt.currentTarget.getAttribute('data-id') === photo.id ) {
      createPopup(photo);
    }
  });

  document.querySelector(SelectorNames.BODY_SELECTOR).classList.add('modal-open');
}

function closePopup () {
  document.querySelector(SelectorNames.PICTURE_SELECTOR).classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.querySelector(SelectorNames.BODY_SELECTOR).classList.remove('modal-open');
}

miniatures.forEach((picture) => {
  picture.addEventListener('click', onOpenPopup);
});

closeButtonPopup.addEventListener('click', closePopup);
