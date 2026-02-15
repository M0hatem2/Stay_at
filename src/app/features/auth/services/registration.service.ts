import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  message: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    role: string;
  };
  otp?: string;
}

export interface ConfirmEmailRequest {
  email: string;
  otp: string;
}

export interface ConfirmEmailResponse {
  message: string;
  messageToDev: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Sign up - Step 1
   */
  signUp(data: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.baseUrl}/auth/signup`, data);
  }

  /**
   * Confirm email - Step 2
   */
  confirmEmail(data: ConfirmEmailRequest): Observable<ConfirmEmailResponse> {
    return this.http.post<ConfirmEmailResponse>(`${this.baseUrl}/auth/confirm-email`, data);
  }

  /**
   * Complete broker profile
   */
  signUpBroker(data: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}/auth/signUp-broker`, data, { headers });
  }

  /**
   * Complete developer profile
   */
  signUpDeveloper(data: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}/auth/signUp-developer`, data, { headers });
  }

  /**
   * Complete owner profile
   */
  signUpOwner(data: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}/auth/signUp-owner`, data, { headers });
  }

  /**
   * Complete seeker profile
   */
  signUpSeeker(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/auth/signUp-seeker`, data, { headers });
  }

  /**
   * Complete system admin profile
   */
  signUpSystemAdmin(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/auth/signUp-system-admin`, data, { headers });
  }
}
