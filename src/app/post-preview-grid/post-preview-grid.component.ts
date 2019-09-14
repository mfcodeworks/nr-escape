import { Component, Input } from '@angular/core';

import { Post } from '../_models/post';

@Component({
    selector: 'app-post-preview-grid',
    templateUrl: './post-preview-grid.component.html',
    styleUrls: ['./post-preview-grid.component.css'],
})
export class PostPreviewGridComponent {
    @Input() posts: Post[];
}
