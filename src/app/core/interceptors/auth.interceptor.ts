import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let modifiedRequest = request;

    if (isPlatformBrowser(this.platformId)) {

      const token = this.authService.getAccessToken();

      // لو التوكن موجود
      if (token) {

        // تحقق هل التوكن منتهي
        if (this.authService.isTokenExpired(token)) {

          this.authService.clearTokens();
          this.router.navigate(['/auth/login']);
          return throwError(() => new Error('Token expired'));
        }

        modifiedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {

          this.authService.clearTokens();
          this.router.navigate(['/auth/login']);
        }

        return throwError(() => error);
      })
    );
  }
}