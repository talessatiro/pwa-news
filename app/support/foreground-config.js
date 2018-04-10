(function () {
    'use strict';

    // Foreground Detection: https://whatwebcando.today/foreground-detection.html

    var permissionNotification = false;
    var timeout = null;

    var btAlert = $('#btn-permission');
    
    if ('Notification' in window) {
        permissionNotification = Notification.permission;

        if(permissionNotification === 'default'){
            btAlert.show();
        }

        btAlert.click(function(){
            Notification.requestPermission(function (permission) {
                permissionNotification = permission;
                if(permissionNotification === 'granted'){
                    btAlert.hide();
                }
            });
        });
    }

    document.addEventListener('visibilitychange', function (event) {
        if (document.visibilityState === 'hidden') {
            onHiddenVisibility();
        } else {
            clearTimeout(timeout);
        }
    });

    function onHiddenVisibility() {
        timeout = setTimeout(function () {
            navigator.serviceWorker
                .getRegistration()
                .then(function (registration) {
                    var options = {
                        'body': 'Lula foi pego no ...',
                        'icon': '/assets/img/android-chrome-192x192.png',
                        'badge': '/assets/img/android-chrome-192x192.png'
                    };
                    registration.showNotification('Ei tem novas noticias!!!', options);
                });
        }, 3000);
    };
})();