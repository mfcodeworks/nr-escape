console.log('renderer.js');

if (navigator.userAgent.toLowerCase().indexOf(' electron/') > -1) {
    // Electron-specific code
    const environment = require('./environment.json');
    console.log(environment);
    const { ipcRenderer } = require('electron');
    const {
        START_NOTIFICATION_SERVICE,
        NOTIFICATION_SERVICE_STARTED,
        NOTIFICATION_SERVICE_ERROR,
        NOTIFICATION_RECEIVED,
        TOKEN_UPDATED
    } =  require('electron-push-receiver/src/constants');

    // Listen for service successfully started
    ipcRenderer.on(NOTIFICATION_SERVICE_STARTED, (_, token) => {
        console.log('service successfully started', token);
        // TODO: Send token to server
    });

    // Handle notification errors
    ipcRenderer.on(NOTIFICATION_SERVICE_ERROR, (_, error) => {
        console.log('notification error', error);
    });

    // Send FCM token to backend
    ipcRenderer.on(TOKEN_UPDATED, (_, token) => {
        console.log('token updated', token);
        // TODO: Send token to server
    });

    // Display notification
    ipcRenderer.on(NOTIFICATION_RECEIVED, (_, serverNotificationPayload) => {
        // check to see if payload contains a body string, if it doesn't consider it a silent push
        if (serverNotificationPayload.notification.body){
            // payload has a body, so show it to the user
            console.log('display notification', serverNotificationPayload)
            let myNotification = new Notification(serverNotificationPayload.notification.title, {
                body: serverNotificationPayload.notification.body
            });

            myNotification.onclick = () => {
                console.log('Notification clicked');
            }
        } else {
            // payload has no body, so consider it silent (and just consider the data portion)
            console.log('do something with the key/value pairs in the data', serverNotificationPayload.data);
        }
    });

    // Start service
    console.log('starting service and registering a client');
    ipcRenderer.send(START_NOTIFICATION_SERVICE, environment.fcm.key);
}
