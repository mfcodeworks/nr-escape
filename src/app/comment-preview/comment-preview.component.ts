import { Component, Input } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-comment-preview',
    templateUrl: './comment-preview.component.html',
    styleUrls: ['./comment-preview.component.css'],
})
export class CommentPreviewComponent {
    user: User;

    @Input() post;

    constructor(private userService: UserService) {
        this.user = userService.user;
    }

    likePost(post) {
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

    isLiked(post) {
        return post.likes.includes(this.user.id);
    }

    // TODO: Emit Repost Event
    repost(post) { }
}
