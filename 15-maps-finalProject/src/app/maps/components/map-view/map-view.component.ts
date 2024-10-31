import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements AfterViewInit {
  placesService = inject(PlacesService);
  mapService = inject(MapService);
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error('No hay userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 11.5, // starting zoom
    });

    const popup = new Popup().setHTML(`
        <h5>Aquí estoy</h5>
        <span>Estoy en este lugar del mundo</span>
        `);

    new Marker({ color: 'blue' })
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap( map );
  }
}
