import { Component, OnInit } from '@angular/core';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '../_services/cache/cache.service';
import { BackendService } from '../_services/backend/backend.service';

declare const _: any;

@Component({
    selector: 'app-hashtag-listing',
    templateUrl: './hashtag-listing.component.html',
    styleUrls: ['./hashtag-listing.component.css']
})
export class HashtagListingComponent implements OnInit {
    isDark: boolean;
    hashtag: string;
    posts: any = [];
    fetchedAll = false;

    constructor(
        private route: ActivatedRoute,
        private dark: DarkThemeService,
        private cache: CacheService,
        private backend: BackendService
    ) { }

    ngOnInit() {
        // Get current hashtag
        this.route.paramMap.subscribe(map => {
            this.hashtag = map.get('hashtag');
        });

        // Get posts from route resolver data
        this.route.data.subscribe((data) => {
            this.posts = data.posts;
            this.cache.store(`hashtag-${this.hashtag}`, data.posts);
            console.log(this.posts);
        });

        this.dark.isDarkMode()
        .subscribe((mode: boolean) => {
            this.isDark = mode;
        });
    }

    fetchMoreResults(): void {
        // Exclude posts that are already fetched
        const topNotIn = this.posts.top.map(r => r.id);
        const recentNotIn = this.posts.recent.map(r => r.id);

        // Get more posts
        console.log('Fetching more posts now, excluding id\'s:', _.union(topNotIn, recentNotIn));
        this.backend.search(this.hashtag, 'hashtag', topNotIn, recentNotIn).subscribe((results: any) => {
            if (!results.top.length || !results.recent.length) {
                this.fetchedAll = true;
                return;
            }
            this.posts.top = _.union(this.posts.top, results.top);
            this.posts.recent = _.union(this.posts.recent, results.recent);
            this.cache.store(`hashtag-${this.hashtag}`, this.posts);
            console.log(this.posts);
        });
    }
}
