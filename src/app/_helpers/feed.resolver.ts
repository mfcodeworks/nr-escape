import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';

import { Post } from '../_models/post';

@Injectable()
export class FeedResolver implements Resolve<Observable<Post[]>> {

    constructor(
        private backend: BackendService,
        private router: Router
    ) { }

    resolve(): Observable<Post[]> {
        return this.backend.getUserFeed().pipe(
            catchError((error) => {
                this.router.navigate(['/404']);
                return of(error);
            })
        );
    }
}
