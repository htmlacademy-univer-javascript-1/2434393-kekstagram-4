import { isEscapeKey } from './utils.js';

const MAX_COUNT_HASHTAG = 5;
const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const ZOOM_STEP = 25;
const MAXIMUM_SCALE = 100;
const MINIMUM_SCALE = 25;
const effectChrome = {
  STYLE: 'grayscale',
  MIN: 0,
  MAX: 1,
  STEP: 0.1,
  UNIT: ''
};
const effectSepia = {
  STYLE: 'sepia',
  MIN: 0,
  MAX: 1,
  STEP: 0.1,
  UNIT: ''
};
const effectMarvin = {
  STYLE: 'invert',
  MIN: 0,
  MAX: 100,
  STEP: 1,
  UNIT: '%'
};
const effectPhobos = {
  STYLE: 'blur',
  MIN: 0,
  MAX: 3,
  STEP: 0.1,
  UNIT: 'px'
};
const effectHeat = {
  STYLE: 'brightness',
  MIN: 1,
  MAX: 3,
  STEP: 0.1,
  UNIT: ''
};

const documentBody = document.querySelector('body');
const form = documentBody.querySelector('.img-upload__form');
const editForm = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const imageLoadingField = form.querySelector('.img-upload__input ');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const sizeField = documentBody.querySelector('.scale__control--value');
const minusSizeButton = documentBody.querySelector('.scale__control--smaller');
const plusSizeButton = documentBody.querySelector('.scale__control--bigger');
const imageElement = documentBody.querySelector('.my-image-js');
const sliderElement = documentBody.querySelector('.effect-level__slider');
const effectValueField = documentBody.querySelector('.effect-level__value');
const sliderContainer = documentBody.querySelector('.img-upload__effect-level');
const effectNoneButton = documentBody.querySelector('#effect-none');
const effectChromeButton = documentBody.querySelector('#effect-chrome');
const effectSepiaButton = documentBody.querySelector('#effect-sepia');
const effectMarvinButton = documentBody.querySelector('#effect-marvin');
const effectPhobosButton = documentBody.querySelector('#effect-phobos');
const effectHeatButton = documentBody.querySelector('#effect-heat');

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
  initValidate();
};

const hideForm = () => {
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
  hashtagField.value = '';
  commentField.value = '';
  pristine.reset();
  resetScale();
  resetEffect();
};

const extarctHastag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isValidHastag = (value) => extarctHastag(value).every((element) => HASTAG_REGEX.test(element));

const isAmountHastag = (value) => extarctHastag(value).length <= MAX_COUNT_HASHTAG;

const isUniqueHastag = (value) => {
  const oneCaseHastags = extarctHastag(value).map((element) => element.toLowerCase());
  return new Set(oneCaseHastags).size === oneCaseHastags.length;
};

function initValidate () {
  pristine.addValidator(hashtagField, isAmountHastag, `Нельзя вводить более ${MAX_COUNT_HASHTAG} хештегов :-(`);
  pristine.addValidator(hashtagField, isValidHastag, 'Хештег невалиден :-(');
  pristine.addValidator(hashtagField, isUniqueHastag, 'Хештеги не должны повторяться :-(');
}

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

const scaleImage = (value) => {
  imageElement.style.transform=`scale(${value/100})`;
  sizeField.value = `${value}%`;
};

function onMinusSizeButtonCLick (evt) {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) > MINIMUM_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize - ZOOM_STEP;
    scaleImage(newSize);
  }
}

function onPlusSizeButtonClick (evt)  {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) < MAXIMUM_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize + ZOOM_STEP;
    scaleImage(newSize);
  }
}

function resetScale () {
  scaleImage(MAXIMUM_SCALE);
}

function resetEffect () {
  imageElement.style.filter = 'none';
  sliderContainer.classList.add('hidden');
}

function showSlider () {
  sliderContainer.classList.remove('hidden');
}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
});

const updateSlider = (minValue, maxValue, step, style, unit) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    step: step,
    start: maxValue,
  });
  sliderElement.noUiSlider.on('update', () => {
    effectValueField.value = sliderElement.noUiSlider.get();
    imageElement.style.filter = `${style}(${effectValueField.value}${unit})`;
  });
};

function onEffectNoneButtonChange (evt) {
  evt.preventDefault();
  resetEffect();
}

function onEffectChromeButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectChrome.MIN, effectChrome.MAX,
    effectChrome.STEP, effectChrome.STYLE, effectChrome.UNIT);
}

function onEffectSepiaButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectSepia.MIN, effectSepia.MAX,
    effectSepia.STEP, effectSepia.STYLE, effectSepia.UNIT);
}

function onEffectMarvinButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectMarvin.MIN, effectMarvin.MAX,
    effectMarvin.STEP, effectMarvin.STYLE, effectMarvin.UNIT);
}

function onEffectPhobosButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectPhobos.MIN, effectPhobos.MAX,
    effectPhobos.STEP, effectPhobos.STYLE, effectPhobos.UNIT);
}

function onEffectHeatButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(effectHeat.MIN, effectHeat.MAX,
    effectHeat.STEP, effectHeat.STYLE, effectHeat.UNIT);
}

export { openEditPopup };
