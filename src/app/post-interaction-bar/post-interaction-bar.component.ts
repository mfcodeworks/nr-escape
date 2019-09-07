import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../_models/post';
import { UserService } from '../_services/user/user.service';

@Component({
    selector: 'app-post-interaction-bar',
    templateUrl: './post-interaction-bar.component.html',
    styleUrls: ['./post-interaction-bar.component.css'],
})
export class PostInteractionBarComponent implements OnInit {
    @Input() post: Post;

    constructor(private userService: UserService) {}

    ngOnInit() {}

    likePost(post: Post) {
        switch (this.isLiked(post)) {
            // If post is liked, remove like
            case true:
                for (let i = 0; i < post.likes.length; i++) {
                    if (post.likes[i] === this.userService.profile.id) { post.likes.splice(i, 1); }
                }
                break;

            // If not liked add a new like
            case false:
                post.likes.push(this.userService.profile.id);
                break;
        }

        // DEBUG: Log post data
        console.log(post.likes);
    }

    isLiked(post: Post) {
        return post.likes.includes(this.userService.profile.id);
    }

    repost(post: Post) { }
}
