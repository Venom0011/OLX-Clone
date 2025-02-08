import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductResponse } from 'src/app/models/productResponse';
import { ProductService } from 'src/app/services/product.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent {
  productResponse: ProductResponse = null;

  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private productService: ProductService) {}
  products = [];

  ngOnInit() {
    this.displayProduct();
  }

  displayProduct() {
    this.productService
      .listAllProducts()
      .subscribe((result: ProductResponse) => {
        if (result) {
          console.log(result);
          this.productResponse=result
          this.products = result.prductList;
        }
      });
  }

  gotoPage(pageNumber?: number) {
    this.productService.getActiveProducts(pageNumber).subscribe({
      next: (product: ProductResponse) => {
        this.currentPageSubject.next(pageNumber);
        console.log(product);
        this.productResponse = product;
        this.products = product.prductList;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      },
    });
  }

  goToNextOrPreviousPage(direction?: string) {
    this.gotoPage(
      direction === 'forward'
        ? this.currentPageSubject.value + 1
        : this.currentPageSubject.value - 1
    );
  }
}
