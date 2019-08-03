import { Component, OnInit } from '@angular/core';

declare var moment: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor() {}
    ngOnInit() {
        // Moment.js set locale to display with shorthand (s,h,d,m,y)
        moment.locale('en', {
            relativeTime: {
                future: 'in %s',
                past: '%s',
                s:  'seconds',
                ss: '%ss',
                m:  'a minute',
                mm: '%dm',
                h:  'an hour',
                hh: '%dh',
                d:  'a day',
                dd: '%dd',
                M:  'a month',
                MM: '%dM',
                y:  'a year',
                yy: '%dY'
            }
        });
    }
}
