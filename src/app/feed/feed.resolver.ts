import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

import { Post } from '../post';

@Injectable()
export class FeedResolver implements Resolve<Observable<Post[]>> {

    constructor(private userService: UserService) { }

    resolve() {
        return this.userService.getUserFeed();
    }
}
