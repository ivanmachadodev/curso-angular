import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { PlacesService } from '../../services';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit{

  placesService = inject( PlacesService );
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  ngAfterViewInit(): void {

    if( !this.placesService.userLocation ) throw Error('No hay userLocation');

    const mapDiv = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 11.5, // starting zoom
    });
  }

}
