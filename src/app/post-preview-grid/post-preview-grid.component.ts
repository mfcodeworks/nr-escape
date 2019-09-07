import { Component, Input } from '@angular/core';

import { Profile } from '../_models/profile';

@Component({
    selector: 'app-post-preview-grid',
    templateUrl: './post-preview-grid.component.html',
    styleUrls: ['./post-preview-grid.component.css'],
})
export class ProfileComponent {
    @Input() profile: Profile;
}
