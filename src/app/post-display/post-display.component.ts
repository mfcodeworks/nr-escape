import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../_services/user/user.service';
import { Post } from '../_models/post';
import { Profile } from '../_models/profile';

declare var moment: any;

@Component({
    selector: 'app-post-display',
    templateUrl: './post-display.component.html',
    styleUrls: ['./post-display.component.css'],
})
export class PostDisplayComponent implements OnInit {
    @Input() post: Post;
    user: Profile;

    constructor(private userService: UserService) {
        this.user = this.userService.profile;
    }

    ngOnInit() {}

    dateDiff(datetime: string) {
        // Moment.js datediff
        return moment(datetime).fromNow();
    }

    likePost(post: Post) {
        switch (this.isLiked(post)) {
            // If post is liked, remove like
            case true:
                for (let i = 0; i < post.likes.length; i++) {
                    if (post.likes[i] === this.user.id) { post.likes.splice(i, 1); }
                }
                break;

            // If not liked add a new like
            case false:
                post.likes.push(this.user.id);
                break;
        }

        // DEBUG: Log post data
        console.log(post.likes);
    }

    isLiked(post: Post) {
        return post.likes.includes(this.user.id);
    }

    followUser(id: number) {
        console.log(id);
    }
}
