import { renderGallery } from './gallery.js';
import { openEditPopup, setFormSubmit, hideForm } from './edit-popup.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

getData()
  .then((thumbnails) => {
    renderGallery(thumbnails);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setFormSubmit(hideForm);

openEditPopup();

