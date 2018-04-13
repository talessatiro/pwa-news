(function(){
    'use strict';

    var offlineMessage = 'Your internet fell down. But with SW you can continue navigating.';
    var onlineMessage = 'Your internet came back. You can reload the page and see the latest news.'
    var message = offlineMessage;

    var modalTemplate = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
                        '<button type="button" class="close" data-dismiss="modal">&times;</button></div>' + 
                        '<div class="modal-body"><p id="modal-message"></p></div>' +
                        '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div>';

    window.addEventListener('offline', function(){
        message = offlineMessage;
        document.getElementById('internet-modal').innerHTML = modalTemplate;
        document.getElementById('modal-message').innerHTML = message;
        $('#internet-modal').modal();
    });

    window.addEventListener('online', function(){
        message = onlineMessage;
        document.getElementById('modal-message').innerHTML = message;
        $('#internet-modal').modal();
    });

})();

