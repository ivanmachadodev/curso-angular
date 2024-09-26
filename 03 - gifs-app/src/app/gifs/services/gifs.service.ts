import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/search-response.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagHistory: string[] = [];
  private apiKey: string = 'j3XGLY7JWpWntBcgF5x1FusaHxqPcfPy';
  private giphyApiUrl: string = 'https://api.giphy.com/v1/gifs';

  gifsList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagHistory() {
    return [...this._tagHistory];
  }

  private organiceHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagHistory.unshift(tag);

    this._tagHistory = this.tagHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage(): void{
    localStorage.setItem('tagHistory', JSON.stringify( this._tagHistory ))
  }

  private loadLocalStorage(): void{
    if( !localStorage.getItem('tagHistory') ) return;

    this._tagHistory = JSON.parse( localStorage.getItem('tagHistory')! );

    if(this._tagHistory.length === 0) return;

    this.searchTag(this._tagHistory[0]);

  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organiceHistory(tag);

    const params = new HttpParams()
                        .set('api_key', this.apiKey)
                        .set('limit', '10')
                        .set('q', tag)

    this.http.get<SearchResponse>(`${this.giphyApiUrl}/search`, {params})
        .subscribe( resp => {
          this.gifsList = resp.data;
          console.log({gifs: this.gifsList})
        })
  }

}
