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
    
    // Get the LANGUAGE_KEY header from translation service
     

    

    // Add authorization header with JWT accessToken if available
   

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized access
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        return throwError(error);
      }),
    );
  }
}
