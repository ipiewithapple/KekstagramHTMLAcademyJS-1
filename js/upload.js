'use strict';

(function () {

    var uploadFiles = document.querySelector('#upload-file');
    var uploadCancel = document.querySelector('#upload-cancel');
    var levelPin = document.querySelector('.effect-level__pin');
    var levelDepth = document.querySelector('.effect-level__depth');

    // Сброс эффекта фото

    function resetFilterValue() {
        uploadPreview.className = 'img-upload__preview';
        levelPin.style.left = '0%';
        levelDepth.style.width = '0%';
    }

    // Открытие окна загрузки фото

    function onUploadFileClick() {
        document.querySelector('.img-upload__overlay').classList.remove('hidden');
        resetFilterValue();
    }
    uploadFiles.addEventListener('change', onUploadFileClick);

    // Закрытие окна загрузки фото

    function onUploadCancelClick() {
        document.querySelector('.img-upload__overlay').classList.add('hidden');
    }
    uploadCancel.addEventListener('click', onUploadCancelClick);


    // Эффекты для загружаемых фотографий

    var uploadPreview = document.querySelector('.img-upload__preview');
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

    noneEffect.addEventListener('click', onNoneFilterClick);

    function onChromeFilterClick() {
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--chrome');
        levelPin.style.left = '100%';
        levelDepth.style.width = '100%';
    }

    chromeEffect.addEventListener('click', onChromeFilterClick);

    function onSepiaFilterClick() {
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--sepia');
        levelPin.style.left = '100%';
        levelDepth.style.width = '100%';
    }

    sepiaEffect.addEventListener('click', onSepiaFilterClick);

    function onMarvinFilterClick() {
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--marvin');
        levelPin.style.left = '100%';
        levelDepth.style.width = '100%';
    }

    marvinEffect.addEventListener('click', onMarvinFilterClick);

    function onPhobosFilterClick() {
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--phobos');
        levelPin.style.left = '100%';
        levelDepth.style.width = '100%';
    }

    phobosEffect.addEventListener('click', onPhobosFilterClick);

    function onHeatFilterClick() {
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--heat');
        levelPin.style.left = '100%';
        levelDepth.style.width = '100%';
    }

    heatEffect.addEventListener('click', onHeatFilterClick);

    // Движение ползунка эффектов

    levelPin.addEventListener('mousedown', function (evt) {
        var startCoords = {
            x: evt.clientX
        };

        function onMouseMove(moveEvt) {
            var move = {
                x: startCoords.x - moveEvt.clientX
            };
            levelPin.style.left = -move.x + 'px';
            levelDepth.style.width = -move.x + 'px';
        };

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    });
})();