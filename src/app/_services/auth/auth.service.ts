import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { CacheService } from '../cache/cache.service';
import { BackendService } from '../backend/backend.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private user: UserService,
        private router: Router,
        private cache: CacheService,
        private backend: BackendService
    ) {}

    // Update user object if signed in
    public updateUser() {
        console.log('Refreshing user', this.isSignedIn());
        if (this.isSignedIn()) {
            this.backend.getUser().subscribe(
                (data) => this.user.build(data),
                (error) => console.warn(error),
                () => console.log('User updated')
            );
        }
    }

    public isSignedIn(): boolean {
        return !!this.user.token;
    }

    public doSignOut(): void {
        this.user.destroy();
        this.user.loggedIn.next(false);
        this.cache.clear();
        this.router.navigate(['/login']);
    }

    public doSignIn(response: any): void {
        this.user.build(response);
    }
}
