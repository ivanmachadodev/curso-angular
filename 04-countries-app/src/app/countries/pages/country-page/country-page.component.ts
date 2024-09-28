import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: `
  img{
    width: 400px
  }`,
})
export class CountryPageComponent implements OnInit {
  country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.countriesService.searchByAlphaCode(id)))
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('');

        this.country = country;
        return country;
      });
  }
}
