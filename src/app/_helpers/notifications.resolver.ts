import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';

import { Notification } from '../_models/notification';

@Injectable()
export class NotificationsResolver implements Resolve<Observable<Notification[]>> {

    constructor(
        private backend: BackendService,
        private router: Router
    ) { }

    resolve(): Observable<Notification[]> {
        return this.backend.getUserNotifications().pipe(
            catchError((error) => {
                // this.router.navigate(['/404']);
                return of(error);
            })
        );
    }
}
