import { Component, OnInit } from '@angular/core';

import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
    isDark;

    constructor(private dark: DarkThemeService) { }

    ngOnInit() {
        console.log(this.dark);
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
