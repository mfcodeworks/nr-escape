import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { BackendService } from '../backend/backend.service';

import { Post } from '../post';

@Injectable()
export class FeedResolver implements Resolve<Observable<Post[]>> {

    constructor(private backend: BackendService) { }

    resolve(): Observable<Post[]> {
        return this.backend.getUserFeed();
    }
}
