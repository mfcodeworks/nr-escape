import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { posts } from '../test-data/posts';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
    posts = posts;
    post: any;

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            for (const post of posts) {
                if (post.id.toString() === params.get('postId')) { this.post = post; }
            }
        });
    }
}
