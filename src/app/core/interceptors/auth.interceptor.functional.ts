import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🚀 authInterceptor CALLED!', req.url);

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🔐 authInterceptor - intercept() called for:', req.url);

  // Get the token
  const token = authService.getAccessToken();
  console.log('🔑 Token from AuthService:', token ? 'EXISTS' : 'NULL');

  // Clone the request to add the authorization header if token exists
  let modifiedRequest = req;
  if (token) {
    console.log('🔑 Adding Authorization header with token');
    modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('✅ Request cloned with Authorization header');
  } else {
    console.log('⚠️ No token found, skipping Authorization header');
  }

  // Handle the request and catch 401 errors
  return next(modifiedRequest).pipe(
    catchError((error) => {
      console.error('❌ Interceptor caught error:', error.status);
      if (error.status === 401) {
        console.error('❌ 401 Unauthorized - redirecting to login');
        authService.clearTokens();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    }),
  );
};
