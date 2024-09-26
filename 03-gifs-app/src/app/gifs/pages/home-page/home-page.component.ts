import { Gif } from '../../interfaces/search-response.interfaces';
import { GifsService } from './../../services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private gifsService: GifsService){}

  get gifs(): Gif[]{
    return this.gifsService.gifsList;
  }
}
