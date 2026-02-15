import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly defaultTimeout = environment.api.timeout;
  private readonly retryAttempts = environment.api.retryAttempts;

  constructor(private http: HttpClient) {
    if (environment.features.enableLogging) {
      console.log('ApiService initialized with baseUrl:', this.baseUrl);
    }
  }

  /**
   * POST request with FormData support
   */
  postFormData<T>(endpoint: string, formData: FormData, timeoutMs?: number): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;

    if (environment.features.enableLogging) {
      console.log('Sending FormData to:', url);
    }

    return this.http
      .post<T>(url, formData)
      .pipe(timeout(timeoutMs || this.defaultTimeout), catchError(this.handleError.bind(this)));
  }

  /**
   * GET request
   */
  get<T>(endpoint: string, timeoutMs?: number): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;

    return this.http
      .get<T>(url)
      .pipe(
        timeout(timeoutMs || this.defaultTimeout),
        retry(this.retryAttempts),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * POST request with JSON data
   */
  post<T>(endpoint: string, data: any, timeoutMs?: number): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;

    return this.http
      .post<T>(url, data)
      .pipe(
        timeout(timeoutMs || this.defaultTimeout),
        retry(this.retryAttempts),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unexpected error occurred';

    if (error.name === 'TimeoutError') {
      errorMessage = 'Request timeout. Please check your connection and try again.';
    } else if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 0:
          errorMessage = 'Network error. Please check your internet connection.';
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
    }

    if (environment.features.enableLogging) {
      console.error('API Error:', {
        name: error.name,
        status: error.status,
        message: error.message,
        url: error.url,
        error: error.error,
      });
    }

    return throwError(() => ({
      success: false,
      message: errorMessage,
      status: error.status || 0,
      errors: error.error?.errors || {},
    }));
  }

  /**
   * Get the full API URL for debugging
   */
  getApiUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  /**
   * Get base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
