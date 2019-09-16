import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';

declare const cordova: any;
declare const device: any;
declare const PushNotification: any;

@Injectable({
    providedIn: 'root'
})
export class PushService {
    push: object;

    constructor(private user: UserService) { }

    mobilePushInit(): void {
        // Check device
        console.log(device);
        if (!(device.platform === 'Android' || device.platform === 'iOS')) {
            return;
        }

        // TODO: Init for Android/iOS
    }

    subscribe(topic: string): void {
        // TODO: If Android/iOS subscribe as usual, if Electron send to server to subscribe
    }

    unsubscribe(topic: string): void {
        // TODO: If Android/iOS unsubscribe as usual, if Electron send to server to unsubscribe
    }
}
