import { Component, Input, OnInit } from '@angular/core';

import { User } from '../user';
import { Post } from '../post';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-post-interaction-bar',
    templateUrl: './post-interaction-bar.component.html',
    styleUrls: ['./post-interaction-bar.component.css'],
})
export class PostInteractionBarComponent implements OnInit {
    @Input() post: Post;
    user: User;

    constructor(private userService: UserService) {
        this.user = userService.user;
    }

    ngOnInit() {}

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

    repost(post: Post) { }
}
