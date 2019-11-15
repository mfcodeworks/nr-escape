import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[appLonghold]'
})
export class LongholdDirective {
    @Input() longholdTime = 300;
    @Output() appLonghold: EventEmitter<any> = new EventEmitter();
    onHoldTimeout: any = null;

    constructor() {}

    @HostListener('mousedown', ['$event'])
    @HostListener('touchstart', ['$event'])
    startOnHold(event: any) {
        if (!this.onHoldTimeout) {
            console.log('Element longhold init', event);
            this.onHoldTimeout = setTimeout(() => {
                clearTimeout(this.onHoldTimeout);
                this.onHoldTimeout = null;
                console.log('Element longhold complete', event);
                this.appLonghold.emit(event);
            }, this.longholdTime);
        }
    }

    @HostListener('mouseup', ['$event'])
    @HostListener('touchend', ['$event'])
    endOnHold(event: any) {
        if (this.onHoldTimeout) {
            clearTimeout(this.onHoldTimeout);
            this.onHoldTimeout = null;
            console.log('Element ended hold before longhold', event);
        }
    }

}
