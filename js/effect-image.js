const Effect = {
  CHROME: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  SEPIA: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  MARVIN: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  PHOBOS: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  HEAT: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const documentBodyElement = document.querySelector('body');
const imageElement = documentBodyElement.querySelector('.my-image-js');
const sliderContainerElement = documentBodyElement.querySelector('.img-upload__effect-level');
const sliderElement = documentBodyElement.querySelector('.effect-level__slider');
const effectValueFieldElement = documentBodyElement.querySelector('.effect-level__value');
const effectNoneButtonElement = documentBodyElement.querySelector('#effect-none');
const effectChromeButtonElement = documentBodyElement.querySelector('#effect-chrome');
const effectSepiaButtonElement = documentBodyElement.querySelector('#effect-sepia');
const effectMarvinButtonElement = documentBodyElement.querySelector('#effect-marvin');
const effectPhobosButtonElement = documentBodyElement.querySelector('#effect-phobos');
const effectHeatButtonElement = documentBodyElement.querySelector('#effect-heat');

const resetEffectImage = () => {
  imageElement.style.filter = 'none';
  sliderContainerElement.classList.add('hidden');
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
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

const updateSlider = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    step: effect.step,
    start: effect.max,
  });
  sliderElement.noUiSlider.on('update', () => {
    effectValueFieldElement.value = +sliderElement.noUiSlider.get();
    imageElement.style.filter = `${effect.style}(${effectValueFieldElement.value}${effect.unit})`;
  });
};

const onEffectNoneButtonElementChange = (evt) => {
  evt.preventDefault();
  resetEffectImage();
};

const onEffectChromeButtonElementChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.CHROME);
};

const onEffectSepiaButtonElementChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.SEPIA);
};

const onEffectMarvinButtonElementChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.MARVIN);
};

const onEffectPhobosButtonElementChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.PHOBOS);
};

const onEffectHeatButtonElementChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.HEAT);
};

const setupEffectImage = () => {
  effectNoneButtonElement.addEventListener('change', onEffectNoneButtonElementChange);
  effectChromeButtonElement.addEventListener('change', onEffectChromeButtonElementChange);
  effectSepiaButtonElement.addEventListener('change', onEffectSepiaButtonElementChange);
  effectMarvinButtonElement.addEventListener('change', onEffectMarvinButtonElementChange);
  effectPhobosButtonElement.addEventListener('change', onEffectPhobosButtonElementChange);
  effectHeatButtonElement.addEventListener('change', onEffectHeatButtonElementChange);
};

const removeEffectImage = () => {
  effectNoneButtonElement.removeEventListener('change', onEffectNoneButtonElementChange);
  effectChromeButtonElement.removeEventListener('change', onEffectChromeButtonElementChange);
  effectSepiaButtonElement.removeEventListener('change', onEffectSepiaButtonElementChange);
  effectMarvinButtonElement.removeEventListener('change', onEffectMarvinButtonElementChange);
  effectPhobosButtonElement.removeEventListener('change', onEffectPhobosButtonElementChange);
  effectHeatButtonElement.removeEventListener('change', onEffectHeatButtonElementChange);
};

export { resetEffectImage, setupEffectImage, removeEffectImage };
