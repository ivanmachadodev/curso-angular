import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { catchError, Observable, of } from 'rxjs';
import { enviroments } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {

  private baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) {}

  getheroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>( `${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined>{
    return this.http.get<Hero | undefined>(`${this.baseUrl}/heroes/${id}`)
               .pipe(
                catchError( error => of(undefined))
               )
  }

  getSuggestions(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }
}
