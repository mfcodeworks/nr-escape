import { Component, OnInit } from '@angular/core';
import {
    Event,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from '@angular/router';

import { PushService } from './_services/push/push.service';
import { DarkThemeService } from './_services/dark-theme/dark-theme.service';

declare const $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loading = false;

    constructor(
        private router: Router,
        private push: PushService,
        private darkTheme: DarkThemeService
    ) {
        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }

                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }

    ngOnInit() {
        localStorage.setItem('dark-mode', JSON.stringify(true));
        // On Cordova 'deviceready' event, or html 'load' event; init push services
        document.addEventListener(
            window.hasOwnProperty('cordova') ? 'deviceready' : 'load',
            () => { this.push.init(); }
        );
    }
}
