import { Pipe, PipeTransform } from '@angular/core';

declare const moment: any;

@Pipe({
    name: 'dateDiff'
})
export class DateDiffPipe implements PipeTransform {

    // Moment.js set locale to display with shorthand (s,h,d,m,y)
    constructor() {
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

    // Moment.js datediff from now (e.g. 8d for a date 8 days ago)
    transform(value: any, ...args: any[]): string {
        // Check weeks as moment.js only provides months, not weeks for fromNow()
        const weeks = moment().diff(value, 'weeks');
        return weeks < 52 && weeks > 2
            ? `${weeks}w` : moment(value).fromNow();
    }

}
