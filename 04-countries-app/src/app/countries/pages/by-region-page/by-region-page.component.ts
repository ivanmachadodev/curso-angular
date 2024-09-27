import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent {

  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  searchByRegion(capital: string): void {
    this.countriesService.searchByRegion(capital).subscribe((data) => {
      this.countries = data;
    });
  }

}
