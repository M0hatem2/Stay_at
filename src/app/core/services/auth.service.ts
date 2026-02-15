import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {}

  // Sign up with email confirmation
  signUp(userData: any): Observable<any> {
    // If userData is already FormData, use it directly
    if (userData instanceof FormData) {
      return this.http.post(`${this.baseUrl}/auth/signup`, userData);
    }
    // Otherwise, convert to FormData if it contains an attachment
    if (userData.attachment) {
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (key === 'attachment' && userData[key] instanceof File) {
          formData.append(key, userData[key]);
        } else if (userData[key] !== null && userData[key] !== undefined) {
          formData.append(key, String(userData[key]));
        }
      });
      return this.http.post(`${this.baseUrl}/auth/signup`, formData);
    }
    // Standard JSON request
    return this.http.post(`${this.baseUrl}/auth/signup`, userData);
  }

  // Resend OTP for email confirmation
  resendOTP(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/resendOTP`, { email });
  }

  // Confirm email with OTP
  confirmEmail(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/confirmEmail`, { email, otp });
  }

  // Sign in
  signIn(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signIn`, credentials);
  }

  // Forgot password
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forgotPassword`, { email });
  }

  // Reset password with OTP
  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/resetPassword`, {
      email,
      otp,
      newPassword,
    });
  }

  // Refresh token
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/refreshToken`, { refreshToken });
  }

  // Logout
  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(`${this.baseUrl}/auth/logout`, { refreshToken });
  }

  // Token management methods
  getToken(): string | null {
    return this.getAccessToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getRole(): string | null {
    const token = this.getAccessToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
}
