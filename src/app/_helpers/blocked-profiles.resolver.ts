import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';
import { Profile } from '../_models/profile';

@Injectable()
export class BlockedProfilesResolver implements Resolve<Observable<Profile[]>> {

    constructor(
        private backend: BackendService,
        private router: Router
    ) { }

    resolve(): Observable<Profile[]> {
        return this.backend.getUserBlocks().pipe(
            catchError((error) => {
                return of(error);
            })
        );
    }
}
