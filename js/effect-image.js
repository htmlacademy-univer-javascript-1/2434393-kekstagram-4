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
const imageElement = documentBody.querySelector('.my-image-js');
const sliderContainer = documentBody.querySelector('.img-upload__effect-level');
const sliderElement = documentBody.querySelector('.effect-level__slider');
const effectValueField = documentBody.querySelector('.effect-level__value');

const resetEffect = () => {
  imageElement.style.filter = 'none';
  sliderContainer.classList.add('hidden');
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

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

const onEffectNoneButtonChange = (evt) => {
  evt.preventDefault();
  resetEffect();
};

const onEffectChromeButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(effectChrome.MIN, effectChrome.MAX,
    effectChrome.STEP, effectChrome.STYLE, effectChrome.UNIT);
};

const onEffectSepiaButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(effectSepia.MIN, effectSepia.MAX,
    effectSepia.STEP, effectSepia.STYLE, effectSepia.UNIT);
};

const onEffectMarvinButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(effectMarvin.MIN, effectMarvin.MAX,
    effectMarvin.STEP, effectMarvin.STYLE, effectMarvin.UNIT);
};

const onEffectPhobosButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(effectPhobos.MIN, effectPhobos.MAX,
    effectPhobos.STEP, effectPhobos.STYLE, effectPhobos.UNIT);
};

const onEffectHeatButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(effectHeat.MIN, effectHeat.MAX,
    effectHeat.STEP, effectHeat.STYLE, effectHeat.UNIT);
};

export { resetEffect, onEffectNoneButtonChange, onEffectChromeButtonChange, onEffectSepiaButtonChange,
  onEffectMarvinButtonChange, onEffectPhobosButtonChange, onEffectHeatButtonChange };
