import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../_models/post';
import { CacheService } from '../_services/cache/cache.service';
import { BackendService } from '../_services/backend/backend.service';

declare const _: any;

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
    posts: Post[] = null;
    userId: number;
    fetchedAllPosts = false;

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService,
        private backend: BackendService
    ) {}

    public ngOnInit() {
        // Get posts from route resolver data
        this.route.data.subscribe((data) => {
            if (data.posts instanceof Array) {
                this.posts = data.posts;
                this.cache.store('feed', data.posts);
            } else {
                console.error(data.posts);
            }
        });
    }

    fetchMorePosts(): void {
        console.log('Fetching more posts now, offset id:', this.posts[this.posts.length - 1].id);
        this.backend.getUserFeed(this.posts[this.posts.length - 1].id).subscribe(posts => {
            if (!posts.length) {
                this.fetchedAllPosts = true;
                return;
            }
            this.posts = _.union(this.posts, posts);
            this.cache.store('feed', this.posts);
        });
    }

    removePost(id: number): void {
        // Remove post from feed array
        _.remove(this.posts, (p: any) => {
            return parseInt(p.id, 10) === id;
        });
    }
}
