import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
    providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService:AuthService,private router:Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get("No-Auth") === 'True') {
            return next.handle(req.clone());
        }

        const token = this.authService.getToken();
        this.addToken(req, token);
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log(err);
                if (err.status == 401) {
                    this.router.navigateByUrl('/login');
                } else if (err.status == 403) {
                    this.router.navigateByUrl('/forbidden');
                }
                return throwError("Some thing went wrong");
            })
        );
    }


    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone(
            {
                setHeaders: {
                    Authorization:`Bearer ${token}`
                }
            }
        );
    }
}