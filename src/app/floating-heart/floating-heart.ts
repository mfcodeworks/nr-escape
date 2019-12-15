import { Injectable, ComponentFactoryResolver, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FloatingHeartComponent } from './floating-heart.component';

@Injectable({
    providedIn: 'root'
})
export class FloatingHeart {

    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document
    ) {}

    play(clickEvent: MouseEvent, heart?: boolean): void {
        const factory = this.resolver.resolveComponentFactory(FloatingHeartComponent);
        const componentRef = factory.create(this.injector);

        componentRef.instance.clickEvent = clickEvent;
        componentRef.instance.heart = heart;

        const { nativeElement } = componentRef.location;

        this.document.body.appendChild(nativeElement);
        componentRef.hostView.detectChanges();

        componentRef.instance.stop.subscribe(() => {
            componentRef.destroy();
            this.document.body.removeChild(nativeElement);
        });
    }
}
