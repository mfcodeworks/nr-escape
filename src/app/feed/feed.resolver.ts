import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';
import { BackendService } from '../backend/backend.service';

import { Post } from '../post';

@Injectable()
export class FeedResolver implements Resolve<Observable<Post[]>> {

    constructor(private userService: UserService, private backend: BackendService) { }

    resolve() {
        return this.backend.getUserFeed(this.userService.profile.id);
    }
}
