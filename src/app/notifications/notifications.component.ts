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
    followRequests: any = [];

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

        // Get follow requests TODO:
        this.backend.getFollowRequests().subscribe(
            requests => this.followRequests = requests,
            error => console.warn(error),
            () => console.log(this.followRequests)
        );
    }

    approveFollower(id: number): void {
        console.log('approve', id);
        const request = this.removeRequest(id);
        this.backend.approveFollower(id).subscribe(
            () => console.log('Follower approved:', id),
            (error: any) => this.followRequests.push(request),
            () => console.log(this.followRequests)
        );
    }

    declineFollower(id: number): void {
        console.log('decline', id);
        const request = this.removeRequest(id);
        this.backend.declineFollower(id).subscribe(
            () => console.log('Follower declined:', id),
            (error: any) => this.followRequests.push(request),
            () => console.log(this.followRequests)
        );
    }

    removeRequest(id: number): object {
        return _.remove(this.followRequests, (r) => {
            return r.followingUser.id === id;
        })[0];
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
