import { isEscapeKey } from './utils.js';
import { onDocumentKeydown as onDocumentKeydownEditPopup} from './edit-popup.js';

const bodyElement = document.querySelector('body');
const successMessage = bodyElement.querySelector('#success').content.querySelector('.success');
const errorMessage = bodyElement.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const messageElement = bodyElement.querySelector('.success') || bodyElement.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onDocumentKeydownEditPopup);
  bodyElement.removeEventListener('click', onBodyElementClick);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }

}

function onBodyElementClick (evt) {
  evt.preventDefault();
  if (evt.target.closest('.success__inner') ||
  evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const showMessage = (messageElement, closeButtonClass) => {
  bodyElement.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onDocumentKeydownEditPopup);
  bodyElement.addEventListener('click', onBodyElementClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
