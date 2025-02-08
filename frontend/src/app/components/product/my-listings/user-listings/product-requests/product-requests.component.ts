import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestResponseDTO } from 'src/app/models/requestResponseDTO';
import { UserRespDTO } from 'src/app/models/userRespDTO';
import { ProductService } from 'src/app/services/product.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'product-requests',
  templateUrl: './product-requests.component.html',
  styleUrls: ['./product-requests.component.css']
})
export class ProductRequestsComponent implements OnInit {

  productId: number;
  buyers: RequestResponseDTO[];
  sellerId: number;
  

  constructor(private route: ActivatedRoute,private requestService: RequestService){

    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });

    this.sellerId = JSON.parse(sessionStorage.getItem("user")) && JSON.parse(sessionStorage.getItem("user")).id;
  }
  ngOnInit(): void {

    this.requestService.getProductRequest(this.sellerId, this.productId).subscribe({
      next: (request) =>{
        this.buyers = request;
      },
      error: (error)=>{
        console.error('Error loading requests:', error);
      }
      }
      )
    
    
  }

  
}
