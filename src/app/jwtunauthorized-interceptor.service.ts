import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JWTUnauthorizedInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          // debugger;
          // Auto logout on invalid/expired token
          this.loginService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }
}
