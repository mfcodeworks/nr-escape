import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { profiles } from '../test-data/profiles';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    profiles = profiles;
    profile: any;

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            for (const profile of profiles) {
                if (profile.id.toString() === params.get('profileId')) { this.profile = profile; }
            }
        });
    }
}
