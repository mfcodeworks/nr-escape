import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../backend/backend.service';
import { Profile } from '../profile';
import { User } from '../user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    user: User = new User();
    profile: Profile = new Profile();

    constructor(private route: ActivatedRoute, private backend: BackendService, private userService: UserService) {
        this.user = userService.user;
    }

    ngOnInit() {
        // Get route parameters
        this.route.paramMap.subscribe(params => {
            // Get profile from backend service
            this.backend.getProfile( parseInt(params.get('profileId'), 10) )
            .subscribe((profile) => {
                // Set profile from backend data
                this.profile = profile;
            });
        });
    }

    isFollowing(id: number) {
        return this.user.following.includes(id);
    }

    isMe() {
        return this.profile.id === this.user.id;
    }

    editProfile() { }

    followUser(id: number) {
        this.user.following.push(id);
    }
}
