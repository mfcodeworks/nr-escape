import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';

@Injectable()
export class HashtagResolver implements Resolve<Observable<any[]>> {

    constructor(private backend: BackendService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        return this.backend.search(
            route.paramMap.get('hashtag'),
            'hashtag'
        ).pipe(
            catchError((error) => {
                return of(error);
            })
        );
    }
}
