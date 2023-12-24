import { isEscapeKey } from './utils.js';
import { resetEffectImage, setupEffectImage, removeEffectImage } from './effect-image.js';
import { resetScaleImage, setupScaleImage, removeScaleImage } from './scale-image.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './upload-status-message.js';

const MAX_COUNT_HASHTAG = 5;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const documentBodyElement = document.querySelector('body');
const imageUploadFormElement = documentBodyElement.querySelector('.img-upload__form');
const editFormElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = imageUploadFormElement.querySelector('.img-upload__cancel');
const imageLoadingFieldElement = imageUploadFormElement.querySelector('.img-upload__input ');
const hashtagFieldElement = imageUploadFormElement.querySelector('.text__hashtags');
const commentFieldElement = imageUploadFormElement.querySelector('.text__description');
const submitButtonElement = documentBodyElement.querySelector('.img-upload__submit');
const imageElement = documentBodyElement.querySelector('.my-image-js');
const effectsPreviews = documentBodyElement.querySelectorAll('.effects__preview');

const pristine = new Pristine (imageUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-text',
});

const showForm = () => {
  editFormElement.classList.remove('hidden');
  documentBodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButtonElement.addEventListener('click', onCloseButtonElementClick);
  setupScaleImage();
  setupEffectImage();
};

const hideForm = () => {
  editFormElement.classList.add('hidden');
  documentBodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonElement.removeEventListener('click', onCloseButtonElementClick);
  removeScaleImage();
  removeEffectImage();
  imageUploadFormElement.reset();
  pristine.reset();
  resetScaleImage();
  resetEffectImage();
};

const extractHashtag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isValidHashtag = (value) => extractHashtag(value).every((element) => HASHTAG_REGEX.test(element));

const isAmountHashtag = (value) => extractHashtag(value).length <= MAX_COUNT_HASHTAG;

const isUniqueHashtag = (value) => {
  const oneCaseHashtags = extractHashtag(value).map((element) => element.toLowerCase());

  return new Set(oneCaseHashtags).size === oneCaseHashtags.length;
};

pristine.addValidator(hashtagFieldElement, isAmountHashtag, `Нельзя вводить более ${MAX_COUNT_HASHTAG} хештегов :-(`);
pristine.addValidator(hashtagFieldElement, isValidHashtag, 'Хештег невалиден :-(');
pristine.addValidator(hashtagFieldElement, isUniqueHashtag, 'Хештеги не должны повторяться :-(');

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && document.activeElement !== hashtagFieldElement
  && document.activeElement !== commentFieldElement) {
    evt.preventDefault();
    hideForm();
  }
}

const onImageLoadingFieldElementChange = (evt) => {
  evt.preventDefault();
  const selectedFile = imageLoadingFieldElement.files[0];

  if(selectedFile.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(selectedFile.name)){
    showForm();
    imageElement.src = URL.createObjectURL(selectedFile);
    effectsPreviews.forEach((picture) => {
      picture.style.backgroundImage = `url('${imageElement.src}')`;
    });
  }
};

function onCloseButtonElementClick (evt) {
  evt.preventDefault();
  hideForm();
}

const openEditPopup = () => {
  imageLoadingFieldElement.addEventListener('change', onImageLoadingFieldElementChange);
};

const blockSubmitButtonElement = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButtonElement = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  imageUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButtonElement();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(()=>{
          showErrorMessage();
        }
        )
        .finally(unblockSubmitButtonElement);
    }
  });
};

export { openEditPopup, setFormSubmit, hideForm, onDocumentKeydown };
