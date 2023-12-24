const ZOOM_STEP = 25;
const MAXIMUM_SCALE = 100;
const MINIMUM_SCALE = 25;

const documentBodyElement = document.querySelector('body');
const sizeFieldElement = documentBodyElement.querySelector('.scale__control--value');
const imageElement = documentBodyElement.querySelector('.my-image-js');
const minusSizeButtonElement = documentBodyElement.querySelector('.scale__control--smaller');
const plusSizeButtonElement = documentBodyElement.querySelector('.scale__control--bigger');

const scaleImage = (value) => {
  imageElement.style.transform=`scale(${value/100})`;
  sizeFieldElement.value = `${value}%`;
};

const onMinusSizeButtonElementCLick = (evt) => {
  evt.preventDefault();

  if (parseInt(sizeFieldElement.value, 10) > MINIMUM_SCALE) {
    const currentSize = parseInt(sizeFieldElement.value, 10);
    const newSize = currentSize - ZOOM_STEP;
    scaleImage(newSize);
  }
};

const onPlusSizeButtonElementClick = (evt) => {
  evt.preventDefault();

  if (parseInt(sizeFieldElement.value, 10) < MAXIMUM_SCALE) {
    const currentSize = parseInt(sizeFieldElement.value, 10);
    const newSize = currentSize + ZOOM_STEP;
    scaleImage(newSize);
  }
};

const resetScaleImage = () => {
  scaleImage(MAXIMUM_SCALE);
};

const setupScaleImage = () => {
  plusSizeButtonElement.addEventListener('click', onPlusSizeButtonElementClick);
  minusSizeButtonElement.addEventListener('click', onMinusSizeButtonElementCLick);
};

const removeScaleImage = () => {
  plusSizeButtonElement.removeEventListener('click', onPlusSizeButtonElementClick);
  minusSizeButtonElement.removeEventListener('click', onMinusSizeButtonElementCLick);
};

export { setupScaleImage, removeScaleImage, resetScaleImage };
