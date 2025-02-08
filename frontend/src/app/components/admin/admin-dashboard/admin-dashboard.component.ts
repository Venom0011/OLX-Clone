import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { user } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  @ViewChild('sidebar', { static: false }) sidebar?: ElementRef<HTMLElement>;
  @ViewChild('sidebarOverlay', { static: false })
  sidebarOverlay?: ElementRef<HTMLElement>;

  handshake = faHandshake;
  cart = faCartPlus;
  buyer = faHandHoldingDollar;

  buyerCount = 0;
  sellerCount = 0;
  productCount = 0;
  recentUser: user[] = [];

  constructor(
    private userService: UserService,
    private productService: ProductService,
  ) {}
  ngOnInit() {
    this.loadCount();
    this.loadRecentUser();
  }

  loadCount() {
    this.userService.getBuyerCount().subscribe((result) => {
      this.buyerCount = result;
    });

    this.productService.getSellerCount().subscribe((result) => {
      this.sellerCount = result;
    });

    this.productService.listAllProducts().subscribe((result) => {
      this.productCount = result.length;
    });
  }

  loadRecentUser() {
    this.userService.getRecentUser().subscribe((result) => {
      this.recentUser = result;
      console.log(this.recentUser);
    });
  }

  
}
