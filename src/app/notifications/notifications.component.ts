import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Notification } from '../_models/notification';
import { CacheService } from '../_services/cache/cache.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {

    notifications: Notification[] = [];

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService
    ) {}

    ngOnInit() {
        // Get recommendations from route resolver data
        this.route.data.subscribe((data) => {
            if (data.notifications instanceof Array) {
                this.notifications = data.notifications;
                this.cache.store('notifications', data.notifications);
                console.log(this.notifications);
            } else {
                // TODO: Handle error
            }
        });
    }
}
