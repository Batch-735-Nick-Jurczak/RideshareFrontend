import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}else{
  const script = document.createElement('script');
   script.src = `https://maps.googleapis.com/maps/api/js?key=asdfadasfdfasdfasdfeve`
   document.head.appendChild(script);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
