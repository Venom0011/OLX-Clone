import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserUpdateDTO } from '../models/userUpdateDTO';
import { UserDTO } from '../models/userDTO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private authService:AuthService) { }
  
  baseURL = "http://localhost:8080/user";

  getBuyerCount() {
    return this.http.get<number>(this.baseURL + '/getBuyerCount');
  }

  

  getRecentUser() {
    return this.http.get<user[]>(this.baseURL + "/recentUser", {
      headers: this.authService.createAuthorizationHeader()
    });
  }

  updateUser(userId: number, userUpdateDTO: UserUpdateDTO): Observable<any> {
    const url = `${this.baseURL}/${userId}`;
    return this.http.put<any>(url, userUpdateDTO)
      .pipe(
        tap(response => console.log('Update Response:', response)),
        catchError(this.handleError<any>('updateUser'))
      );
  }

  getUserById(userId: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseURL}/${userId}`)
      .pipe(
        tap(user => console.log('Fetched User:', user)),
        catchError(this.handleError<UserDTO>(`getByIdUser id=${userId}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
