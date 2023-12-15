import { isEscapeKey } from './utils.js';
import { resetEffect, onEffectNoneButtonChange, onEffectChromeButtonChange,
  onEffectSepiaButtonChange, onEffectMarvinButtonChange, onEffectPhobosButtonChange,
  onEffectHeatButtonChange } from './effect-image.js';
import { resetScale, onMinusSizeButtonCLick, onPlusSizeButtonClick } from './scale-image.js';
import {sendData} from './api.js';
import { showSuccessMessage, showErrorMessage } from './upload-status-message.js';

const MAX_COUNT_HASHTAG = 5;
const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const documentBody = document.querySelector('body');
const form = documentBody.querySelector('.img-upload__form');
const editForm = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const imageLoadingField = form.querySelector('.img-upload__input ');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const minusSizeButton = documentBody.querySelector('.scale__control--smaller');
const plusSizeButton = documentBody.querySelector('.scale__control--bigger');
const effectNoneButton = documentBody.querySelector('#effect-none');
const effectChromeButton = documentBody.querySelector('#effect-chrome');
const effectSepiaButton = documentBody.querySelector('#effect-sepia');
const effectMarvinButton = documentBody.querySelector('#effect-marvin');
const effectPhobosButton = documentBody.querySelector('#effect-phobos');
const effectHeatButton = documentBody.querySelector('#effect-heat');
const submitButton = documentBody.querySelector('.img-upload__submit');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-text',
});

const showForm = () => {
  editForm.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  plusSizeButton.addEventListener('click', onPlusSizeButtonClick);
  minusSizeButton.addEventListener('click', onMinusSizeButtonCLick);
  effectNoneButton.addEventListener('change', onEffectNoneButtonChange);
  effectChromeButton.addEventListener('change', onEffectChromeButtonChange);
  effectSepiaButton.addEventListener('change', onEffectSepiaButtonChange);
  effectMarvinButton.addEventListener('change', onEffectMarvinButtonChange);
  effectPhobosButton.addEventListener('change', onEffectPhobosButtonChange);
  effectHeatButton.addEventListener('change', onEffectHeatButtonChange);
};

const hideForm = (shouldResetForm = true) => {
  editForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  plusSizeButton.removeEventListener('click', onPlusSizeButtonClick);
  minusSizeButton.removeEventListener('click', onMinusSizeButtonCLick);
  effectNoneButton.removeEventListener('change', onEffectNoneButtonChange);
  effectChromeButton.removeEventListener('change', onEffectChromeButtonChange);
  effectSepiaButton.removeEventListener('change', onEffectSepiaButtonChange);
  effectMarvinButton.removeEventListener('change', onEffectMarvinButtonChange);
  effectPhobosButton.removeEventListener('change', onEffectPhobosButtonChange);
  effectHeatButton.removeEventListener('change', onEffectHeatButtonChange);
  imageLoadingField.value = '';
  if(shouldResetForm){
    form.reset();
    pristine.reset();
    resetScale();
    resetEffect();
  }
};

const extarctHastag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isValidHastag = (value) => extarctHastag(value).every((element) => HASTAG_REGEX.test(element));

const isAmountHastag = (value) => extarctHastag(value).length <= MAX_COUNT_HASHTAG;

const isUniqueHastag = (value) => {
  const oneCaseHastags = extarctHastag(value).map((element) => element.toLowerCase());
  return new Set(oneCaseHastags).size === oneCaseHastags.length;
};

pristine.addValidator(hashtagField, isAmountHastag, `Нельзя вводить более ${MAX_COUNT_HASHTAG} хештегов :-(`);
pristine.addValidator(hashtagField, isValidHastag, 'Хештег невалиден :-(');
pristine.addValidator(hashtagField, isUniqueHastag, 'Хештеги не должны повторяться :-(');

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && document.activeElement !== hashtagField
  && document.activeElement !== commentField) {
    evt.preventDefault();
    hideForm();
  }
}

const onImageLoadingFieldChange = (evt) => {
  evt.preventDefault();
  const selectedFiel = imageLoadingField.files[0];
  if(selectedFiel.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(selectedFiel.name)){
    showForm();
  }
};

function onCloseButtonClick (evt) {
  evt.preventDefault();
  hideForm();
}

const openEditPopup = () => {
  imageLoadingField.addEventListener('change', onImageLoadingFieldChange);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(()=>{
          hideForm(false);
          showErrorMessage();
        }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export { openEditPopup, setFormSubmit, hideForm };
