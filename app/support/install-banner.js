(function(){
    'use strict';

    var eventInstall;
    var btnInstall = $("#btn-install");

    window.addEventListener('beforeinstallprompt', function(event){
        eventInstall = event;

        // Do not execute the prompt yet.
        event.preventDefault();

        // Show the install button to show the prompt to the user.
        btnInstall.show();
    });

    btnInstall.click(function(){
        if(eventInstall){
            eventInstall.prompt();

            eventInstall.userChoice.then(function(choiceResult){
                if(choiceResult.outcome == "dismissed"){
                    // TODO if cancel
                }else{
                    // TODO if accepts
                }
            });

            eventInstall = null;
            btnInstall.hide();
        }
    });
})();