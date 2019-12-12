import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Post } from '../../../_models/post';
import { Profile } from '../../../_models/profile';
import { UrlPreviewService } from 'src/app/_services/url-preview/url-preview.service';

@Component({
    selector: 'app-post-display',
    templateUrl: './post-display.component.html',
    styleUrls: ['./post-display.component.css'],
})
export class PostDisplayComponent implements OnInit {
    @Input() post: Post;
    @Input() user: Profile;
    @Input() isFollowed = false;
    @Input() displayRepost = true;
    @Output() liked: EventEmitter<any> = new EventEmitter();
    @Output() follow: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() report: EventEmitter<any> = new EventEmitter();
    @Output() copyUrl: EventEmitter<any> = new EventEmitter();
    mediaPreview: any;

    // TODO: On hold copy post caption
    // TODO: On dblclick play overlapping heart gif

    constructor(private urlPreview: UrlPreviewService) {}

    ngOnInit() {
        if (this.post.type === 'url') {
            this.previewUrl();
        }
    }

    previewUrl(): void {
        // Get URL preview
        this.urlPreview.fetch(this.post.media)
        .subscribe(
            (preview) => {
                console.log(preview);
                this.mediaPreview = preview;
            },
            (err) => {
                this.mediaPreview = {
                    url: this.post.media,
                    title: this.post.media,
                    image: 'https://glamsquad.sgp1.cdn.digitaloceanspaces.com/SocialHub/default/images/www.jpg',
                    description: this.post.media.split('://')[1].split('.')
                        .find(seg => !['www','com','org','net','http','https'].includes(seg))
                        .toLocaleUpperCase()
                }
            }
        );
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
