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

declare const moment: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loading = false;

    constructor(private router: Router, private push: PushService) {
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
        // Moment.js set locale to display with shorthand (s,h,d,m,y)
        moment.updateLocale('en', {
            relativeTime: {
                future: 'in %s',
                past: '%s',
                s:  '1s',
                ss: '%ss',
                m:  '1m',
                mm: '%dm',
                h:  '1h',
                hh: '%dh',
                d:  '1d',
                dd: '%dd',
                M:  '1M',
                MM: '%dM',
                y:  '1Y',
                yy: '%dY'
            }
        });

        // On Cordova deviceready event init push services
        document.addEventListener('deviceready', () => {
            this.push.mobilePushInit();
        });
    }
}
