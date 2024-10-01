import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styles: ``,
})
export class ListPageComponent implements OnInit{

  heroes: Hero[] = [];

  constructor(private heroService: HeroesService){}

  ngOnInit(): void {
    this.heroService.getheroes()
        .subscribe(heroes => this.heroes = heroes);
  }



}
