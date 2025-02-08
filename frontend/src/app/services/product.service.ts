import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductDTO } from '../models/productDTO';
import { user } from '../models/user';
import { OwnerDetails } from '../models/ownerDetails';
import { Product } from '../models/product';
import { ProductResponse } from '../models/productResponse';
 
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/product'; // Replace with your backend base URL

  constructor(private http: HttpClient) {}

  addProduct(
    categoryName: string,
    userId: number,
    productDTO: ProductDTO,
    file: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('image', file, file.name);
    formData.append('productName', productDTO.productName);

    formData.append('description', productDTO.description);

    formData.append('addedDate', productDTO.addedDate);
    formData.append('price', productDTO.price.toString());

    return this.http.post<any>(`${this.baseUrl}/${userId}`, formData);
  }

  setBuyerDetails(email: string, productId: number): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/buyproduct/${email}/${productId}`, {})
      .pipe(catchError(this.handleError));
  }

  listAllProducts(pageNumber = 1): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}?pageNumber=${pageNumber}`)
      .pipe(catchError(this.handleError));
  }

  getSellerCount() {
    return this.http.get<number>(this.baseUrl + '/getSellerCount');
  } 

  getSellerData(id: number) {
    return this.http.get<user>(this.baseUrl + '/getSeller/' + id);
  }

  getActiveProducts(pageNumber = 1): Observable<any> {
    return this.http
      .get<ProductResponse>(
        `${this.baseUrl}/activeproducts?pageNumber=${pageNumber}`
      )
      .pipe(catchError(this.handleError));
  }

  contactSeller(sellerId: number, productId: number) {
    return this.http.get(
      `${this.baseUrl}/contactSeller/${sellerId}/${productId}`
    );
  }

  updateProduct(
    productId: number,
    productDTO: any,
    file: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('productName', productDTO.productName);
    formData.append('description', productDTO.description);
    formData.append('price', productDTO.price);
    formData.append('addedDate', productDTO.addedDate);
    if (file) {
      formData.append('file', file);
    }

    return this.http.put<any>(`${this.baseUrl}/${productId}`, formData, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    });
  }

  // getProducts(userId:number): Observable<any>{
  //   return this.http.get<any>(`${this.baseUrl}/getproducts/${userId}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  getProductsByUserId(userId: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/getproductsbyuserId/${userId}`)
      .pipe(catchError(this.handleError));
  }

  getProductsByCategory(categoryName: string,pageNumber=1): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/getproductbycategory/${categoryName}?pageNumber=${pageNumber}`)
      .pipe(catchError(this.handleError));
  }

  findProductById(productId: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/${productId}`)
      .pipe(catchError(this.handleError));
  }

  buyProduct(userId: number, productId: number): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/buyproduct/${userId}/${productId}`, {})
      .pipe(catchError(this.handleError));
  }

  getSoldProductList(userId: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/getUserSoldProducts/${userId}`)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/${productId}`)
      .pipe(catchError(this.handleError));
  }

  getProductDetailsByProductId(productId: number): Observable<OwnerDetails> {
    return this.http
      .get<OwnerDetails>(
        `${this.baseUrl}/getProductDetailsByProductId/${productId}`
      )
      .pipe(catchError(this.handleError));
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