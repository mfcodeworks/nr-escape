import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Notification } from '../_models/notification';
import { CacheService } from '../_services/cache/cache.service';
import { BackendService } from '../_services/backend/backend.service';

declare const _: any;

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
    fetchedAllNotifications = false;
    notifications: Notification[] = [];

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService,
        private backend: BackendService
    ) {}

    ngOnInit() {
        // Get recommendations from route resolver data
        this.route.data.subscribe((data) => {
            if (data.notifications instanceof Array) {
                this.notifications = data.notifications;
                this.cache.store('notifications', data.notifications);
                console.log(this.notifications);
            } else {
                // Handle error
                console.warn(data);
            }
        });
    }

    fetchMoreNotifications(): void {
        console.log('Fetching more notifications now, offset id:', this.notifications[this.notifications.length - 1].id);
        this.backend.getUserNotifications(this.notifications[this.notifications.length - 1].id).subscribe(notifications => {
            console.log(notifications);
            this.notifications = _.union(this.notifications, notifications);
            this.cache.store('notifications', this.notifications);
        });
    }
}
