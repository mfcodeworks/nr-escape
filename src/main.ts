import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
};

// If running Cordova wait for device ready to access native resources
!!(window.cordova || window.Cordova)
  ? document.addEventListener('deviceready', bootstrap, false)
  : bootstrap();
