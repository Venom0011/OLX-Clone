import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { register } from '../models/register';
import { token } from '../models/token';
import { user } from '../models/user';
import { login } from '../models/login';


const BASE_URL="http://localhost:8080"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  register(signUpRequest: register) {
    return this.http.post<register>(BASE_URL + "/user/signup", signUpRequest);
  }

  login(loginRequest: login) {
    console.log(loginRequest);
    return this.http.post(BASE_URL + "/user/login", loginRequest);
 
  }

  getUser(token:token) {
    return this.http.post<user>(BASE_URL + "/user/getByToken", token, {
      headers: this.createAuthorizationHeader()
    });
  }

  getToken() {
    const token = sessionStorage.getItem('jwt');
    return token!=null ? token: "no token found";
  }

  createAuthorizationHeader() {
    const jwtToken = sessionStorage.getItem("jwt");
    if (jwtToken) {
      console.log("jwt token", jwtToken);
      return new HttpHeaders().set(
        "Authorization","Bearer "+ jwtToken
      )
      
    }
    else {
      console.log("jwt not found");
      
    }
    return new HttpHeaders();
  }
}


