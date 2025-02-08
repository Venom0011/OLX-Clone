import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { SessionService } from 'src/app/services/session.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchText: string = '';

  private userSubscription: Subscription = new Subscription();
  isUser: boolean;
  loggedIn: boolean;
  route: string;
  signOut = faSignOutAlt;
  user = faUser;
  caretDown = faCaretDown;

  loggedInUser: string = '';

  constructor(
    private searchService: SearchService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.getLoggedUser();
  }
  
  logout() {
    this.sessionService.logOut();
    this.isUser = false;
    this.loggedIn = false;
  }

  checkUserRole(): void {
    //const userRole = this.sessionService.getUserRole();

    this.userSubscription = this.sessionService.userRole$.subscribe(
      (userRole) => {
        if (userRole === 'USER') {
          this.isUser = true;
          this.loggedIn = true;
          this.route = 'user-home';
        }
      }
    );
  }

  logOut(): void {
    this.sessionService.removeSessionItems();
    
  }

  updateSearch(event: any): void {
    this.searchText = event.target.value;
    this.searchService.setSearchText(this.searchText);
  }

  getLoggedUser() {
    this.sessionService.sessionItems$.subscribe((result) => {
      const user = result;
      console.log(user.firstName);
      if (user != null) {
        this.loggedInUser = user.firstName;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
