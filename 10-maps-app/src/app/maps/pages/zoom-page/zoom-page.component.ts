import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css',
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  zoomValue: number = 10;
  map?: Map;
  currentCenter: LngLat = new LngLat(-64.18, -31.42);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoomValue, // starting zoom
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener() {
    if (!this.map) throw 'El mapa no existe';

    this.map.on('zoom', (ev) => {
      this.zoomValue = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map?.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentCenter = this.map!.getCenter();
    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoomValue = Number(value);
    this.map!.zoomTo(this.zoomValue);
  }
}
