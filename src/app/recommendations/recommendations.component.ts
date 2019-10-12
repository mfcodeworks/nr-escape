import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../_models/profile';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';
import { CacheService } from '../_services/cache/cache.service';

declare const _: any;

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
    recommendations: Profile[] = [];
    isDark: boolean;

    // TODO: Add infinite scroll for posts

    constructor(
        private route: ActivatedRoute,
        private dark: DarkThemeService,
        private cache: CacheService
    ) {}

    ngOnInit() {
        // Get recommendations from route resolver data
        this.route.data.subscribe((data) => {
            if (data.recommendations instanceof Array) {
                this.recommendations = _.shuffle(data.recommendations);
                this.cache.store('recommendations', data.recommendations);
                console.log(this.recommendations);
            } else {
                // Handle error
                console.warn(data);
            }
        });

        this.dark.isDarkMode()
        .subscribe((mode: boolean) => {
            this.isDark = mode;
        });
    }
}
