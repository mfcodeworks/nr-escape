import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
import { CacheService } from '../cache/cache.service';

declare const $: any;

@Injectable({
    providedIn: 'root'
})
export class DarkThemeService {
    isDark: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private cache: CacheService
    ) {
        // Check for dark theme
        const darkTheme = this.cache.get('dark-mode');
        console.log('Dark mode', darkTheme);
        darkTheme ? this.isDark.next(darkTheme) : this.isDark.next(false);

        // Begin switching dark theme
        this.switchDarkMode();
    }

    setDarkTheme(dark: boolean) {
        this.cache.store('dark-mode', dark);
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
