import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Profile } from '../../_models/profile';
import { CacheService } from '../cache/cache.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public settings: any = [];
    public email: string;
    public token: string;
    public profile: Profile = new Profile();
    public loggedIn: Subject<boolean> = new Subject<boolean>();

    /**
     * Get user profile from storage
     *
     * @param cache CacheService
     */
    constructor(private cache: CacheService) {
        Object.assign(this, JSON.parse(localStorage.getItem('login')));
    }

    /**
     * Build user object
     *
     * @param model User Object to build from
     */
    public build(model: any): void {
        // Update user as logged in
        Object.assign(this, model);
        this.loggedIn.next(!!model.token);

        // Cache user object
        this.cacheUser();
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
        this.loggedIn.next(false);
    }

    // Save user object
    public cacheUser(): void {
        this.cache.store('login', this.toJson());
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
