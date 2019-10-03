import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../_models/post';
import { BackendService } from '../_services/backend/backend.service';
import { UserService } from '../_services/user/user.service';

declare const _: any;

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
    @Input() preview = false;
    @Input() post: Post = null;

    constructor(
        private backend: BackendService,
        protected user: UserService
    ) { }

    ngOnInit() {}

    likePost() {
        switch (this.isLiked()) {
            // If not liked add a new like
            case false:
                this.addLike();
                this.backend.likePost(this.post.id).subscribe((response: any) => {
                    // Success
                }, (error: any) => {
                    // TODO: Handle Error
                    console.warn(error);
                    this.removeLike();
                });
                break;

            // If post is liked, remove like
            case true:
                this.removeLike();
                this.backend.unlikePost(this.post.id).subscribe((response: any) => {
                    // Success
                }, (error: any) => {
                    // TODO: Handle Error
                    console.warn(error);
                    this.addLike();
                });
                break;
        }
    }

    // Check if post likes has an index with the users ID
    isLiked(): any {
        return _.findIndex(this.post.likes, (l: any) => {
            return parseInt(l.user, 10) === this.user.profile.id;
        }) !== -1;
    }

    // Check if post author is the active user or in the users following list
    isFollowed(): any {
        return this.post.author.id === this.user.profile.id ||
            _.findIndex(this.user.profile.following, (f: any) => {
                return f.followingUser === this.post.author.id;
            }) !== -1;
    }

    addLike(): void {
        this.post.likes.push({
            post: this.post.id,
            user: this.user.profile.id
        });
    }

    removeLike(): void {
        _.remove(this.post.likes, (l: any) => {
            return parseInt(l.user, 10) === this.user.profile.id;
        });
    }

    // Follow profile
    followUser(event: any) {
        console.log('Follow user', event);
    }

    // TODO: Repost this.post
    repost() {
        console.log('Repost', this.post);
    }

}
