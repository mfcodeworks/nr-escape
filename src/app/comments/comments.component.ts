import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../_models/post';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
    @Input() post: Post;
    @Input() preview = false;

    constructor() {}

    ngOnInit() {}
}
