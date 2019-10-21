import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../../_models/post';
import { BackendService } from '../../_services/backend/backend.service';
import { UserService } from '../../_services/user/user.service';

declare const _: any;

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
    @Input() preview = false;
    @Input() post: Post = null;
    @Output() deleted: EventEmitter<any> = new EventEmitter();

    constructor(
        private backend: BackendService,
        protected user: UserService
    ) { }

    ngOnInit() {}

    likePost(): void {
        switch (this.isLiked()) {
            // If not liked add a new like
            case false:
                this.addLike();
                this.backend.likePost(this.post.id).subscribe((response: any) => {
                    // Success
                }, (error: any) => {
                    // Handle Error
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
                    // Handle Error
                    console.warn(error);
                    this.addLike();
                });
                break;
        }
    }

    // Check if post likes has an index with the users ID
    isLiked(): boolean {
        return _.findIndex(this.post.likes, (l: any) => {
            return parseInt(l.user, 10) === this.user.profile.id;
        }) !== -1;
    }

    // Check if post author is the active user or in the users following list
    isFollowed(): boolean {
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
    followUser(event: any): void {
        console.log('Follow user', event);
    }

    // Delete post
    deletePost(): void {
        this.backend.deletePost(this.post.id)
        .subscribe((response: any) => {
            this.deleted.emit(this.post.id);
        }, (error: any) => {
            console.warn(error);
        });
    }

    // Report post
    reportPost(): void {
        this.backend.reportPost(this.post.id)
        .subscribe((response: any) => {
            // TODO: Have some kind of response
            console.log(response);
        }, (error: any) => {
            console.warn(error);
        });
    }

    // TODO: Repost this.post
    repost() {
        console.log('Repost', this.post);
    }

}