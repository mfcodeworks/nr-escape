import { Component, NgZone, ElementRef, ViewChild, Inject, OnInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Post } from '../_models/post';
import { UrlPreviewService } from '../_services/url-preview/url-preview.service';
import { UserService } from '../_services/user/user.service';
import { BackendService } from '../_services/backend/backend.service';

@Component({
    selector: 'app-post-bottom-sheet',
    templateUrl: './post-bottom-sheet.component.html',
})
export class PostBottomSheetComponent {
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private sheet: MatBottomSheetRef<PostBottomSheetComponent>
    ) {
        console.log(data.type);
    }

    setType(type: string) {
        console.log(type);
        this.data.type.next(type);
        this.sheet.dismiss();
    }
}

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
    @ViewChild('videoInput', {static: false}) videoInput: ElementRef;
    @ViewChild('photoInput', {static: false}) photoInput: ElementRef;
    @ViewChild('urlInput', {static: false}) urlInput: ElementRef;
    @ViewChild('caption', {static: false}) caption: ElementRef;
    @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

    media: any = null;
    mediaPreview: any;
    type = new Subject<string>();
    typeObs = this.type.asObservable();
    currentType: string;
    repostOf: Post = null;
    loading = false;

    constructor(
        private urlPreview: UrlPreviewService,
        private bottomSheet: MatBottomSheet,
        protected user: UserService,
        private ngZone: NgZone,
        private backend: BackendService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    ngOnInit() {
        // Subscribe to route to get repost
        this.route.data.subscribe((data) => {
            if (data.repost) {
                this.repostOf = data.repost;
                console.warn(data);
            }
        });

        // Subscribe to type observer
        this.typeObs.subscribe(type => {
            this.nullMedia();
            console.log('New type', type);
            this.currentType = type;
            // Switch media type
            switch (type) {
                case 'URL':
                    break;

                case 'Camera':
                    break;

                case 'Video':
                    this.videoInput.nativeElement.click();
                    break;

                case 'Photo':
                    this.photoInput.nativeElement.click();
                    break;
            }
        });
    }

    selectedMedia() {
        // Switch media type
        switch (this.currentType) {
            case 'URL':
                break;

            case 'Camera':
                // TODO: Add Camera method
                break;

            case 'Video':
                this.saveMedia(this.videoInput.nativeElement.files);
                break;

            case 'Photo':
                this.saveMedia(this.photoInput.nativeElement.files);
                break;
        }
    }

    openBottomSheet() {
        this.bottomSheet.open(
            PostBottomSheetComponent,
            { data: { type: this.type } }
        );
    }

    previewUrl(): void {
        // Get URL
        const url = this.urlInput.nativeElement.value;

        // If empty remove current media
        if (!url) {
            this.nullMedia();
            return;
        }

        // Get URL preview
        this.urlPreview.fetch(url)
        .subscribe((preview: any) => {
            console.log(preview);
            this.media = preview.url;
            this.mediaPreview = preview;
        });
    }

    saveMedia(input: any): void {
        console.log(input);
        if (!input.length) {
            return;
        }

        console.log(input[0]);
        this.media = input[0];

        this.loading = true;
        const reader = new FileReader();
        reader.readAsDataURL(this.media);
        reader.onloadend = (result: any) => {
            console.log('Media preview loaded');
            this.loading = false;
            this.mediaPreview = reader.result;
        };
    }

    submit() {
        this.loading = true;

        let type = 'text';
        const caption = this.caption.nativeElement.value;

        if (!this.media && !caption) {
            console.log('Cannot post empty post');
            this.loading = false;
            return;
        }

        if (this.media) {
            switch (this.currentType) {
                case 'Photo':
                    type = this.media.type;
                    break;

                case 'Video':
                    type = this.media.type;
                    break;

                case 'URL':
                    type = 'url';
                    break;
            }
        }

        const formData = new FormData();
        if (this.media) {
            formData.append('media', this.media);
        }
        formData.append('author', this.user.profile.id.toString());
        formData.append('type', type);
        formData.append('caption', caption);
        if (!!this.repostOf) {
            formData.append('repost_of', this.repostOf.id.toString());
        }

        this.backend.addPost(formData)
        .subscribe(response => {
            console.log(response);
            this.router.navigate(['']);
        },
        console.warn,
        () => this.loading = false);
    }

    nullMedia() {
        this.media = null;
        this.mediaPreview = null;
    }
}
