import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SignedInGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isSignedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
