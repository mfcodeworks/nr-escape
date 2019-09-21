import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { IpcService } from '../ipc/ipc.service';
import * as ipcChannels from 'electron-push-receiver/src/constants';

declare const cordova: any;
declare const device: any;
declare const PushNotification: any;


@Injectable({
    providedIn: 'root'
})
export class PushService {
    push: any;
    topics = ['test'];

    constructor(
        private firebase: FirebaseApp,
        private user: UserService,
        private fire: AngularFireMessaging,
        private ipc: IpcService
    ) {}

    init(): void {
        // Check device
        if (window.hasOwnProperty('cordova')) {
            // DEBUG: Log device
            console.log(device);

            switch (device.platform) {
                case 'Android':
                case 'iOS':
                    this.mobileInit();
                    return;

                case 'Electron':
                    this.electronInit();
                    return;

                case 'browser':
                    this.browserInit();
                    return;

                default:
                    console.log('Device has no push implementation');
                    return;
            }
        }
        this.browserInit();
    }

    // Init for Android/iOS
    mobileInit(): void {
        this.push = PushNotification.init({
            android: {
                icon: 'assets/images/logo',
                iconColor: 'black',
                topics: this.topics,
                forceShow: 'true',
            },
            ios: {
                alert: 'true',
                badge: 'true',
                sound: 'true',
                topics: this.topics,
                fcmSandbox: 'true',
            },
        });

        // Register push
        this.push.on('Registration:', (data: any) => {
            console.log(data.registrationId);
            console.log(data.registrationType);
        });

        // Subscribe to notifications
        this.push.on('Notification:', (data: any) => {
            console.log(data);
        });

        // Subscribe to errors
        this.push.on('Error:', (error: any) => {
            console.log(error);
        });
    }

    // Register push for electron
    electronInit(): void {
        // Handle push registration
        this.ipc.on(ipcChannels.NOTIFICATION_SERVICE_STARTED, (_, token) => {
            console.log('service successfully started', token);
            // TODO: Send token to server
        });

        // Handle push errors
        this.ipc.on(ipcChannels.NOTIFICATION_SERVICE_ERROR, (_, error) => {
            console.warn('notification error', error);
        });

        // Send token to backend when updated
        this.ipc.on(ipcChannels.TOKEN_UPDATED, (_, token) => {
            console.log('token updated', token);
            // TODO: Send token to server
        });

        // Display notification
        this.ipc.on(ipcChannels.NOTIFICATION_RECEIVED, (_, fcmNotification) => {
            // DEBUG: Log notification
            console.log('Notification', fcmNotification);

            // Check notification for display title
            if (fcmNotification.notification.title) {
                const notification = new Notification(fcmNotification.notification.title, {
                    body: fcmNotification.notification.body,
                    icon: fcmNotification.notification.icon
                });

                notification.onclick = () => {
                    console.log('Notification clicked');
                };
            } else {
                // payload has no body, so consider it silent (and just consider the data portion)
            }
        });

        // Start service
        console.log('Starting Electron push');
        this.ipc.send(ipcChannels.START_NOTIFICATION_SERVICE, environment.firebase.messagingSenderId);
    }

    // Register push for browser implementation
    browserInit(): void {
        // Wait for service worker to be ready
        navigator.serviceWorker.ready.then(registration => {
            // DEBUG: Log service worker registration
            console.log(registration);

            if (!!registration && registration.active.state === 'activated') {
                // Retrieve an instance of Firebase Messaging so that it can handle background messages.
                const messaging = this.firebase.messaging();

                // Set service worker for messaging
                messaging.useServiceWorker(registration);

                // Subscribe to FCM tokens
                this.fire.requestToken.subscribe(
                    (token) => {
                        console.log('Registration:', token);
                    },
                    (error) => {
                        console.error('Error:', error);
                    },
                );

                // Subscribe to notifications
                this.fire.messages.subscribe((notification) => {
                    console.log(notification);
                });
            } else {
                console.warn('No active service worker found, not able to get firebase messaging');
                ServiceWorkerModule.register('firebase-messaging-sw.js', { enabled: true });
            }
        });
    }

    subscribe(topic: string): void {
        // If Android/iOS subscribe as usual
        if (!(device.platform === 'Android' || device.platform === 'iOS')) {
            this.push.subscribe(
                topic,
                () => {
                    console.log(`Subscribed to ${topic}`);
                },
                (error) => {
                    console.log('Error:', error);
                }
            );
        }

        // TODO: if Electron/browser send to server to subscribe
    }

    unsubscribe(topic: string): void {
        // If Android/iOS unsubscribe as usual
        if (!(device.platform === 'Android' || device.platform === 'iOS')) {
            this.push.unsubscribe(
                topic,
                () => {
                    console.log(`Unsubscribed from ${topic}`);
                },
                (error) => {
                    console.log('Error:', error);
                }
            );
        }

        // TODO: if Electron/browser send to server to unsubscribe
    }
}
