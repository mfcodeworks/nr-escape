import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../_models/profile';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';

declare const _: any;

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
    recommendations: Profile[] = [];
    isDark: boolean;

    constructor(
        private route: ActivatedRoute,
        private dark: DarkThemeService
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

        this.dark.isDarkMode()
        .subscribe((mode: boolean) => {
            this.isDark = mode;
        });
    }
}
