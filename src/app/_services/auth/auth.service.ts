import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { CacheService } from '../cache/cache.service';
import { BackendService } from '../backend/backend.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    public updateUser(): void {
        this.isSignedIn().subscribe(user => {
            console.log('Refreshing user', !!user);
            if (!!user) {
                this.backend.getUser().subscribe(
                    (data) => this.user.build(data),
                    (error) => console.warn(error),
                    () => console.log('User updated')
                );
            }
        });
    }

    public isSignedIn(): Observable<boolean> {
        return this.cache.get('login').pipe(map(l => !!l));
    }

    public doSignOut(): void {
        this.user.destroy();
        this.cache.clear();
        this.router.navigate(['/login']);
    }

    public doSignIn(response: any): void {
        this.user.build(response);
    }

    public getToken(): string {
        return this.user.token;
    }
}
