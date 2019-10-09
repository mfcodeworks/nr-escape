import { Component, OnInit } from '@angular/core';

import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
    isDark: boolean;

    constructor(private dark: DarkThemeService) { }

    ngOnInit() {
        console.log(this.dark);
        this.dark.isDarkMode()
        .subscribe((darkMode: any) => {
            this.isDark = darkMode;
        });
    }
}
