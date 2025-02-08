
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductListComponent } from '../product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { RequestService } from 'src/app/services/request.service';
import { RequestDTO } from 'src/app/models/requestDTO';
import { OwnerDetails } from 'src/app/models/ownerDetails';
@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product: Product | undefined;

  // userId: number;
  OwnerDetails: OwnerDetails;
  // sellerId: number;

  userId: number;
  sellerId: number;
  productId: number;
  isYourProduct:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private requestService: RequestService
  ) {
    this.userId =
      JSON.parse(sessionStorage.getItem('user')) &&
      JSON.parse(sessionStorage.getItem('user')).id;
  }

  sellerData = null;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      this.productService
        .findProductById(this.productId)
        .subscribe((product) => {
          this.product = product;
        });
    });

    this.productService
      .getProductDetailsByProductId(this.productId)
      .subscribe((owner) => {
        console.log(owner);
        this.sellerId = owner.sellerId;
        if (this.sellerId === this.userId) {
          this.isYourProduct = true;
        }
        this.OwnerDetails = owner;
      });
  }

  sellerInfo() {
    this.productService.getSellerData(this.productId).subscribe((result) => {
      this.sellerData = result;
    });
  }

  contactSeller() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user && user.id;
    this.productService
      .contactSeller(userId, this.productId)
      .subscribe((result) => {
        console.log(result);
      });
  }

  //  const requestDto:RequestDTO={sellerId:}};

  addRequest(): void {
    this.requestService
      .addRequestForProduct({
        sellerId: this.sellerId,
        buyerId: this.userId,
        productId: this.productId,
      })
      .subscribe((result) => {
        console.log(result);
      });
  }

  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
    this.sellerInfo();
    this.contactSeller();
    this.addRequest();
  }
  closePopup() {
    this.displayStyle = 'none';
  }
}
