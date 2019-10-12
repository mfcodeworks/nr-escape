import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../_models/post';
import { CacheService } from '../_services/cache/cache.service';

declare const _: any;

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
    posts: Post[] = null;
    userId: number;

    // TODO: Add infinite scroll for posts

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService
    ) {}

    public ngOnInit() {
        // Get posts from route resolver data
        this.route.data.subscribe((data) => {
            if (data.posts instanceof Array) {
                this.posts = data.posts;
                this.cache.store('feed', data.posts);
                console.log(this.posts);
            } else {
                console.error(data.posts);
            }
        });
    }

    removePost(id: number) {
        // Remove post from feed array
        _.remove(this.posts, (p: any) => {
            return parseInt(p.id, 10) === id;
        });
    }
}
