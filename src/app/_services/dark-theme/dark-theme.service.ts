import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
import { CacheService } from '../cache/cache.service';

@Injectable({
    providedIn: 'root'
})
export class DarkThemeService {
    isDark: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private cache: CacheService
    ) {
        // Check for dark theme
        this.cache.get('dark-mode')
        .subscribe(darkTheme => {
            !!darkTheme ? this.isDark.next(darkTheme) : this.isDark.next(false);

            // Begin switching dark theme
            this.switchDarkMode();
        });
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
            switch (mode) {
                case true:
                    // Set dark theme
                    document.body.classList.add('dark-theme');
                    break;

                case false:
                    // Set dark theme
                    document.body.classList.remove('dark-theme');
                    break;
            }
        });
    }
}
