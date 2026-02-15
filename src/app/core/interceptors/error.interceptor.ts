import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(environment.api.retryAttempts || 1), // Retry failed requests
      catchError((error: HttpErrorResponse) => {
        if (environment.features.enableLogging) {
          console.error('HTTP Error:', {
            url: error.url,
            status: error.status,
            message: error.message,
            error: error.error
          });
        }

        let errorMessage = 'An unexpected error occurred';
        
        switch (error.status) {
          case 0:
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          case 400:
            errorMessage = error.error?.message || 'Bad request. Please check your input.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please log in again.';
            break;
          case 403:
            errorMessage = 'Access forbidden. You don\'t have permission to perform this action.';
            break;
          case 404:
            errorMessage = 'The requested resource was not found.';
            break;
          case 422:
            errorMessage = error.error?.message || 'Validation error. Please check your input.';
            break;
          case 429:
            errorMessage = 'Too many requests. Please try again later.';
            break;
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            break;
          case 502:
            errorMessage = 'Bad gateway. The server is temporarily unavailable.';
            break;
          case 503:
            errorMessage = 'Service unavailable. Please try again later.';
            break;
          default:
            if (error.error?.message) {
              errorMessage = error.error.message;
            }
        }

        return throwError(() => ({
          success: false,
          message: errorMessage,
          status: error.status,
          errors: error.error?.errors || {},
          originalError: error
        }));
      })
    );
  }
}