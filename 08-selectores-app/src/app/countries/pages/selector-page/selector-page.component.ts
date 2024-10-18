import { SmallCountry } from './../../interfaces/country.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit{

  myForm!: FormGroup;
  countriesByRegion: SmallCountry[] = [];
  bordersByCountry: SmallCountry[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ){
    this.myForm = this.fb.group({
      region: ['', Validators.required],
      country: ['', Validators.required],
      border: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();;
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChange(): void {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => (this.bordersByCountry = [])),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
      )
    )
    .subscribe((countries) => {
      this.countriesByRegion = countries;
    });
  }

  onCountryChange(): void {
    this.myForm
    .get('country')!
    .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter( (value: string) => value.length > 0),
        switchMap((alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode)),
        switchMap( (country) => this.countriesService.getCountriesBorderByCodes( country.borders ))
      )
      .subscribe(( countries ) => {
        this.bordersByCountry = countries;
      });
  }


}
