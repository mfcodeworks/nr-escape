import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Post } from '../_models/post';
import { Profile } from '../_models/profile';

@Component({
    selector: 'app-post-display',
    templateUrl: './post-display.component.html',
    styleUrls: ['./post-display.component.css'],
})
export class PostDisplayComponent implements OnInit {
    postUrl: string;
    @Input() post: Post;
    @Input() user: Profile;
    @Input() isFollowed = false;
    @Output() liked: EventEmitter<any> = new EventEmitter();
    @Output() follow: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() report: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {
        // Set post URL for copying
        this.postUrl = `${window.location.hostname}/post/${this.post.id}`;
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
        console.log('Copying', this.postUrl);
        const $text = document.createElement('textarea');
        $text.style.position = 'fixed';
        $text.style.left = '0';
        $text.style.top = '0';
        $text.style.opacity = '0';
        $text.value = this.postUrl;
        document.body.appendChild($text);
        $text.focus();
        $text.select();
        document.execCommand('copy');
        console.log($text.value);
        document.body.removeChild($text);
    }
}
