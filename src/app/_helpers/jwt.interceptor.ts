import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../_services/auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Only add auth to requests for our API
        return request.url.startsWith(environment.apiUrl)
            ? this.auth.isSignedIn().pipe(
                map(u => !!this.auth.getToken() ? `Bearer ${this.auth.getToken()}` : ''),
                map((Authorization: string) => request.clone({
                    setHeaders: { Authorization },
                    withCredentials: !!Authorization
                })),
                mergeMap(r => next.handle(r))
            )
            : next.handle(request);
    }
}
