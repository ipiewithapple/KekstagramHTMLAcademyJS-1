var ALL_PHOTOS = 25;
var commentsArr = [];
var photos = [];
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]
var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
]
var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var pictureBlock = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var commentTemplate = document.querySelector('#comments').content.querySelector('li');
var commentBlock = document.querySelector('.social__comments');

function randInt(min, max) {
  var like = Math.round(Math.random() * (max - min)) + min;
  return like;
}

function genComeents() {
  if (randInt(1, 2) === 2) {
    commentsArr = [
      comments[randInt(0, comments.length - 1)],
      comments[randInt(0, comments.length - 1)]
    ]
  } else {
    commentsArr = [
      comments[randInt(0, comments.length - 1)]
    ]
  }
  return commentsArr;
}


function generatePhotos() {
  for (i = 1; i <= ALL_PHOTOS; i++) {
    photos[i - 1] = {
      url: 'photos/' + i + '.jpg',
      likes: randInt(15, 200),
      comments: genComeents(),
      description: description[randInt(0, description.length - 1)]
    }
  }
  return photos;
}
generatePhotos();

function createPhotoElements() {
  for (i = 0; i < photos.length; i++) {
    var newPhoto = pictureTemplate.cloneNode(true);
    newPhoto.querySelector('img').src = photos[i].url;
    newPhoto.querySelector('.picture__comments').textContent = photos[i].comments.length;
    newPhoto.querySelector('.picture__likes').textContent = photos[i].likes;
    fragment.appendChild(newPhoto);
  }
  pictureBlock.appendChild(fragment);
}

function getBigPhoto(nu) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photos[nu].url;
  bigPicture.querySelector('.likes-count').textContent = photos[nu].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[nu].comments.length;
  bigPicture.querySelector('.social__caption').textContent = photos[nu].description;
  commentBlock.appendChild(fragment);
}

function setNewComment(nu) {
  for (i = 0; i < photos[nu].comments.length; i++) {
    var newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('img').src = 'img/avatar-' + randInt(1, 6) + '.svg';
    newComment.querySelector('.social__text').textContent = photos[nu].comments[i];
    fragment.appendChild(newComment);
  }
}

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comments-loader').classList.add('visually-hidden');
createPhotoElements();
setNewComment(0);
getBigPhoto(0);
console.log(photos);
