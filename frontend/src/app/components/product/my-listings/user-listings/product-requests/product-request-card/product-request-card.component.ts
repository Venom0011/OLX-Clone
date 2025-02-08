import { RequestService } from 'src/app/services/request.service';
import { Component, Input } from '@angular/core';
import { UserRespDTO } from 'src/app/models/userRespDTO';
import { RequestResponseDTO } from 'src/app/models/requestResponseDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'product-request-card',
  templateUrl: './product-request-card.component.html',
  styleUrls: ['./product-request-card.component.css']
})
export class ProductRequestCardComponent {

@Input()
buyer:RequestResponseDTO;

constructor(private requestService: RequestService, private router:Router){

}


approveMethod(): void{
  console.log(this.buyer.requestId);

  this.requestService.changeStatusToApprove(this.buyer.requestId ).subscribe(
    response =>{
      console.log(response);
    }
  );
  this.router.navigateByUrl('/');


}

denyMethod(): void{

  this.requestService.changeStatusToDeny(this.buyer.requestId);

}

}
