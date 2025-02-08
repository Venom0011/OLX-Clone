import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

   showAdminNavbarSubject = new BehaviorSubject<boolean>(false);
  showAdminNavbar$: Observable<boolean> =
    this.showAdminNavbarSubject.asObservable();

   showUserNavbarSubject = new BehaviorSubject<boolean>(false);
  showUserNavbar$: Observable<boolean> =
    this.showUserNavbarSubject.asObservable();


  // Public methods for managing navbar visibility
  showAdminNavbar() {
    this.showAdminNavbarSubject.next(true);
    this.showUserNavbarSubject.next(false);
  }

  showUserNavbar() {
    this.showAdminNavbarSubject.next(false);
    this.showUserNavbarSubject.next(true);
  }
  private sessionItems: any = {};

  public sessionItemSubject = new BehaviorSubject<any>({});
  sessionItems$ = this.sessionItemSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<Boolean>(true);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  public userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  public userIdSubject = new BehaviorSubject<number>(null);
  userId$ = this.userIdSubject.asObservable();

  constructor(private router: Router) {
    let userCart = sessionStorage.getItem('user');
    if (userCart) {
      this.sessionItems = JSON.parse(userCart);
      this.sessionItemSubject.next(this.sessionItems);
      this.userRoleSubject.next(this.sessionItems.role);
      this.userIdSubject.next(this.sessionItems.id);
      if (this.sessionItems.role === 'USER') {
        this.isLoggedInSubject.next(true);
      } else {
        this.isLoggedInSubject.next(false);
      }
    }
  }

  getSessionItems(): any[] {
    return this.sessionItems; //for getting all elements of cartItems.
  }

  // private updateSessionStorageAndNotify() {
  //   sessionStorage.setItem('user', JSON.stringify(this.sessionItems));
  //   this.sessionItemSubject.next(this.sessionItems);
  // }

  removeSessionItems(): void {
    sessionStorage.clear();
    this.sessionItemSubject.next({});
    this.userRoleSubject.next(null);
  }

  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }

  getUserId(): number | null {
    return this.userIdSubject.value;
  }

  logOut() {
    sessionStorage.clear();
    this.isLoggedInSubject.next(true);
    this.router.navigateByUrl('/login');
  }
}
