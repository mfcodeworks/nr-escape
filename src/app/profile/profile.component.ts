import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../backend/backend.service';
import { Profile } from '../profile';
import { User } from '../user';
import { Post } from '../post';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    user: User = new User();
    profile: Profile = new Profile();
    posts: Post[] = [];

    constructor(private route: ActivatedRoute, private backend: BackendService, private userService: UserService) {
        this.user = userService.user;
    }

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
