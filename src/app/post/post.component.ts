import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../post';
import { Comment } from '../comment';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
    post: Post;
    comments: Comment[] = [];

    constructor(
        private route: ActivatedRoute,
        private backend: BackendService
    ) { }

    ngOnInit() {
        this.post = this.route.snapshot.data.post;
        console.log(this.post);

        // Get comments asynchronously
        this.post.comments.forEach((commentId) => {
            this.backend.getComment(commentId).subscribe((comment) => {
                this.comments.push(comment);
            });
        });
        console.log(this.comments);
    }

    postComment(input) {
        console.log(input);
    }
}
