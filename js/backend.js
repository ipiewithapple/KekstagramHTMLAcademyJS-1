'use strict';

// Запросы на сервер

(function () {

    var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
    var URL_SAVE = 'https://js.dump.academy/kekstagram';

    function serverRequest(url, method, onLoad, onError, data) {

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.timeout = 3000;

        xhr.addEventListener('load', function () {
            xhr.status == 200 ? onLoad(xhr.response) : onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            
        });

        xhr.addEventListener('error', function () {
            onError('Ошибка соединения');
        });

        xhr.addEventListener('timeout', function () {
            onError('Истекло время соединения');
        });

        xhr.open(method, url);
        xhr.send(data);
    };

    window.backend = {
        save: function (onLoad, onError, data) {
            var url = URL_SAVE;
            var method = 'POST'

            serverRequest(url, method, onLoad, onError, data);
        },
        load: function (onLoad, onError) {
            var url = URL_LOAD;
            var method = 'GET'

            serverRequest(url, method, onLoad, onError);
        },
    };

}());