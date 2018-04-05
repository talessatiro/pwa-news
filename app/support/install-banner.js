(function(){
    'use strict';

    var eventInstall;
    var btnInstall = $("#btn-install");

    window.addEventListener('beforeinstallprompt', function(event){
        console.log('opa');
        eventInstall = event;
        event.preventDefault();
        btnInstall.show();
    });

    btnInstall.click(function(){
        if(eventInstall){
            eventInstall.prompt();

            eventInstall.userChoice.then(function(choiceResult){
                if(choiceResult.outcome == "dismissed"){
                    alert("Que pena!");
                }else{
                    alert("Que feliz!");
                }
            });

            eventInstall = null;
            btnInstall.hide();

        }
    });
})();