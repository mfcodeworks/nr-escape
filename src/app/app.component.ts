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
import { AuthService } from './_services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loading = false;

    constructor(
        public router: Router,
        private push: PushService,
        private auth: AuthService
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
        // Update user object as needed
        this.auth.updateUser();

        // On Cordova 'deviceready' event, or html 'load' event; init push services
        document.addEventListener(
            window.hasOwnProperty('cordova') ? 'deviceready' : 'load',
            () => { this.push.init(); }
        );

        PullToRefresh.init({
            mainElement: 'body',
            onRefresh: () => {
                this.router.navigateByUrl(this.router.url);
            }
        });
    }
}
