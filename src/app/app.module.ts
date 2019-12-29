import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { Routing } from './app.routing';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { MaterialModule } from './_modules/material/material.module';
import { AppComponent } from './app.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        Routing,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireMessagingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: !!(window.cordova || window.Cordova) }),
        MaterialModule
    ],
    declarations: [
        TopBarComponent,
        BottomBarComponent,
        AppComponent,
        NotFound404Component
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    constructor() {
        console.log('Loaded app module');
    }
}
