import { inject, Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';
import { Feature, PlacesResponse } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {

  private placesApi = inject(PlacesApiClient);
  private mapService = inject(MapService);

  userLocation: [number, number] | undefined;
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if (!this.userLocation) throw Error('No hay userLocation');

    this.isLoadingPlaces = true;

    const options = {
      params: {
        proximity: this.userLocation.join(','),
      },
    };

    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, options)
      .subscribe((resp) => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces( this.places, this.userLocation! );
      });

  }

  deletePlaces(){
    this.places = [];
  }
}
