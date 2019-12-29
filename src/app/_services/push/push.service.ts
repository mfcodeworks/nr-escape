import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { filter, mergeMapTo } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { BackendService } from '../backend/backend.service';
import { IpcService } from '../ipc/ipc.service';
import * as ipcChannels from 'electron-push-receiver/src/constants';
import { UserService } from '../user/user.service';

declare const device: any;
declare const PushNotification: any;

@Injectable({
    providedIn: 'root'
})
export class PushService {
    push: any;
    topics = ['test'];
    token: string;

    // DEBUG: Fix backend save token and subscribe topic

    constructor(
        private backend: BackendService,
        private firebase: FirebaseApp,
        private fire: AngularFireMessaging,
        private ipc: IpcService,
        private user: UserService
    ) {}

    init(): void {
        console.log('Running FCM init');

        // Check device
        if (window.cordova || window.Cordova) {
            // DEBUG: Log device
            console.log(device);

            switch (device.platform) {
                case 'Android':
                case 'iOS':
                    this.mobileInit();
                    return;

                case 'browser':
                    console.log('UA:', navigator.userAgent.toLowerCase())
                    navigator.userAgent.toLowerCase().indexOf(' electron/') > -1
                        ? this.electronInit() : this.browserInit();
                    return;

                default:
                    console.log('Device has no push implementation');
                    return;
            }
        } else {
            console.log('UA:', navigator.userAgent.toLowerCase())
            navigator.userAgent.toLowerCase().indexOf(' electron/') > -1
                ? this.electronInit() : this.browserInit();
        }
    }

    // Init for Android/iOS
    mobileInit(): void {
        console.log('Running mobile FCM init');

        this.push = PushNotification.init({
            android: {
                icon: 'assets/images/logo',
                iconColor: 'black',
                topics: this.topics,
                forceShow: 'true',
            }, ios: {
                alert: 'true',
                badge: 'true',
                sound: 'true',
                topics: this.topics,
                fcmSandbox: 'true',
            },
        });

        console.log('FCM Object', this.push)

        // Register push
        this.push.on('registration', (data: any) => {
            console.log(data);
            this.token = data.registrationId;
            this.saveToken();
        });

        // Subscribe to notifications
        this.push.on('notification', (data: any) => {
            console.log(data);
        });

        // Subscribe to errors
        this.push.on('error', (error: any) => {
            console.log(error);
        });
    }

    // Register push for electron
    electronInit(): void {
        // Handle push registration
        this.ipc.on(ipcChannels.NOTIFICATION_SERVICE_STARTED, (_, token) => {
            console.log('service successfully started', token);
            this.token = token;
            this.saveToken();
        });

        // Handle push errors
        this.ipc.on(ipcChannels.NOTIFICATION_SERVICE_ERROR, (_, error) => {
            console.warn('notification error', error);
        });

        // Send token to backend when updated
        this.ipc.on(ipcChannels.TOKEN_UPDATED, (_, token) => {
            console.log('token updated', token);
            this.token = token;
            this.saveToken();
        });

        // Display notification
        this.ipc.on(ipcChannels.NOTIFICATION_RECEIVED, (_, fcmNotification) => {
            // DEBUG: Log notification
            console.log('Notification', fcmNotification);

            // Check notification for display title
            if (fcmNotification.notification.title) {
                Notification.requestPermission()
                .then(p => {
                    if (p !== 'granted') {
                        return;
                    }

                    const notification = new Notification(fcmNotification.notification.title, {
                        body: fcmNotification.notification.body || '',
                        icon: fcmNotification.notification.icon || 'assets/icons/icon-128x128.png'
                    });

                    notification.onclick = () => {
                        console.log('Notification clicked');
                    };
                })
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
        console.log('Called FCM browser init');

        // Handle no service worker
        let noSw = setTimeout(() => this.browserRegisterSw(), 5 * 1000);

        // Wait for service worker to be ready
        navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
            clearTimeout(noSw);
            noSw = null;

            this.browserMessagingRegistration(registration);
        });
    }

    browserRegisterSw(): void {
        console.warn('No active service worker found, not able to get firebase messaging');
        navigator.serviceWorker.register('firebase-messaging-sw.js');
    }

    browserMessagingRegistration(registration: ServiceWorkerRegistration, token?: string): void {
        console.log('FCM Registration:', registration);

        this.fire.requestPermission
        .pipe(mergeMapTo(this.fire.tokenChanges))
        .subscribe(
            (token) => {
                // Retrieve an instance of Firebase Messaging so that it can handle background messages.
                const messaging = this.firebase.messaging();

                // Set service worker for messaging
                // if (!registration.active.scriptURL.includes('firebase-messaging-sw.js')) {
                //     messaging.useServiceWorker(registration);
                // }

                console.log('FCM Permission Granted:', token);

                // Subscribe to FCM tokens
                this.token = token;
                this.saveToken();

                // Subscribe to notifications
                this.fire.messages.subscribe(console.log)

                // Subscribe to topics
                this.topics.forEach((topic: string) => this.subscribe(topic));
            }, (error) => console.error
        );
    }

    // Send to server to save token
    private saveToken(): void {
        console.log('Saving Token:', this.token);

        this.user.isLoggedIn().pipe(
            // Only return true
            filter((res) => res)
        ).subscribe(() => {
            console.log('Logged in');

            // Send token to server
            this.backend.saveFcm(this.token).subscribe(response => {
                console.log('Saved FCM');
            });
        });
    }

    // Send to server to subscribe
    subscribe(topic: string): void {
        this.backend.subscribeFcm(this.token, topic).subscribe(response => {
            console.log(response);
        });
    }

    // Send to server to unsubscribe
    unsubscribe(topic: string): void {
        this.backend.subscribeFcm(this.token, topic).subscribe(response => {
            console.log(response);
        });
    }
}
