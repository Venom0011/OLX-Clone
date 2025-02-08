import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'sold-product-card',
  templateUrl: './sold-product-card.component.html',
  styleUrls: ['./sold-product-card.component.css']
})
export class SoldProductCardComponent {
  @Input()
  product?:Product;

  @Output()  removeProduct = new EventEmitter<Product>();

  
  onRemove(): void {
    this.removeProduct.emit(this.product);
  }

}
