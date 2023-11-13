const container = document.querySelector('.pictures');
const templateThumbnail = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ( { url, description, likes, comments } ) => {
  const thumbnail = templateThumbnail.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (userPhotos) => {
  const fragment = document.createDocumentFragment();
  userPhotos.forEach((userPhoto) => {
    const thumbnail =  createThumbnail(userPhoto);
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};

export { renderThumbnails };
