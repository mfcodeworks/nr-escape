import { Component, Input, OnInit } from '@angular/core';

import { User } from '../user';
import { Post } from '../post';
import { Comment } from '../comment';
import { UserService } from '../user/user.service';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'app-comment-preview',
    templateUrl: './comment-preview.component.html',
    styleUrls: ['./comment-preview.component.css'],
})
export class CommentPreviewComponent implements OnInit {
    @Input() post: Post;
    comments: Comment[] = [];
    user: User;

    constructor(private userService: UserService, private backend: BackendService) {
        this.user = userService.user;
    }

    ngOnInit() {
        this.post.comments.forEach((id) => {
            this.backend.getComment(id).subscribe((comment) => {
                this.comments.push(comment);
            });
        });
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
