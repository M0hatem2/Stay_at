import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';

export interface SubscriptionRequest {
  planId: string;
  billingCycle: 'monthly' | 'yearly';
  paymentMethod: 'card' | 'wallet';
  mobileNumber: string;
}

export interface SubscriptionResponse {
  URL: string;
}

export interface PaymentRequest {
  bookingId: string; // This is actually subscriptionId
  paymentMethod: 'card' | 'wallet' | 'bank';
  mobileNumber: string;
  currency: string;
  city: string;
  state: string;
  country: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentApiService {
  private baseUrl = environment.api.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  createSubscription(data: SubscriptionRequest): Observable<SubscriptionResponse> {
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<SubscriptionResponse>(`${this.baseUrl}/subscription`, data, { headers });
  }

  processPayment(data: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.baseUrl}/payment`, data);
  }
}
