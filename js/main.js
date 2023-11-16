import { getPhotos } from './data.js';
import { renderThumbnails } from './thumbnail.js';

const photos = getPhotos();
renderThumbnails(photos);

export { photos };
