import { showBigPicture } from './big-picture.js';
import { renderThumbnails } from './thumbnails.js';

const container = document.querySelector('.pictures');
const renderGallery = (picutres) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if(!thumbnail) {

      return;
    }
    evt.preventDefault();
    const [picture] = picutres.filter((item) => item.id === +thumbnail.dataset.thumbnailId);
    showBigPicture(picture);
  });

  renderThumbnails(picutres);
};

export { renderGallery };
