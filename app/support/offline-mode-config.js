(function(){
    'use strict';

    var offlineMessage = 'Your internet fell down. But with SW you can continue navigating.';
    var onlineMessage = 'Your internet came back. You can reload the page and see the latest news.'
    var message = offlineMessage;

    window.addEventListener('offline', function(){
        message = offlineMessage;
        document.getElementById('modal-message').innerHTML = message;
        $('#internet-modal').modal();
    });

    window.addEventListener('online', function(){
        message = onlineMessage;
        document.getElementById('modal-message').innerHTML = message;
        $('#internet-modal').modal();
    });

})();

