import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styles: `
    button{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }
  `,
})
export class BtnMyLocationComponent {

  mapService = inject(MapService);
  placesService = inject(PlacesService);

  goToMyLocation() {

    if( !this.placesService.isUserLocationReady ) throw Error('No hay ubicación de usuario');
    if( !this.mapService.isMapReady ) throw Error('No se ha inicializado el mapa');

    this.mapService.flyTo( this.placesService.userLocation! )
  }
}
