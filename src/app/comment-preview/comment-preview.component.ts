import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../_models/post';
import { Comment } from '../_models/comment';
import { BackendService } from '../_services/backend/backend.service';

@Component({
    selector: 'app-comment-preview',
    templateUrl: './comment-preview.component.html',
    styleUrls: ['./comment-preview.component.css'],
})
export class CommentPreviewComponent implements OnInit {
    @Input() post: Post;
    comments: Comment[] = [];

    constructor(private backend: BackendService) {
    }

    ngOnInit() {
        this.comments = this.post.comments;
    }
}
