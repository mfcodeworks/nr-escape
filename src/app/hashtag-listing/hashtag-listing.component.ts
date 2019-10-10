import { Component, OnInit } from '@angular/core';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-hashtag-listing',
    templateUrl: './hashtag-listing.component.html',
    styleUrls: ['./hashtag-listing.component.css']
})
export class HashtagListingComponent implements OnInit {
    isDark: boolean;
    hashtag: string;
    posts: any = [];

    constructor(
        private route: ActivatedRoute,
        private dark: DarkThemeService
    ) { }

    ngOnInit() {
        // Get current hashtag
        this.route.paramMap.subscribe(map => {
            this.hashtag = map.get('hashtag');
        });

        // Get posts from route resolver data
        this.route.data.subscribe((data) => {
            this.posts = data.posts;
            console.log(this.posts);
        });

        this.dark.isDarkMode()
        .subscribe((mode: boolean) => {
            this.isDark = mode;
        });
    }

}
