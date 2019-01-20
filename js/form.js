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
        document.querySelector('.effect-level').classList.add('hidden');
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
    var effect, filterParam, filterParam2, filterName;


    function onNoneFilterClick() {
        document.querySelector('.effect-level').classList.add('hidden');
        uploadPreview.className = 'img-upload__preview';
    }

    noneEffect.addEventListener('click', onNoneFilterClick);

    function onChromeFilterClick() {
        effect = 'chrome';
        filterName = 'grayscale';
        filterParam = 450;
        filterParam2 = null;
        uploadPreview.style.filter = 'grayscale(0)';
        document.querySelector('.effect-level').classList.remove('hidden');
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--chrome');
        levelPin.style.left = '0%';
        levelDepth.style.width = '0%';
    }

    chromeEffect.addEventListener('click', onChromeFilterClick);

    function onSepiaFilterClick() {
        effect = 'sepia';
        filterName = 'sepia';
        filterParam = 450;
        filterParam2 = null;
        uploadPreview.style.filter = 'sepia(0)';
        document.querySelector('.effect-level').classList.remove('hidden');
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--sepia');
        levelPin.style.left = '0%';
        levelDepth.style.width = '0%';
    }

    sepiaEffect.addEventListener('click', onSepiaFilterClick);

    function onMarvinFilterClick() {
        effect = 'marvin';
        filterName = 'invert';
        filterParam = 4.5;
        filterParam2 = "%";
        uploadPreview.style.filter = 'invert(0%)';
        document.querySelector('.effect-level').classList.remove('hidden');
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--marvin');
        levelPin.style.left = '0%';
        levelDepth.style.width = '0%';
    }

    marvinEffect.addEventListener('click', onMarvinFilterClick);

    function onPhobosFilterClick() {
        effect = 'phobos';
        filterName = 'blur';
        filterParam = 90;
        filterParam2 = "px";
        uploadPreview.style.filter = 'blur(0px)';
        document.querySelector('.effect-level').classList.remove('hidden');
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--phobos');
        levelPin.style.left = '0%';
        levelDepth.style.width = '0%';
    }

    phobosEffect.addEventListener('click', onPhobosFilterClick);

    function onHeatFilterClick() {
        effect = 'heat';
        filterName = 'brightness';
        filterParam = 225;
        filterParam2 = 1;
        uploadPreview.style.filter = 'brightness(1)';
        document.querySelector('.effect-level').classList.remove('hidden');
        uploadPreview.className = 'img-upload__preview';
        uploadPreview.classList.add('effects__preview--heat');
        levelPin.style.left = '0%';
        levelDepth.style.width = '0%';
    }

    heatEffect.addEventListener('click', onHeatFilterClick);

    // Движение ползунка эффектов

    levelPin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        var startCoordX = evt.clientX;

        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();
            var moveX = startCoordX - moveEvt.clientX;

            levelPin.style.left = (levelPin.offsetLeft - moveX) + 'px';
            levelDepth.style.width = (levelDepth.offsetWidth - moveX) + 'px';
            startCoordX = moveEvt.clientX;
            document.querySelector('.effects__preview--' + effect).style.filter = filterName + '(' + (levelPin.offsetLeft / filterParam + filterParam2) + ')';

            if (levelPin.offsetLeft >= 450) {
                levelPin.style.left = 449 + 'px';
                levelDepth.style.width = 449 + 'px';
                onMouseUp();
            } else if (levelPin.offsetLeft <= 0) {
                levelPin.style.left = 1 + 'px';
                levelDepth.style.width = 1 + 'px';
                onMouseUp();
            };
        };

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    });

    // Проверка хэш-тегов на валидность
    var hashtags = document.querySelector('.text__hashtags');

    hashtags.addEventListener('input', function () {
        var arrHashtags = hashtags.value.split(' ');
        for (var i = 0; i < arrHashtags.length; i++) {
            if (arrHashtags[i].length > 20) {
                hashtags.setCustomValidity("Длинна одного хэш-тега не должна превышать 20 символов");
                break;
            } else if(arrHashtags.length > 5){
                hashtags.setCustomValidity("Количество хэш-тегов не должно превышать 5");
                break;
            }else if(arrHashtags[i].charAt(0) !== '#'){
                hashtags.setCustomValidity("Хэш-тег должен начинаться с '#'");
                break;
            } else {
                hashtags.setCustomValidity('');
            }
        }
        return arrHashtags;
    });

})();