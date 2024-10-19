import { Color } from './../../../../../../05-pipes-app/src/app/products/interfaces/hero.interface';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PlainMarker {
  lngLat: number[]
  color: string;
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  zoomValue: number = 12;
  map?: Map;
  currentCenter: LngLat = new LngLat(-64.18, -31.42);
  markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoomValue, // starting zoom
    });

    this.readFromLocalStorage();

    // const marker = new Marker({
    //   color: 'blue',
    // })
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ marker, color });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage() )
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker) {
    if (!this.map) return;

    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({marker, color}) => {
      return { lngLat: marker.getLngLat().toArray(), color: color }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers) )
  }

  readFromLocalStorage() {
    const plainMarkers: PlainMarker[] = JSON.parse(localStorage.getItem('plainMarkers') ?? '[]');

    plainMarkers.forEach( ({lngLat, color}) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat);
      this.addMarker(coords, color);
    })
  }
}
