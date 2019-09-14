import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
};

// If running over Cordova (file:) wait for device ready to access native resources
document.location.protocol === 'file:'
  ? document.addEventListener('deviceready', bootstrap, false)
  : bootstrap();
