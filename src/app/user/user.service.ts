import { Injectable } from '@angular/core';

// import { User } from '../user';
import { BackendService } from '../backend/backend.service';
import { Profile } from '../profile';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public settings: any;
    public email: string;
    public token: string;
    public profile: Profile;

    // TODO: Get user profile (id: 1) and create user
    constructor(private backend: BackendService) {}

    // API: Get Recent Posts for User
    getUserFeed() {
        return this.backend.getUserFeed(this.profile.id);
    }

    // TODO: API: Get User Notifications
    getUserNotifications() {
        return this.backend.getUserNotifications(this.profile.id);
    }

    public destroy(): void {
        this.settings = null;
        this.email = null;
        this.token = null;
        this.profile = null;
    }
}
