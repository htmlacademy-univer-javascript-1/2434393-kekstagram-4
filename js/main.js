import { openEditPopup, setFormSubmit, hideForm } from './edit-popup.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { initFilters } from './filtration-image.js';
import { renderGallery } from './gallery.js';
import { debounce } from './utils.js';

getData()
  .then((thumbnails) => {
    renderGallery(thumbnails);
    initFilters(thumbnails, debounce(renderGallery));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setFormSubmit(hideForm);

openEditPopup();
