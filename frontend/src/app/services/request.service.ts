import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, from, Observable, throwError } from 'rxjs';
import { RequestDTO } from '../models/requestDTO';
import { UserRespDTO } from '../models/userRespDTO';
import { RequestResponseDTO } from '../models/requestResponseDTO';
  // Adjust the import path based on your file structure

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:8080/request';  // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  // Method to add a request
  addRequestForProduct(requestDTO: RequestDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl, requestDTO);
  }

  // Method to approve a request
  changeStatusToApprove(requestId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/approve/${requestId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Method to deny a request
  changeStatusToDeny(requestId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/deny/${requestId}`, {});
  }

  // Method to get all requests of a seller
  getAllRequestOfSeller(sellerId: number): Observable<UserRespDTO[]> {
    return this.http.get<UserRespDTO[]>(`${this.baseUrl}/getAllRequestOfSeller/${sellerId}`);
  }

  // Method to get product requests
  getProductRequest(sellerId: number, productId: number): Observable<RequestResponseDTO[]> {
    return this.http.get<RequestResponseDTO[]>(`${this.baseUrl}/getProductRequest/${sellerId}/${productId}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
