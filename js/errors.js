'use strict';

// Сообщения об ошибках при запросах

(function () {

    window.errors = {
        rendErrMess: function (errMess) {

            var errWindow = document.createElement('div');

            errWindow.style = ('z-index: 100; position: fixed; top: 20px; left: 0; right: 0; display: flex; justify-content: center; align-items: center; height: 50px; padding: 0 50px; font-size: 18px; background-color: rgba(0, 0, 0, 0.3);');
            errWindow.textContent = errMess;
            document.body.appendChild(errWindow);
            setTimeout(function(){
                document.body.removeChild(errWindow);
            }, 3000);
        }
    };


}());