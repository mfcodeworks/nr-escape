import { Component, OnInit } from '@angular/core';
import {
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
    Scroll
} from '@angular/router';
import * as PullToRefresh from 'pulltorefreshjs';

import { PushService } from './_services/push/push.service';
import { AuthService } from './_services/auth/auth.service';
import { filter, delay } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

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
        private auth: AuthService,
	    private viewportScroller: ViewportScroller,
    ) {
        this.router.events.pipe(
			filter((e: any): e is Scroll => e instanceof Scroll),
			delay(0),
        ).subscribe((event: any) => {
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

            if (event.position) {
                // backward navigation
                this.viewportScroller.scrollToPosition(event.position);
            } else if (event.anchor) {
                // anchor navigation
                this.viewportScroller.scrollToAnchor(event.anchor);
            } else {
                // forward navigation
                this.viewportScroller.scrollToPosition([0, 0]);
            }
        });

        // On Cordova 'deviceready' event, or html 'load' event; init push services
        window.cordova || window.Cordova
            ? document.addEventListener('deviceready', () => this.push.init())
            : window.addEventListener('load', () => this.push.init());
    }

    ngOnInit() {
        // Update user object as needed
        this.auth.updateUser();

        PullToRefresh.init({
            mainElement: 'body',
            onRefresh: () => {
                this.router.navigateByUrl(this.router.url);
            }
        });
    }
}
