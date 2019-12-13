import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../_models/post';
import { CacheService } from '../_services/cache/cache.service';
import { BackendService } from '../_services/backend/backend.service';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
    posts: Post[] = [];
    userId: number;
    fetchedAllPosts = false;
    fetchingPosts = false;

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService,
        private backend: BackendService
    ) {}

    ngOnInit() {
        // Get posts from route resolver data
        this.route.data.subscribe((data) => {
            this.posts = Array.prototype.concat(this.posts, data.posts);
            this.cache.store('feed', data.posts);
        });
    }

    fetchMorePosts(): void {
        if (this.fetchingPosts || this.fetchedAllPosts) return;

        console.log('Fetching more posts now, offset id:', this.posts[this.posts.length - 1].id);
        this.fetchingPosts = true;

        this.backend.getUserFeed(this.posts[this.posts.length - 1].id).subscribe(posts => {
            this.fetchedAllPosts = posts.length < 30;
            if (!posts) return;

            this.posts = Array.prototype.concat(this.posts, posts);
            this.cache.store('feed', this.posts);
            this.fetchingPosts = false;
        },
        () => this.fetchingPosts = false);
    }

    removePost(id: number): void {
        // Remove post from feed array
        this.posts = this.posts.filter((p: Post) => p.id !== id);
    }
}
