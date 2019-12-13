import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../../_models/post';
import { BackendService } from '../../_services/backend/backend.service';
import { UserService } from '../../_services/user/user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
    @Input() preview = false;
    @Input() post: Post = null;
    @Output() deleted: EventEmitter<any> = new EventEmitter();
    appUrl = environment.appUrl;
    postUrl: string;

    constructor(
        private backend: BackendService,
        public user: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        // Set post URL for copying
        this.postUrl = `/post/${this.post.id}`;
    }

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
        return !!this.post.likes.find(l => l.user === this.user.profile.id);
    }

    // Check if post author is the active user or in the users following list
    isFollowed(): boolean {
        return this.post.author.id === this.user.profile.id ||
            !!this.user.profile.following.find(f => f.followingUser.id === this.post.author.id);
    }

    addLike(): void {
        this.post.likes.push({
            post: this.post.id,
            user: this.user.profile.id
        });
    }

    removeLike(): void {
        this.post.likes = this.post.likes.filter(l => l.user !== this.user.profile.id)
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

    // Repost this.post
    repost() {
        console.log('Repost', this.post);
        this.router.navigate(['/new-post'], { queryParams: { postId: this.post.id } });
    }

    copyURL() {
        console.log('Copying', this.postUrl);
        const $text = document.createElement('textarea');
        $text.style.position = 'fixed';
        $text.style.left = '0';
        $text.style.top = '0';
        $text.style.opacity = '0';
        $text.value = `${this.appUrl}${this.postUrl}`;
        document.body.appendChild($text);
        $text.focus();
        $text.select();
        document.execCommand('copy');
        console.log($text.value);
        document.body.removeChild($text);
    }

}
