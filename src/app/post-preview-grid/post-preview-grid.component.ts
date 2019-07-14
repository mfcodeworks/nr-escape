import { Component, Input } from '@angular/core';

import { profiles } from '../test-data/user';

@Component({
    selector: 'app-post-preview-grid',
    templateUrl: './post-preview-grid.component.html',
    styleUrls: ['./post-preview-grid.component.css'],
})
export class ProfileComponent {
    @Input() profile;
}
