import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';

import { Post } from '../_models/post';

@Injectable()
export class PostResolver implements Resolve<Observable<Post>> {

    constructor(
        private backend: BackendService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.backend.getPost(
            parseInt(route.paramMap.get('postId'), 10)
        ).pipe(
            catchError((error) => {
                this.router.navigate(['/404']);
                return of(error);
            })
        );
    }
}
