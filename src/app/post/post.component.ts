import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../_models/post';
import { Comment } from '../_models/comment';
import { BackendService } from '../_services/backend/backend.service';

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
        this.comments = this.post.comments;
    }

    postComment(input: string) {
        console.log(input);
    }

    dateDiff(datetime: number) {
        // Moment.js datediff
        return moment(datetime).fromNow();
    }
}
