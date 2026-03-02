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
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🔐 AuthInterceptor - intercept() called for:', request.url);

    // Clone the request to add headers
    let modifiedRequest = request;

    // Add authorization header with JWT accessToken if available
    if (isPlatformBrowser(this.platformId)) {
      const token = this.authService.getAccessToken();
      if (token) {
        console.log('🔑 Adding Authorization header with token');
        modifiedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        console.log('⚠️ No token found, skipping Authorization header');
      }
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('❌ 401 Unauthorized - redirecting to login');
          // Handle unauthorized access
          this.authService.clearTokens();
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      }),
    );
  }
}
