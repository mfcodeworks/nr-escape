import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { UserService } from '../_services/user/user.service';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.css'],
})
export class BottomBarComponent implements OnInit {
    username: string;
    isDark: boolean;
    activeNav: string;

    // TODO: Highlight navbutton when active

    constructor(
        private user: UserService,
        private dark: DarkThemeService,
        private router: Router
    ) {
        // Set is dark mode
        this.dark.isDarkMode()
        .subscribe((darkMode: any) => {
            this.isDark = darkMode;
        });

        // Set username
        this.username = this.user.profile.username;

        // Set active route
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                console.warn('New URL', this.router.url);
                this.activeNav = this.findActiveUrl();
            }
        });
    }

    ngOnInit() {
    }

    findActiveUrl(): string {
        switch (this.router.url) {
            case '/':
                return 'feed';

            case '/search':
            case '/recommendations':
                return 'search';

            case '/new-post':
                return 'new';

            case `/profile/${this.username}`:
                return 'user';

            case '/notifications':
                return 'notifications';

            default:
                return '';
        }
    }
}
