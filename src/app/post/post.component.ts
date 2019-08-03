import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../post';
import { Comment } from '../comment';
import { BackendService } from '../backend/backend.service';

// Moment.js
declare var moment: any;

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

        // Get comments asynchronously
        this.post.comments.forEach((commentId) => {
            this.backend.getComment(commentId).subscribe((comment) => {
                this.comments.push(comment);
            });
        });
    }

    postComment(input: string) {
        console.log(input);
    }

    dateDiff(datetime: number) {
        // Moment.js datediff
        return moment(datetime).fromNow();
    }
}
