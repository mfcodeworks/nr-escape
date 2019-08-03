import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { BackendService } from '../backend/backend.service';

import { Post } from '../post';

@Injectable()
export class PostResolver implements Resolve<Observable<Post>> {

    constructor(private backend: BackendService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.backend.getPost( parseInt(route.paramMap.get('postId'), 10) );
    }
}
