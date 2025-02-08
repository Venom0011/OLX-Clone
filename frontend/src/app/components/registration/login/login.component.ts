import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from 'src/app/models/login';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { token } from 'src/app/models/token';
import { SessionService } from 'src/app/services/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
    private toastr: ToastrService
  ) {}
  user: user | null = null;
  ngOnInit(): void {}

  login(data: login) {
    this.authService.login(data).subscribe({
      next: (result: any) => {
        if (result.jwtToken != null) {
          sessionStorage.setItem('jwt', result.jwtToken);
          this.getUserByToken(result);
        }
      },
      error: (error: any) => {
          this.toastr.error("Invalid Credentails");
      },
    });
  }

  getUserByToken(token: token) {
    this.authService.getUser(token).subscribe((result: any) => {
      if (result != null) {
        this.user = result;
        sessionStorage.setItem('user', JSON.stringify(this?.user));
        this.sessionService.userRoleSubject.next(result.role); //setting the role in the userRoleSubject
        this.sessionService.userIdSubject.next(result.id); //setting the id in the userIdSubject
        this.sessionService.sessionItemSubject.next(result);
        if (result.role === 'ADMIN') {
          this.router.navigateByUrl('/admin'); //if role is admin then navigate to the admin's home
        } else if (result.role === 'USER') {
          this.toastr.success('Login Success');
           this.router.navigateByUrl(''); 
        }
      }
    });
  }
}
