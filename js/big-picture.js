import { isEscapeKey } from './utils.js';

const PORTION_COMMENTS_SHOWN = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentListElement = commentsList.querySelector('.social__comment');
const bodyElement = document.querySelector('body');
const cancelButtonElement = document.querySelector('.big-picture__cancel');
const totalCommentsElement = document.querySelector('.comments-count');
const commentsShownElement = document.querySelector('.comments-shown');
const commentsLoaderElement = document.querySelector('.comments-loader');

const createComment = ( {avatar, name, message} ) => {
  const comment = commentListElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

let commentsShown = 0;
let comments = null;

const renderComments = () => {
  commentsList.innerHTML='';

  commentsShown += PORTION_COMMENTS_SHOWN;
  if(commentsShown >= comments.length){
    commentsShown = comments.length;
    commentsLoaderElement.classList.add('hidden');
  }
  else {
    commentsLoaderElement.classList.remove('hidden');
  }
  for(let i=0; i<commentsShown; i++){
    const comment = createComment(comments[i]);
    commentsList.appendChild(comment);
  }
  commentsShownElement.textContent = commentsShown;
  totalCommentsElement.textContent = comments.length;
};

const onCommentsLoaderElementClick = () => {
  renderComments();
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderElementClick);
  commentsShown = 0;
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancelButtonClick () {
  hideBigPicture();
}

const renderPictureDetails = ( { url, likes, description} ) => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPictureElement.querySelector('.big-picture__img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);

  renderPictureDetails(data);
  comments = data.comments.slice();
  renderComments(comments);
};

export { showBigPicture };
