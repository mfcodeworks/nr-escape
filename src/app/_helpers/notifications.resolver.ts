import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';

import { Notification } from '../_models/notification';

@Injectable()
export class NotificationsResolver implements Resolve<Observable<Notification[]>> {

    constructor(private backend: BackendService) { }

    resolve(): Observable<Notification[]> {
        return this.backend.getUserNotifications().pipe(
            catchError((error) => {
                return of(error);
            })
        );
    }
}
