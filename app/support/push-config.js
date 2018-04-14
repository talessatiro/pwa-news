function PushNotificationConfig() {

    var publicKey = 'BIBwnau5twp4754x6NeLkEfMNXB8J9d7a710uur2pPTzsO_HamNDjOJlt7DleDYWI2PFIfbvcqOCi7Cm76DyCio';

    this.registerUser = function (serviceWorker) {
        if(serviceWorker.active) {
            serviceWorker.pushManager.subscribe({
                'userVisibleOnly': true,
                'applicationServerKey': urlB64ToUint8Array(publicKey)
            }).then(function (subscription) {
                console.log(JSON.stringify(subscription));
            });
        }
    };

    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };
};