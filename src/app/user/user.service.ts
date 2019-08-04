import { Injectable } from '@angular/core';

// import { User } from '../user';
import { Profile } from '../profile';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public settings: any = [];
    public email: string = '';
    public token: string = '';
    public profile: Profile = new Profile();

    // TODO: Get user profile (id: 1) and create user
    constructor() {}

    public destroy(): void {
        this.settings = null;
        this.email = null;
        this.token = null;
        this.profile = null;
    }
}
