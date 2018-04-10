(function () {
    'use strict';

    // Foreground Detection: https://whatwebcando.today/foreground-detection.html

    var permissionNotification = false;
    var timeout = null;

    if ('Notification' in window) {
        permissionNotification = Notification.permission;

        if (permissionNotification) {
            Notification.requestPermission(function (permission) {
                permissionNotification = permission;
            });
        }
    }

    document.addEventListener('visibilitychange', function (event) {
        if (document.visibilityState === 'hidden') {
            onHiddenVisibility();
        } else {
            clearTimeout(timeout);
        }
    });

    function onHiddenVisibility() {
        if (permissionNotification) {
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
        }
    };
})();