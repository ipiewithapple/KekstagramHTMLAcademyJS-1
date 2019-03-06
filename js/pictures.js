'use strict';

(function () {

    var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
    var pictureBlock = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var commentTemplate = document.querySelector('#comments').content.querySelector('li');
    var commentBlock = document.querySelector('.social__comments');
    var bigPicture = document.querySelector('.big-picture');

    function createPhotoElements(photos) {

        for (var i = 0; i < photos.length; i++) {
            var newPhoto = pictureTemplate.cloneNode(true);
            newPhoto.querySelector('img').src = photos[i].url;
            newPhoto.querySelector('.picture__comments').textContent = photos[i].comments.length;
            newPhoto.querySelector('.picture__likes').textContent = photos[i].likes;
            fragment.appendChild(newPhoto);
        }
        pictureBlock.appendChild(fragment);
        openBigPhoto(photos);
    };

    function openBigPhoto(photos) {
        var miniPicture = document.querySelectorAll('.picture');

        for (var i = 0; i < photos.length; i++) {
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
        while (commentBlock.firstChild){
            commentBlock.removeChild(commentBlock.firstChild);
        }
    });

    // Получение данных с сервера

    function onLoad(data) {
        createPhotoElements(data);
        // getBigPhoto(data);
    };

    window.backend.load(onLoad, window.errors.rendErrMess);

}());