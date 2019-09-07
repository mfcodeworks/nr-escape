import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../_services/backend/backend.service';
import { Profile } from '../_models/profile';
import { Post } from '../_models/post';
import { UserService } from '../_services/user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    profile: Profile;
    posts: Post[] = [];

    constructor(private route: ActivatedRoute, private userService: UserService) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data.profile;
        this.posts = this.profile.posts;
        console.log(this.profile);
    }

    isFollowing(id: number) {
        return this.userService.profile.following.includes(id);
    }

    isMe() {
        return this.profile.id === this.userService.profile.id;
    }

    editProfile() {}

    followUser(id: number) {
        this.userService.profile.following.push(id);
    }
}
