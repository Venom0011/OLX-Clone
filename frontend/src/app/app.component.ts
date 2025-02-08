import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from './services/session.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OLX';

  showNavbar: Boolean = false;
  showProductsContainer: boolean = true;

 
  constructor(private router: Router,private logoutService:SessionService)
    {
      this.logoutService.isLoggedIn$.subscribe(
        (show) => (this.showNavbar = show)
      );

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.showProductsContainer =
            event.url === '/' || event.url === '/categories';
        }
        if (event instanceof NavigationEnd) {
          if (
            event.url == '/admin' ||
            event.url == '/admin-product' ||
            event.url == '/addCategory' ||
            event.url == '/adminCategory'
          ) {
            this.showNavbar = false;
          }
        }
      });
    }
  }

