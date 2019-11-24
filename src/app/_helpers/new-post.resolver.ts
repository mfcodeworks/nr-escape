import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';

import { Post } from '../_models/post';

@Injectable()
export class NewPostResolver implements Resolve<Observable<Post>> {

    constructor(
        private backend: BackendService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const postId = parseInt(route.queryParamMap.get('postId')) || null;
        return !!postId ? this.backend.getPost(postId).pipe(
            catchError((error) => {
                this.router.navigate(['/404']);
                return of(error);
            })
        ) : null;
    }
}
