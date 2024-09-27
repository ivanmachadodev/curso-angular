import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent {

  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  searchByCountry(capital: string): void {
    this.countriesService.searchByCountry(capital).subscribe((data) => {
      this.countries = data;
    });
  }

}
