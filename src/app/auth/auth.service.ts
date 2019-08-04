import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Profile } from '../profile';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private user: UserService) {}

    public isSignedIn() {
        return !!this.user.token;
    }

    public doSignOut() {
        this.user.destroy();
    }

    public doSignIn(token: string, profile: Profile, email: string, settings: any) {
        if ((!token) || (!profile) || (!email) || (!settings)) { return; }
        this.user.token = token;
        this.user.profile = profile;
        this.user.email = email;
        this.user.settings = settings;
    }
}
