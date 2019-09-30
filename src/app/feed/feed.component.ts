import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Post } from '../_models/post';

declare const _: any;

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
    posts: Post[] = null;
    userId: number;

    constructor(
        private route: ActivatedRoute,
        private errorToast: MatSnackBar
    ) {}

    public ngOnInit() {
        // Get posts from route resolver data
        this.route.data.subscribe((data) => {
            if (data.posts instanceof Array) {
                this.posts = data.posts;
                console.log(this.posts);
            } else {
                console.error(data.posts);
                this.errorToast.open(data.posts, 'close', {
                    duration: 3000
                });
            }
        });
    }
}
