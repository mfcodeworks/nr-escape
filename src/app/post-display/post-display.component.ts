import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Post } from '../_models/post';
import { Profile } from '../_models/profile';

@Component({
    selector: 'app-post-display',
    templateUrl: './post-display.component.html',
    styleUrls: ['./post-display.component.css'],
})
export class PostDisplayComponent implements OnInit {
    @Input() post: Post;
    @Input() user: Profile;
    @Input() isFollowed = false;
    @Output() liked: EventEmitter<any> = new EventEmitter();
    @Output() follow: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    likePost() {
        this.liked.emit(this.post);
    }

    followUser(id: number) {
        this.follow.emit(id);
    }
}
