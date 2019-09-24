import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { UrlPreviewService } from '../_services/url-preview/url-preview.service';

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
    @ViewChild('videoInput', {static: false}) videoInput: ElementRef;
    @ViewChild('photoInput', {static: false}) photoInput: ElementRef;

    media: any;
    mediaPreview: any;
    type: string;
    mediaTypes = [
        'Photo',
        'Video',
        'URL'
    ];
    postForm = this.fb.group({
        firstCtrl: ['', Validators.required],
        secondCtrl: ['', Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private urlPreview: UrlPreviewService
    ) {}

    previewUrl(url: string): void {
        this.urlPreview.fetch(url)
        .subscribe((preview) => {
            console.log(preview);
            this.media = url;
            this.mediaPreview = preview;
        });
    }

    selectedMedia() {
        // Switch media type
        switch (this.type) {
            case 'Video':
                this.saveMedia(this.videoInput.nativeElement.files);
                break;

            case 'Photo':
                this.saveMedia(this.photoInput.nativeElement.files);
                break;
        }
    }

    saveMedia(input: any) {
        console.log(input);
        if (!input.length) {
            return;
        }

        console.log(input[0]);
        this.media = input[0];

        const reader = new FileReader();
        reader.readAsDataURL(this.media);
        reader.onloadend = (result: any) => {
            console.log(reader.result);
            this.mediaPreview = reader.result;
        };
    }

    nullMedia() {
        this.media = null;
        this.mediaPreview = null;
    }
}
