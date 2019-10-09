import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user/user.service';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.css'],
})
export class BottomBarComponent implements OnInit {
    userId: number;
    isDark;

    constructor(private user: UserService, private dark: DarkThemeService) {}

    ngOnInit() {
        this.userId = this.user.profile.id;
        this.dark.isDarkMode().subscribe(
            (darkMode: any) => {
                console.log('Dark', darkMode);
                this.isDark = darkMode;
            }, (error: any) => {
                console.error('Dark mode error', error);
            }, () => {
                console.log('Dark mode complete');
            }
        );
    }
}
