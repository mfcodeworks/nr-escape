import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private user: UserService) {}

    public isSignedIn(): boolean {
        return this.user.token ? true : false;
    }

    public doSignOut(): void {
        this.user.destroy();
        localStorage.removeItem('login');
    }

    public doSignIn(token: string, profile: any, email: string, settings: any): void {
        if ((!token) || (!profile) || (!email) || (!settings)) { return; }
        // Update user as logged in
        Object.assign(this.user, {token, profile, email, settings});
        this.user.loggedIn.next(!!token);
        // Save user object
        localStorage.setItem(`login`, JSON.stringify(this.user.toJson()));
    }
}
