import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaXZhbm1hY2hhZG9kZXYiLCJhIjoiY20yZjhneWRyMDZjcTJrbjF6cjZ3cnN5ZyJ9.Av5y8iClQSMRsI5DijRU-Q';

if( !navigator.geolocation ) {
  alert('Navegador no soporta la geolocalización');
  throw new Error('Navegador no soporta la geolocalización');
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
