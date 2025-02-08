import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent {
  constructor(private sharedService: SessionService) {}

  signOut = faSignOut;
  userName=''
  logout() {
    this.sharedService.logOut();
  }

  ngOnInit() {
    this.userName=JSON.parse(sessionStorage.getItem('user')).firstName
  }
}
