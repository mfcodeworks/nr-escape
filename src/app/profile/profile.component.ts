import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../backend/backend.service';
import { Profile } from '../profile';
import { Post } from '../post';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    profile: Profile;
    posts: Post[] = [];

    constructor(private route: ActivatedRoute, private backend: BackendService, private userService: UserService) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data.profile;
        console.log(this.profile);

        // Get posts asynchronously
        this.profile.posts.forEach((postId) => {
            this.backend.getPost(postId).subscribe((post) => {
                this.posts.push(post);
            });
        });
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
