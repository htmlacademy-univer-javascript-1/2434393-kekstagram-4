import { getPhotos } from './data.js';

const formPictures = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const userPhotos = getPhotos();
const similarUserPhotos = document.createDocumentFragment();

userPhotos.forEach((userPhoto) => {
  const userPhotoElement = templatePicture.cloneNode(true);
  const picture = userPhotoElement.querySelector('.picture__img');
  picture.src = userPhoto.url;
  picture.alt = userPhoto.description;
  userPhotoElement.querySelector('.picture__likes').textContent = userPhoto.likes;
  userPhotoElement.querySelector('.picture__comments').textContent = userPhoto.comments.length;
  similarUserPhotos.appendChild(userPhotoElement);
});

formPictures.appendChild(similarUserPhotos);
