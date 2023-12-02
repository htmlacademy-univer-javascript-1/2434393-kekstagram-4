import { isEscapeKey } from './utils.js';

const MAXIMUM_HASTAGS = 5;
const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const documentBody = document.querySelector('body');
const form = documentBody.querySelector('.img-upload__form');
const editForm = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const downloadButton = form.querySelector('.img-upload__start');
const imageLoadingField = form.querySelector('#upload-file');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-text',
});

const extarctHastag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isValidHastag = (value) => extarctHastag(value).every((element) => HASTAG_REGEX.test(element));

const isAmountHastag = (value) => extarctHastag(value).length <= MAXIMUM_HASTAGS;

const isUniqueHastag = (value) => {
  const oneCaseHastags = extarctHastag(value).map((element) => element.toLowerCase());
  return new Set(oneCaseHastags).size === oneCaseHastags.length;
};

pristine.addValidator(hashtagField, isAmountHastag, `Нельзя вводить более ${HASTAG_REGEX} хештегов :-(`);
pristine.addValidator(hashtagField, isValidHastag, 'Хештег невалиден :-(');
pristine.addValidator(hashtagField, isUniqueHastag, 'Хештеги не должны повторяться :-(');

const hideForm = () => {
  editForm.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageLoadingField.value = '';
  hashtagField.value = '';
  commentField.value = '';
  closeButton.removeEventListener('click', onCloseButtonClick);
  pristine.reset();
};

const showForm = () => {
  editForm.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  pristine.validate();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && document.activeElement !== hashtagField
  && document.activeElement !== commentField) {
    evt.preventDefault();
    hideForm();
  }
}

const onDownloadButtonChange = (evt) => {
  evt.preventDefault();
  showForm();
};

function onCloseButtonClick (evt) {
  evt.preventDefault();
  hideForm();
}

downloadButton.addEventListener('change', onDownloadButtonChange);


