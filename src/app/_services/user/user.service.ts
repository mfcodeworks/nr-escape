import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Profile } from '../../_models/profile';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public settings: any = [];
    public email: string;
    public token: string;
    public profile: Profile = new Profile();
    public loggedIn: Subject<boolean> = new Subject<boolean>();

    // Get user profile from storage
    constructor() {
        Object.assign(this, JSON.parse(localStorage.getItem('login')));
    }

    // Return logged in observable
    public isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    // Destroy local user
    public destroy(): void {
        this.settings = null;
        this.email = null;
        this.token = null;
        this.profile = null;
    }

    public toJson(): any {
        return {
            settings: this.settings,
            email: this.email,
            token: this.token,
            profile: this.profile
        };
    }
}
