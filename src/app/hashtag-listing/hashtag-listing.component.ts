import { Component, OnInit } from '@angular/core';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '../_services/cache/cache.service';
import { BackendService } from '../_services/backend/backend.service';

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
    fetchingLists = false;

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
        if (this.fetchingLists) return;

        // Exclude posts that are already fetched
        const topNotIn = this.posts.top.map(r => r.id);
        const recentNotIn = this.posts.recent.map(r => r.id);

        this.fetchingLists = true;

        // Get more posts
        console.log('Fetching more posts now, excluding id\'s:', Array.prototype.concat(topNotIn, recentNotIn));
        this.backend.search(this.hashtag, 'hashtag', topNotIn, recentNotIn).subscribe((results: any) => {
            this.fetchedAll = !results.top.length && !results.recent.length;

            this.posts.top = Array.prototype.concat(this.posts.top, results.top);
            this.posts.recent = Array.prototype.concat(this.posts.recent, results.recent);
            this.cache.store(`hashtag-${this.hashtag}`, this.posts);
            console.log(this.posts);
            this.fetchingLists = false;
        },
        () => this.fetchingLists = false);
    }
}
