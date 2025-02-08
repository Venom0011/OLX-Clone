import { Product } from '../../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductResponse } from 'src/app/models/productResponse';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productResponse: ProductResponse = null;

  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  @Input()
  searchText: string = '';

  subscription: Subscription;

  product: Product;
  // userId: number = 0;

  constructor(
    private searchService: SearchService,
    private productService: ProductService
  ) {
    this.subscription = this.searchService
      .getSearchText()
      .subscribe((searchText) => {
        this.searchText = searchText;
      });
  }

  ngOnInit(): void {
    //
    // this.userId = JSON.parse(sessionStorage.getItem("user")) && JSON.parse(sessionStorage.getItem("user")).id;
    this.loadProducts();

    console.log(this.product);
  }

  // loadProductsBasedOnState(): void {
  //   if (this.userId) {
  //     this.loadUserBasedProducts(this.userId);

  //   } else {
  //     this.loadProducts();
  //   }
  // }

  loadProducts(): void {
    this.productService.getActiveProducts().subscribe({
      next: (product: ProductResponse) => {
        this.currentPageSubject.next(product.pageNumber);
        this.productResponse = product;
        this.products = product.prductList;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      },
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
    if (this.currentPageSubject.value > 0) {
      this.gotoPage(
        direction === 'forward'
        ? this.currentPageSubject.value + 1
        : this.currentPageSubject.value - 1
      );
    }
  }

  // loadUserBasedProducts(userId:number): void{
  //   this.productService.getProducts(userId).subscribe(
  //     (product) => {
  //       this.products = product.map(product => ({
  //         ...product,
  //         productImgPath: `${product.productImgPath.substring(product.productImgPath.indexOf('/assets') + '/assets'.length)}`
  //       }));
  //     },
  //     (error) => {
  //       console.error('Error loading products:', error);
  //     }
  //   )
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    // constructor(private productService: ProductService) { }
  }
}
