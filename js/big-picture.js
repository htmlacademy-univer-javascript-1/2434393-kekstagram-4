import { isEscapeKey } from './utils.js';

const PORTION_COMMENTS_SHOWN = 5;

const documentBodyElement = document.querySelector('body');
const bigPictureElement = documentBodyElement.querySelector('.big-picture');
const commentsListElement = documentBodyElement.querySelector('.social__comments');
const commentListElement = documentBodyElement.querySelector('.social__comment');
const cancelButtonElement = documentBodyElement.querySelector('.big-picture__cancel');
const totalCommentsElement = documentBodyElement.querySelector('.comments-count');
const commentsShownElement = documentBodyElement.querySelector('.comments-shown');
const commentsLoaderElement = documentBodyElement.querySelector('.comments-loader');

let commentsShown = 0;
let comments = null;

const createComment = ({avatar, name, message}) => {
  const comment = commentListElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};


const renderComments = () => {
  commentsListElement.innerHTML = '';
  commentsShown += PORTION_COMMENTS_SHOWN;

  if (commentsShown >= comments.length) {
    commentsShown = comments.length;
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    commentsListElement.appendChild(comment);
  }
  commentsShownElement.textContent = commentsShown;
  totalCommentsElement.textContent = comments.length;
};

const onCommentsLoaderElementClick = () => {
  renderComments();
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  documentBodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonElementClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderElementClick);
  commentsShown = 0;
};

function onDocumentKeydown (evt) {

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancelButtonElementClick () {
  hideBigPicture();
}

const renderPictureDetails = ({url, likes, description}) => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPictureElement.querySelector('.big-picture__img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  documentBodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonElementClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);
  renderPictureDetails(data);
  comments = data.comments.slice();
  renderComments(comments);
};

export { showBigPicture };
