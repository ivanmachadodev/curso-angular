import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'products-product',
  templateUrl: './product-page.component.html',
  styles: ``,
})
export class ProductPageComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  isProductVisible: boolean = false;
  currentPrice: number = 10;

  constructor() {
    console.log('ProductPageComponent: constructor');
  }

  ngOnInit(): void {
    console.log('ProductPageComponent: ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ProductPageComponent: ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('ProductPageComponent: ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ProductPageComponent: ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ProductPageComponent: ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ProductPageComponent: ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ProductPageComponent: ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ProductPageComponent: ngOnDestroy');
  }

  increasePrice(){
    this.currentPrice++;
  }
}
