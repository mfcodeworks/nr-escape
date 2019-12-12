import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { UserService } from '../_services/user/user.service';
import { Profile } from '../_models/profile';

@Injectable()
export class FollowersResolver implements Resolve<Profile[]> {

    constructor(
        private user: UserService
    ) { }

    resolve(): Profile[] {
        // TODO: Handle /followers and /{{profile}}/followers differently
        return this.user.profile.followers.map(f => f.author);
    }
}
