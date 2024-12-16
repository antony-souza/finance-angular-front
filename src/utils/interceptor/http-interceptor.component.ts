import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        const token = localStorage.getItem('token');

        if (token) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(authReq).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        if(confirm('Sua sessão expirou. Você precisa fazer login novamente!')) 
                        this.router.navigate(['/']);
                    }
                    return throwError(() =>{
                        new Error(error.message);
                    });
                })
            );
        }

        return next.handle(req);
    }
}
