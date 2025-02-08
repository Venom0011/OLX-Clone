// categories.component.ts
import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductResponse } from 'src/app/models/productResponse';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  currentCategory: string;

  toggle: boolean = true

  constructor(private categoryService: CategoryService , private productService: ProductService) {
    
   }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (category) => {
        this.categories=category
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadProductsByCategory(categoryName: string): void {
    this.currentCategory = categoryName;
    this.productService.getProductsByCategory(categoryName).subscribe({
      next: (categoryProducts:ProductResponse) => {
        this.products = categoryProducts.prductList;
       }
     });

    this.toggle = false;
  }
}