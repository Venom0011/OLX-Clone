import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductDTO } from 'src/app/models/productDTO';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'update-product-details',
  templateUrl: './update-product-details.component.html',
  styleUrls: ['./update-product-details.component.css']
})
export class UpdateProductDetailsComponent {

  updateProductForm: FormGroup;
  selectedFile?: File;
  productId: number;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
     private fb: FormBuilder,
     private router:Router
  ) {
    {
      this.updateProductForm = this.fb.group({
        productName: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]], // Ensure price is a non-negative number
        addedDate: [new Date().toISOString().split('T')[0], Validators.required], // today's date in YYYY-MM-DD format
        image: [null, Validators.required] // File input for image
      });
    }



    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });

    this.loadProductData();
   }

  ngOnInit(): void {
   
  }

  loadProductData(): void {
    this.productService.findProductById(this.productId).subscribe({
      next: product => {
        this.updateProductForm.patchValue({
          productName: product.productName,
          description: product.description,
          price: product.price,
          addedDate: product.addedDate,
          image: product.imageData,
        });
        this.selectedFile = product.imageData;
      },
      error: error => {
        alert('Error loading product data: ' + error.message);
      }
    });
  }

  onSubmit() {
    if (this.updateProductForm.invalid) {
      return;
    }

    const productDTO = this.updateProductForm.value;
    this.productService.updateProduct(this.productId, productDTO, this.selectedFile).subscribe((result)=>{
      if(result){
        console.log(result.message);
        
        this.router.navigateByUrl('userListings');
      }
    })
  }


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    // if (event.target.files.length > 0) {
      
    // }
  }

}
