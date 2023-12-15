const ZOOM_STEP = 25;
const MAXIMUM_SCALE = 100;
const MINIMUM_SCALE = 25;

const documentBody = document.querySelector('body');
const sizeField = documentBody.querySelector('.scale__control--value');
const imageElement = documentBody.querySelector('.my-image-js');

const scaleImage = (value) => {
  imageElement.style.transform=`scale(${value/100})`;
  sizeField.value = `${value}%`;
};

const onMinusSizeButtonCLick = (evt) => {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) > MINIMUM_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize - ZOOM_STEP;
    scaleImage(newSize);
  }
};

const onPlusSizeButtonClick = (evt) => {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) < MAXIMUM_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize + ZOOM_STEP;
    scaleImage(newSize);
  }
};

const resetScale = () => {
  scaleImage(MAXIMUM_SCALE);
};

export { onMinusSizeButtonCLick, onPlusSizeButtonClick, resetScale };
