'use strict';

(function () {

    var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
    var pictureBlock = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var commentTemplate = document.querySelector('#comments').content.querySelector('li');
    var commentBlock = document.querySelector('.social__comments');
    var bigPicture = document.querySelector('.big-picture');

    ;

    function createPhotoElements(photos, len) {

        while (pictureBlock.querySelector('.picture')) {
            pictureBlock.removeChild(pictureBlock.querySelector('.picture'));
        }

        for (var i = 0; i < len; i++) {
            var newPhoto = pictureTemplate.cloneNode(true);
            newPhoto.querySelector('img').src = photos[i].url;
            newPhoto.querySelector('.picture__comments').textContent = photos[i].comments.length;
            newPhoto.querySelector('.picture__likes').textContent = photos[i].likes;
            fragment.appendChild(newPhoto);
        }
        pictureBlock.appendChild(fragment);
        openBigPhoto(photos, len);
    };

    function openBigPhoto(photos, len) {
        var miniPicture = document.querySelectorAll('.picture');

        for (var i = 0; i < len; i++) {
            miniPicture[i].dataset.id = i;
            miniPicture[i].addEventListener('click', function (evt) {
                bigPicture.classList.remove('hidden');
                getBigPhoto(photos, evt.currentTarget.dataset.id);
            });
        };
    }

    // Большое изображение

    function getBigPhoto(photos, i) {
        bigPicture.querySelector('.big-picture__img img').src = photos[i].url;
        bigPicture.querySelector('.likes-count').textContent = photos[i].likes;
        bigPicture.querySelector('.comments-count').textContent = photos[i].comments.length;
        bigPicture.querySelector('.social__caption').textContent = photos[i].description;

        for (var e = 0; e < photos[i].comments.length; e++) {
            var newComment = commentTemplate.cloneNode(true);
            newComment.querySelector('img').src = photos[i].comments[e].avatar;
            newComment.querySelector('.social__text').textContent = photos[i].comments[e].message;
            fragment.appendChild(newComment);
        }
        commentBlock.appendChild(fragment);
    };

    // Закрытие большого изображения
    var bigPhotoCancel = document.querySelector('#picture-cancel');

    bigPhotoCancel.addEventListener('click', function () {
        bigPicture.classList.add('hidden');
        while (commentBlock.firstChild) {
            commentBlock.removeChild(commentBlock.firstChild);
        }
    });

    // Получение данных с сервера
    var photos = [];

    function onLoad(data) {
        photos = data.slice();
        createPhotoElements(photos, photos.length);
    };

    window.backend.load(onLoad, window.errors.rendErrMess);

    // Сортировка изображений 

    document.querySelector("#filter-discussed").addEventListener('click', function () {

        actionFilterBth();
        this.classList.add('img-filters__button--active');

        photos.sort(function (a, b) {
            return b.comments.length - a.comments.length;
        });

        createPhotoElements(photos, photos.length);
    });

    document.querySelector("#filter-popular").addEventListener('click', function () {

        actionFilterBth();
        this.classList.add('img-filters__button--active');

        window.backend.load(onLoad, window.errors.rendErrMess);

    });

    document.querySelector("#filter-new").addEventListener('click', function () {

        actionFilterBth();
        this.classList.add('img-filters__button--active');

        function getRandPhotos(photos) {
            var temp, j;
            for (var i = photos.length - 1; i > -1; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = photos[j];
                photos[j] = photos[i];
                photos[i] = temp;
            };
            return photos;
        };
        getRandPhotos(photos);

        createPhotoElements(photos, 10);
    });

    function actionFilterBth() {

        var filterBtn = document.querySelectorAll('.img-filters__button');

        filterBtn.forEach(element => {
            element.classList.remove('img-filters__button--active');
            return filterBtn;
        });
    };


}());