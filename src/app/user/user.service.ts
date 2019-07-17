import { Injectable } from '@angular/core';

import { User } from '../user';
import { Post } from '../post';
import { BackendService } from '../backend/backend.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user: User;

    // TODO: Get user profile (id: 1) and create user
    constructor(private backend: BackendService) {
        this.backend
        .getProfile(1)
        .subscribe((profile) => {
                this.user = new User(profile);
                console.log(this.user);
            }
        );
    }

    // API: Get Recent Posts for User
    getUserFeed() {
        const posts: Post[] = [];
        for (const followingId of this.user.following) {
            this.backend
            .getProfile(followingId)
            .subscribe((profile) => {
                    for (let i = 0; i < 5; i++) {
                        this.backend
                        .getPost(profile.posts[i])
                        .subscribe((post) => {
                            posts.push(post);
                        });
                    }
                }
            );
        }
        return posts;
    }

    // API: Get User Notifications
    getUserNotifications() {
        return this.
    }
}
