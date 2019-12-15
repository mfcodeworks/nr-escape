import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-floating-heart',
    templateUrl: './floating-heart.component.html',
    styleUrls: ['./floating-heart.component.css'],
    animations: [
        trigger('heartFadeout', [
            transition(':enter', [
                style({ opacity: 1 }),
                animate('1s', style({ transform: 'translateY(-100px)', opacity: 0 }))
            ])
        ])
    ]
})
export class FloatingHeartComponent implements OnInit {
    @Input() heart: boolean = true;
    @Input() clickEvent: MouseEvent;
    @Output() stop = new EventEmitter();
    hostPosition: object = {
        'top': '200px',
        'left': '200px'
    };

    constructor(private host: ElementRef<HTMLElement>) {}

    ngOnInit() {
        this.hostPosition = {
            'top': `${this.clickEvent.clientY}px`,
            'left': `${this.clickEvent.clientX}px`
        }
    }

    get container(): HTMLElement {
        return this.host.nativeElement.querySelector('floating-heart') as HTMLElement;
    }

    animationDone(event) {
        if (event.triggerName === 'heartFadeout') {
            this.stop.emit(true);
        }
    }

}
