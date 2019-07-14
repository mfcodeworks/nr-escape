import { Component, Input } from '@angular/core';

import { user } from '../test-data/user';

@Component({
    selector: 'app-post-display',
    templateUrl: './post-display.component.html',
    styleUrls: ['./post-display.component.css'],
})
export class PostDisplayComponent {
    @Input() post;
    user = user;

    likePost(post) {
        switch(this.isLiked(post)) {
            // If post is liked, remove like
            case true:
                for (let i = 0; i < post.likes.length; i++) {
                    if (post.likes[i] === user.id) { post.likes.splice(i, 1); }
                }
                break;

            // If not liked add a new like
            case false:
                post.likes.push(user.id);
                break;
        }

        // DEBUG: Log post data
        console.log(post.likes);
    }

    isLiked(post) {
        return post.likes.includes(user.id);
    }

    followUser(id) {
        console.log(id);
    }
}
