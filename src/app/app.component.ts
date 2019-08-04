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
    }
}
