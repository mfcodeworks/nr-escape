import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const $: any;

@Injectable({
    providedIn: 'root'
})
export class DarkThemeService {
    isDark: Subject<boolean> = new Subject<boolean>();

    constructor() {
        // Check for dark theme
        const darkTheme = localStorage.getItem('dark-mode');
        console.log('Dark mode', darkTheme);

        if (darkTheme) {
            // Set dark mode true
            this.isDark.next(true);

            // Set dark theme
            $('body').addClass('dark-theme');
        } else {
            // Set dark mode to false
            this.isDark.next(false);

            // Set dark theme
            $('body').removeClass('dark-theme');
        }
    }

    setDarkTheme(dark: boolean) {
        localStorage.setItem('dark-mode', JSON.stringify(dark));
        this.isDark.next(dark);
    }

    isDarkMode() {
        return this.isDark.asObservable();
    }
}
