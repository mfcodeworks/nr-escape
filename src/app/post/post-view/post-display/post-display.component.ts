import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Post } from '../../../_models/post';
import { Profile } from '../../../_models/profile';

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
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() report: EventEmitter<any> = new EventEmitter();
    @Output() copyUrl: EventEmitter<any> = new EventEmitter();

    // TODO: On hold copy post caption
    // TODO: On dblclick play overlapping heart gif

    constructor() {}

    ngOnInit() {}

    popup(ev: any) {
        console.warn('Popup', ev);
        alert(JSON.stringify(ev));
    }

    likePost() {
        this.liked.emit(this.post);
    }

    followUser(id: number) {
        this.follow.emit(id);
    }

    deletePost() {
        this.delete.emit();
    }

    reportPost() {
        this.report.emit();
    }

    copyURL() {
        this.copyUrl.emit(this.post);
    }
}
