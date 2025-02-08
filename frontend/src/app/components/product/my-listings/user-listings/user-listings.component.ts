import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'user-listings',
  templateUrl: './user-listings.component.html',
  styleUrls: ['./user-listings.component.css']
})
export class UserListingsComponent implements OnInit {

  products:Product[] = [];
  soldProducts:Product[] = [];

  toggle: boolean = true;


  subscription?: Subscription;

  constructor(private productService: ProductService){
   
    this.userId = JSON.parse(sessionStorage.getItem("user")) && JSON.parse(sessionStorage.getItem("user")).id;
  }

  userId: number = 0;

  ngOnChanges(): void{
    if(this.loadProductsBasedUserId(this.userId)===null){

      this.products = [];
    }
    else{
      this.loadProductsBasedUserId(this.userId);
    }
    
  }


  ngOnInit(): void {
    this.loadProductsBasedUserId(this.userId);
    
    
  }

  showSoldListings():void{
    if(this.loadSoldProductsBasedUserId(this.userId)==null){
      this.soldProducts = [];
    }
    else{
    this.loadSoldProductsBasedUserId(this.userId);
    }
    this.toggle = false;
    

  }

  loadProductsBasedUserId(userId:number): void{
    this.productService.getProductsByUserId(userId).subscribe(
      {next: (product) => {
        this.products = product
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    }
    )
  }

  loadSoldProductsBasedUserId(userId:number):void{

    this.productService.getSoldProductList(userId).subscribe(
      {next: (product) => {
        this.soldProducts = product.map((product) => ({
          ...product,
          productImgPath: `${product.productImgPath.substring(product.productImgPath.indexOf('/assets') + '/assets'.length)}`
        }));
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    }
    )
  }

  showCurrentListings():void{
    this.toggle = true;
    this.loadProductsBasedUserId(this.userId);
  }


  onRemoveProduct(product: Product): void {
    
      this.productService.deleteProduct(product.id).subscribe(
        {
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
          this.soldProducts = this.soldProducts.filter(p=> p.id!==product.id);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
        }
      );
    
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();


}

}
