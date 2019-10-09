import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const $: any;

@Injectable({
    providedIn: 'root'
})
export class DarkThemeService {
    isDark: Subject<boolean> = new Subject<boolean>();

    constructor() {
        // Set dark theme
        localStorage.setItem('dark-mode', 'true');

        // Begin switching dark theme
        this.switchDarkMode();

        // Check for dark theme
        const darkTheme = JSON.parse(localStorage.getItem('dark-mode'));
        console.log('Dark mode', darkTheme);
        darkTheme ? this.isDark.next(darkTheme) : this.isDark.next(false);
    }

    setDarkTheme(dark: boolean) {
        localStorage.setItem('dark-mode', JSON.stringify(dark));
        this.isDark.next(dark);
    }

    isDarkMode() {
        return this.isDark.asObservable();
    }

    switchDarkMode() {
        this.isDarkMode().subscribe(mode => {
            console.log('Switching dark mode:', mode);
            switch (mode) {
                case true:
                    // Set dark theme
                    $('body').addClass('dark-theme');
                    break;

                case false:
                    // Set dark theme
                    $('body').removeClass('dark-theme');
                    break;
            }
        });
    }
}
