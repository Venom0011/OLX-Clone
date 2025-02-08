import { Injectable } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router,private authService:AuthService) {}

  canActivate: CanActivateFn = (route, state) => {
    const isLoggedIn = JSON.parse(sessionStorage.getItem('user')); 
    if (isLoggedIn) {
      const role = route.data['roles'] as Array<string>;
      if (role) {
        if (role[0] === isLoggedIn.role) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    } 
      this.router.navigate(['/login']);
      return false;
    
  };
}