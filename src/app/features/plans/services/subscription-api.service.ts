import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface SubscriptionRequest {
  planId: string;
  billingCycle: 'monthly' | 'yearly';
}

export interface SubscriptionResponse {
  subscription: {
    userId: string;
    planId: string;
    status: string;
    billingCycle: string;
    _id: string;
    planFeatures: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionApiService {
  private baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {}

  createSubscription(data: SubscriptionRequest): Observable<SubscriptionResponse> {
    return this.http.post<SubscriptionResponse>(`${this.baseUrl}/subscription`, data);
  }
}
