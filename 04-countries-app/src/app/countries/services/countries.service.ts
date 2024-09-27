import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseApiUrl: string = `https://restcountries.com/v3.1`;

  constructor(private http: HttpClient) {}

  searchByCapital(capital: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.baseApiUrl}/capital/${capital}`)
      .pipe(catchError(() => of([])));
  }

  searchByCountry(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseApiUrl}/name/${country}`);
  }

  searchByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseApiUrl}/region/${region}`);
  }

  searchCountryByParams(
    searchTerm: string,
    param: string
  ): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.baseApiUrl}${param}/${searchTerm}`)
      .pipe(catchError(() => of([])));
  }

  searchByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.baseApiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }
}
