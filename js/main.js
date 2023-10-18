const COUNT_PHOTOS = 25;
const Id = {
  MIN: 1,
  MAX_PHOTO: 25,
  MAX_COMMENT: 1000
};
const CommentsCount = {
  MIN: 0,
  MAX: 30
};
const LikesCount = {
  MIN: 0,
  MAX: 200
};
const AvatarId = {
  MIN: 1,
  MAX: 6
};
const MessagesCount = {
  MIN: 1,
  MAX: 2
};
const COMMENTATOR_NAMES = [
  'Иван',
  'Александр',
  'Сергей',
  'Екатерина',
  'Алексей',
  'Никита',
  'Виктор',
  'Виктория',
  'Светлана',
  'Галина'
];
const PHOTO_DESCRIPTIONS = [
  'Осенний сад',
  'Голубое небо',
  'Прекрасный закат',
  'Теплый денек',
  'Радуемся мелочам',
  'Красивый вид',
  'Неспешная красота',
  'Летнее утро',
  'Всем привет!',
  'Красота!'
];
const TEXT_FOR_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generatePhotoDescriptionId = createRandomIdFromRangeGenerator(Id.MIN,Id.MAX_PHOTO);
const generateImageId = createRandomIdFromRangeGenerator(Id.MIN,Id.MAX_PHOTO);
const generateCommentId = createRandomIdFromRangeGenerator(Id.MIN,Id.MAX_COMMENT);

const getTextForComment = () => {
  let string = '';
  for (let i=0; i<getRandomNumber(MessagesCount.MIN, MessagesCount.MAX); i++){
    string = string + TEXT_FOR_COMMENTS[getRandomNumber(0, TEXT_FOR_COMMENTS.length-1)];
  }

  return string;
};

const getComment = () => ({
  id: generateCommentId(Id.MIN,Id.MAX_COMMENT),
  avatar: `img/avatar-${getRandomNumber(AvatarId.MIN,AvatarId.MAX)}.svg`,
  message: getTextForComment(),
  name: COMMENTATOR_NAMES[getRandomNumber(0,COMMENTATOR_NAMES.length-1)]

});

const getPhotoDescription = () => ({
  id: generatePhotoDescriptionId(Id.MIN,Id.MAX_PHOTO),
  url: `photos/${generateImageId(Id.MIN,Id.MAX_PHOTO)}.jpg`,
  description: PHOTO_DESCRIPTIONS[getRandomNumber(0,PHOTO_DESCRIPTIONS.length-1)],
  likes: getRandomNumber(LikesCount.MIN, LikesCount.MAX),
  comments: Array.from({length: getRandomNumber(CommentsCount.MIN, CommentsCount.MAX)}, getComment)

});

const getPhotos = () => Array.from({length:COUNT_PHOTOS}, getPhotoDescription);

getPhotos();

