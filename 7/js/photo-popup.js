const commentsList = document.querySelector('.social__comments');
const socialComment = commentsList.querySelector('.social__comment');

const createComments = (commentsPicture) => {
  const fragmentComments = document.createDocumentFragment();
  commentsPicture.forEach(({ avatar, name, message })=>{
    const comment = socialComment.cloneNode(true);
    comment.querySelector('.social__picture').src=avatar;
    comment.querySelector('.social__picture').alt=name;
    comment.querySelector('.social__text').textContent=message;
    fragmentComments.appendChild(comment);
  });
  commentsList.appendChild(fragmentComments);
};

const createPopup = ({ url, likes, comments, description }) => {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  commentsList.innerHTML = '';
  document.querySelector('.big-picture__img').querySelector('img').src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  document.querySelector('.social__caption').textContent = description;
  createComments(comments);
};

export { createPopup };
