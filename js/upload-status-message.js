import { isEscapeKey } from './utils.js';
import { onDocumentKeydown as onDocumentKeydownEditPopup} from './edit-popup.js';

const documentBodyElement = document.querySelector('body');
const successMessageElement = documentBodyElement.querySelector('#success').content.querySelector('.success');
const errorMessageElement = documentBodyElement.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const messageElement = documentBodyElement.querySelector('.success') || documentBodyElement.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onDocumentKeydownEditPopup);
  documentBodyElement.removeEventListener('click', onDocumentBodyElementClick);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onDocumentBodyElementClick (evt) {
  evt.preventDefault();

  if (evt.target.closest('.success__inner') ||
  evt.target.closest('.error__inner')) {
    return;
  }

  hideMessage();
}

const onMessageElementClick = (evt) => {
  evt.preventDefault();
  hideMessage();
};

const showMessage = (messageElement, closeButtonClass) => {
  documentBodyElement.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onDocumentKeydownEditPopup);
  documentBodyElement.addEventListener('click', onDocumentBodyElementClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', onMessageElementClick);
};

const showSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
