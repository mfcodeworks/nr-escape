import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SignedInGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isSignedIn().pipe(
            map(u => {
                if (u) return true;
                this.router.navigate(['/login']);
                return false;
            })
        );
    }
}
