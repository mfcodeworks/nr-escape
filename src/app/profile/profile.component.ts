import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { profiles } from '../test-data/profiles';
import { user } from '../test-data/user';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    profiles = profiles;
    user = user;
    profile: any;

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            for (const profile of profiles) {
                if (profile.id.toString() === params.get('profileId')) { this.profile = profile; }
            }
        });
    }

    isFollowing(id) {
        return user.following.includes(id);
    }

    isMe(id) {
        return id === user.id;
    }

    editProfile() { }

    followUser(id) {
        user.following.push(id);
    }
}
