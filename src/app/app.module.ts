import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { Routing } from './app.routing';
import { MainModule } from './main.module';
import { AuthenticationModule } from './_modules/authentication/authentication.module';
import { AppComponent } from './app.component';
import { NotFound404Component } from './not-found404/not-found404.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireMessagingModule,
        Routing,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: !!(window.cordova || window.Cordova) }),
        AuthenticationModule,
        MainModule,
    ],
    declarations: [
        AppComponent,
        NotFound404Component
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
