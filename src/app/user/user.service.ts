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
        this.user = new User({
            id: 1,
            username: 'nygmarose',
            profilePic: 'https://instagram.fsin1-1.fna.fbcdn.net/vp/771f0952ce7f6a46edf3ca45a22a22be/5DC180C6/t51.2885-19/s320x320/62494222_322600142006525_291767870130487296_n.jpg?_nc_ht=instagram.fsin1-1.fna.fbcdn.net',
            bio: 'New testing account!',
            email: 'it@nygmarosebeauty.com',
            key: 'h12z26gtr52fdt87',
            postCount: 3,
            followingCount: 2,
            followerCount: 2,
            contactInfo: {
                email: 'mailto:mua@nygmarosebeauty.com',
                website: 'https://nygmarosebeauty.com'
            },
            followers: [
                1,
                2,
                3
            ],
            following: [
                1,
                2,
                3
            ],
            posts: [
                1,
                2,
                3
            ]
        });
    }

    // API: Get Recent Posts for User
    getUserFeed() {
        return this.backend.getUserFeed(this.user.id);
    }

    // TODO: API: Get User Notifications
    getUserNotifications() {
        return this.backend.getUserNotifications(this.user.id);
    }
}
