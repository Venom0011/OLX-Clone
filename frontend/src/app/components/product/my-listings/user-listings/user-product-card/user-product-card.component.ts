import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OutletContext } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'user-product-card',
  templateUrl: './user-product-card.component.html',
  styleUrls: ['./user-product-card.component.css']
})
export class UserProductCardComponent {

  @Input()
  product?:Product;

  @Output()  removeProduct = new EventEmitter<Product>();

  
  onRemove(): void {
    this.removeProduct.emit(this.product);
  }

}
