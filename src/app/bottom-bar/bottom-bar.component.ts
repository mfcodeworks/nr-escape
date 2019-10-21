import { Component, OnInit } from '@angular/core';

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

    // TODO: Highlight navbutton when active

    constructor(private user: UserService, private dark: DarkThemeService) {
        this.dark.isDarkMode()
        .subscribe((darkMode: any) => {
            this.isDark = darkMode;
        });
    }

    ngOnInit() {
        this.username = this.user.profile.username;
    }
}
