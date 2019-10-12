import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';

import { Profile } from '../_models/profile';

@Injectable()
export class RecommendationsResolver implements Resolve<Observable<Profile[]>> {

    constructor(
        private backend: BackendService,
        private router: Router
    ) { }

    resolve(): Observable<Profile[]> {
        return this.backend.getRecommendations().pipe(
            catchError((error) => {
                // this.router.navigate(['/404']);
                return of(error);
            })
        );
    }
}
