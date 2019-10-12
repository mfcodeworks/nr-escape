import { Component, OnInit } from '@angular/core';
import {
    Event,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from '@angular/router';
import * as PullToRefresh from 'pulltorefreshjs';

import { PushService } from './_services/push/push.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loading = false;

    // TODO: Pull to refresh page

    constructor(
        public router: Router,
        private push: PushService
    ) {
        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart:
                    this.loading = true;
                    break;

                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError:
                    this.loading = false;
                    break;

                default:
                    break;
            }
        });
    }

    ngOnInit() {
        // On Cordova 'deviceready' event, or html 'load' event; init push services
        document.addEventListener(
            window.hasOwnProperty('cordova') ? 'deviceready' : 'load',
            () => { this.push.init(); }
        );

        const url = this.router;
        PullToRefresh.init({
            mainElement: 'body',
            onRefresh() {
                url.navigate([window.location.pathname]);
            }
        });
    }
}
