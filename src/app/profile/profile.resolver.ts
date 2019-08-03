import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { BackendService } from '../backend/backend.service';

import { Profile } from '../profile';

@Injectable()
export class ProfileResolver implements Resolve<Observable<Profile>> {

    constructor(private backend: BackendService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.backend.getProfile( parseInt(route.paramMap.get('profileId'), 10) );
    }
}
