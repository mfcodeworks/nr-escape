import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../post';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
    post: Post;

    constructor(
        private route: ActivatedRoute,
        private backend: BackendService
    ) { }

    ngOnInit() {
        // Get route parameters
        this.route.paramMap.subscribe(params => {
            // Get post from route postId
            this.backend.getPost( parseInt(params.get('postId'), 10) )
            .subscribe((post) => {
                // Assign post as data from backend service
                this.post = post;
            });
        });
    }
}
