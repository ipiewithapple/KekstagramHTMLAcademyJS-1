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
var bigPicture = document.querySelector('.big-picture');
var uploadFiles = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var levelPin = document.querySelector('.effect-level__pin');
var levelDepth = document.querySelector('.effect-level__depth');
var uploadPreview = document.querySelector('.img-upload__preview');




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
createPhotoElements();

function getBigPhoto(nu) {
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
setNewComment(11);
getBigPhoto(11);

function onUploadFileClick() {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  resetFilterValue();
}
uploadFiles.addEventListener('change', onUploadFileClick);

function onUploadCancelClick() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
}
uploadCancel.addEventListener('click', onUploadCancelClick);

function resetFilterValue() {
  levelPin.style.left = '0%';
  levelDepth.style.width = '0%';
}
// Эффекты фото
var noneEffect = document.querySelector('.effects__preview--none');
var chromeEffect = document.querySelector('.effects__preview--chrome');
var sepiaEffect = document.querySelector('.effects__preview--sepia');
var marvinEffect = document.querySelector('.effects__preview--marvin');
var phobosEffect = document.querySelector('.effects__preview--phobos');
var heatEffect = document.querySelector('.effects__preview--heat');

function onNoneFilterClick() {
  uploadPreview.className = 'img-upload__preview';
  levelPin.style.left = '0%';
  levelDepth.style.width = '0%';
}

function onChromeFilterClick() {
  uploadPreview.className = 'img-upload__preview';
  uploadPreview.classList.add('effects__preview--chrome');
  levelPin.style.left = '100%';
  levelDepth.style.width = '100%';
}

function onSepiaFilterClick() {
  uploadPreview.className = 'img-upload__preview';
  uploadPreview.classList.add('effects__preview--sepia');
  levelPin.style.left = '100%';
  levelDepth.style.width = '100%';
}

function onMarvinFilterClick() {
  uploadPreview.className = 'img-upload__preview';
  uploadPreview.classList.add('effects__preview--marvin');
  levelPin.style.left = '100%';
  levelDepth.style.width = '100%';
}

function onPhobosFilterClick() {
  uploadPreview.className = 'img-upload__preview';
  uploadPreview.classList.add('effects__preview--phobos');
  levelPin.style.left = '100%';
  levelDepth.style.width = '100%';
}

function onHeatFilterClick() {
  uploadPreview.className = 'img-upload__preview';
  uploadPreview.classList.add('effects__preview--heat');
  levelPin.style.left = '100%';
  levelDepth.style.width = '100%';
}

chromeEffect.addEventListener('click', onChromeFilterClick);
sepiaEffect.addEventListener('click', onSepiaFilterClick);
marvinEffect.addEventListener('click', onMarvinFilterClick);
phobosEffect.addEventListener('click', onPhobosFilterClick);
heatEffect.addEventListener('click', onHeatFilterClick);
noneEffect.addEventListener('click', onNoneFilterClick);

// Открытие большого изображение по клику на миниатюре
var miniPhotos = document.querySelectorAll('.picture');

for (i = 0; i < miniPhotos.length; i++) {
  miniPhotos[i].addEventListener('click', function () {
    bigPicture.classList.remove('hidden');
  })
}

//Закрытие большого изображения

var closeBigPhoto = document.querySelector('#picture-cancel');

closeBigPhoto.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

// Проверка хэш-тегов на валидность
var hashtags = document.querySelector('.text__hashtags');
hashtags.addEventListener('input', function () {
  var arrHashtags = hashtags.value.split(' ');
  for (i = 0; i < arrHashtags.length; i++) {
    if (arrHashtags[i].length > 20) {
      hashtags.setCustomValidity("Длинна одного хэш-тега не должна превышать 20 символов");
      break;
    } else {
      hashtags.setCustomValidity('');
    }
  }
  console.log(arrHashtags);
  return arrHashtags;
})



// -------------------------------------------------------


document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comments-loader').classList.add('visually-hidden');