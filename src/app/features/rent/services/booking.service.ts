import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';

export interface CreateBookingRequest {
  unitId: string;
  paymentMethod: 'card' | 'wallet';
  name: string;
  email: string;
  mobileNumber: string;
  numberOfGuests: number;
  arrivalDate: string;
  departureDate: string;
  rentalType: 'daily' | 'weekly' | 'monthly' | 'yearly';
  currency: string;
  city: string;
  state: string;
  country: string;
}

export interface CreateBookingResponse {
  URL: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = environment.api.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  createBooking(payload: CreateBookingRequest): Observable<CreateBookingResponse> {
    console.log('🎯 BookingService - Sending Booking Request');
    console.log('📦 Payload to API:', JSON.stringify(payload, null, 2));
    console.log('🔑 Auth Token Available:', !!this.authService.getAccessToken());
    console.log('🌐 API Endpoint:', `${this.baseUrl}/booking`);
    
    const token = this.authService.getAccessToken();
    const headers = token
      ? new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        })
      : new HttpHeaders({
          'Content-Type': 'application/json',
        });

    console.log('📋 Request Headers:', {
      'Authorization': token ? `Bearer ${token.substring(0, 20)}...` : 'No token',
      'Content-Type': 'application/json'
    });

    return this.http.post<CreateBookingResponse>(`${this.baseUrl}/booking`, payload, { headers });
  }
}
