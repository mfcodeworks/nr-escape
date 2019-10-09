import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private user: UserService, private router: Router) {}

    public isSignedIn(): boolean {
        return !!this.user.token;
    }

    public doSignOut(): void {
        this.user.destroy();
        this.user.loggedIn.next(false);
        localStorage.removeItem('login');
        this.router.navigate(['/login']);
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
