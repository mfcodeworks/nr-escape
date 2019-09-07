import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../_services/user/user.service';
import { Post } from '../_models/post';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
    posts: Post[] = [];
    userId: number;
    post: Post;

    constructor(private userService: UserService, private route: ActivatedRoute) {}

    public ngOnInit() {
        // Get posts from route resolver data
        this.posts = this.route.snapshot.data.posts;
        console.log(this.posts);
    }

    // Update for API usage
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
