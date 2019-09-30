import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../_models/profile';

declare const _: any;

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
    recommendations: Profile[] = [];

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // Get recommendations from route resolver data
        this.route.data.subscribe((data) => {
            if (data.recommendations instanceof Array) {
                this.recommendations = _.shuffle(data.recommendations);
                console.log(this.recommendations);
            } else {
                // TODO: Handle error
            }
        });
    }
}
