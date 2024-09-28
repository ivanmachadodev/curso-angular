import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseApiUrl: string = `https://restcountries.com/v3.1`;

  cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage(){
    if( !localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  searchByCapital(term: string): Observable<Country[]> {
    const url = `${this.baseApiUrl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries })),
      tap( () => this.saveToLocalStorage() )
    );
  }

  searchByCountry(term: string): Observable<Country[]> {
    const url = `${this.baseApiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountry = { term, countries })),
      tap( () => this.saveToLocalStorage() )
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${this.baseApiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap( () => this.saveToLocalStorage() )
    );
  }

  searchByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.baseApiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }
}
