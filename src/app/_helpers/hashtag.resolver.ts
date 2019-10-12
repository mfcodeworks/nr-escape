import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';

@Injectable()
export class HashtagResolver implements Resolve<Observable<any[]>> {

    constructor(
        private backend: BackendService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        return this.backend.search(
            route.paramMap.get('hashtag'),
            'hashtag'
        ).pipe(
            catchError((error) => {
                this.router.navigate(['/404']);
                return of(error);
            })
        );
    }
}
