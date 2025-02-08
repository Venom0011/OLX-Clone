import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { ProductDTO } from 'src/app/models/productDTO';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent {
  addProductForm: FormGroup;
  selectedFile?: File;
  private authService?: AuthService;

  categories: String[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router:Router
  ) {
    {
      this.addProductForm = this.fb.group({
        productName: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]], // Ensure price is a non-negative number
        addedDate: [
          new Date().toISOString().split('T')[0],
          Validators.required,
        ], // Initialize with today's date in YYYY-MM-DD format
        categoryName: ['', Validators.required],
        image: [null, Validators.required], 
        locality: ['', Validators.required],
        city:['',Validators.required]
      });
    }
    {
      this.categoryService.getCategories().subscribe(
        {
        next: (categories) => {
          // Extract only the category names
          this.categories = categories.map((category) => category.name); // Adjust 'name' to the correct property
        },
        error: (error: any) => {
          console.error('Error fetching categories: ', error);
        }
      }
      );
    
    }
  }

  onSubmit(): void {
    const categoryName = this.addProductForm.value.categoryName;
    console.log(categoryName);

    const userId: number = JSON.parse(sessionStorage.getItem('user')).id;
    const productDTO: ProductDTO = {
      productName: this.addProductForm.value.productName,
      description: this.addProductForm.value.description,
      price: this.addProductForm.value.price,
      addedDate: this.addProductForm.value.addedDate,
      productAddress: this.addProductForm.value.locality,
      city:this.addProductForm.value.city,
    };

    this.productService
      .addProduct(categoryName, userId, productDTO, this.selectedFile)
      .subscribe(
        {
        next: (response: any) => {
          if (response) {
            this.toastr.success(response.message);
            this.router.navigateByUrl('/categories');
          }
        },
        error: (error: any) => {
          console.error('Error adding product:', error); 
          this.toastr.error("Error adding product");
        }
      }
      );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
  

