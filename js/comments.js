'use strict';

(function () {

    // Проверка хэш-тегов на валидность
    var hashtags = document.querySelector('.text__hashtags');

    hashtags.addEventListener('input', function () {
        var arrHashtags = hashtags.value.split(' ');
        for (var i = 0; i < arrHashtags.length; i++) {
            if (arrHashtags[i].length > 20) {
                hashtags.setCustomValidity("Длинна одного хэш-тега не должна превышать 20 символов");
                break;
            } else {
                hashtags.setCustomValidity('');
            }
        }
        return arrHashtags;
    });

})();