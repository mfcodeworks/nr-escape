import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../_models/post';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';
import { CacheService } from '../_services/cache/cache.service';
import { BackendService } from '../_services/backend/backend.service';

declare const _: any;

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
    fetchedAllrecommendations = false;
    recommendations: Post[] = [];
    isDark: boolean;

    constructor(
        private route: ActivatedRoute,
        private dark: DarkThemeService,
        private cache: CacheService,
        private backend: BackendService
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

    fetchMoreRecommendations(): void {
        const notIn = this.recommendations.map(r => r.id);
        console.log('Fetching more posts now, excluding id\'s:', notIn);
        this.backend.getRecommendations(notIn).subscribe(recommendations => {
            if (!recommendations.length) {
                this.fetchedAllrecommendations = true;
                return;
            }
            this.recommendations = _.union(this.recommendations, _.shuffle(recommendations));
            this.cache.store('recommendations', this.recommendations);
            console.log(this.recommendations);
        });
    }
}
