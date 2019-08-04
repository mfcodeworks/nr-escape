import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../post';
import { Comment } from '../comment';
import { BackendService } from '../backend/backend.service';

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
        this.post.comments.forEach((id) => {
            this.backend.getComment(id).subscribe((comment) => {
                this.comments.push(comment);
            });
        });
    }
}
