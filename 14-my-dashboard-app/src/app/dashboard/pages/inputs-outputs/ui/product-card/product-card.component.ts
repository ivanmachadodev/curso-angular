import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from "../../../../../interfaces/product.interface";

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './product-card.component.html',
    styles: [`
    :host {
      display: block;
    }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {

  //@Input({required: true}) product!: Product;
  product = input.required<Product>();

  onIncrementQuantity = output<number>();

  incrementQuantity(): void {
    this.onIncrementQuantity.emit( this.product().quantity + 1 );
  }

}
