import { renderGallery } from './gallery.js';
import { openEditPopup, setFormSubmit, hideForm } from './edit-popup.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { initFiltration } from './filtration-image.js';
import { debounce } from './utils.js';

getData()
  .then((thumbnails) => {
    const debounceRenderGallery = debounce(renderGallery);
    debounceRenderGallery(thumbnails);
    initFiltration(thumbnails, debounceRenderGallery);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setFormSubmit(hideForm);

openEditPopup();
