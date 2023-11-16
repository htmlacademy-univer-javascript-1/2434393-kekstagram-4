const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const setAttributesId = (selector) => {
  const element = document.querySelectorAll(selector);
  for (let i = 0; i < element.length; i++) {
    element[i].dataset.id = i + 1;
  }
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const descriptionId = createIdGenerator();
const photoId = createIdGenerator();
const commentId = createIdGenerator();

export { getRandomNumber, descriptionId, photoId, commentId, isEscapeKey, setAttributesId};
