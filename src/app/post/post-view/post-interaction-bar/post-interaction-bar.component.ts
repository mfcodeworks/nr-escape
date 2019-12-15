import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Post } from '../../../_models/post';

@Component({
    selector: 'app-post-interaction-bar',
    templateUrl: './post-interaction-bar.component.html',
    styleUrls: ['./post-interaction-bar.component.css'],
})
export class PostInteractionBarComponent implements OnInit {
    @Input() post: Post;
    @Input() isLiked: any = false;
    @Output() liked: EventEmitter<any> = new EventEmitter();
    @Output() repost: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    likePost(event: MouseEvent) {
        this.liked.emit(event);
    }

    doRepost() {
        this.repost.emit();
    }
}
