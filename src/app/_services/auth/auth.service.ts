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
        Object.assign(this.user, {token, profile, email, settings});
        localStorage.setItem(`login`, JSON.stringify(this.user.toJson()));
    }
}
