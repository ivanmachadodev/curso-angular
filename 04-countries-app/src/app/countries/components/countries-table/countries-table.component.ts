import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './countries-table.component.html',
  styles: `
  img{
    width: 35px
  }`
})
export class CountriesTableComponent {

  @Input()
  countries: Country[] = [];

}
