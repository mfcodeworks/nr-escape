import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
    post: Post = null;
    comments: Comment[] = [];

    constructor(
        private route: ActivatedRoute,
        private backend: BackendService,
        private errorToast: MatSnackBar
    ) { }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.route.data.subscribe((data) => {
            if (data.post instanceof Object) {
                this.post = data.post;
                this.comments = this.post.comments;
            } else {
                this.errorToast.open(data.post, 'close', {
                    duration: 3000
                });
            }
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
