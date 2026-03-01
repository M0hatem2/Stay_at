import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

export interface PlanFeature {
  name: string;
  value: number;
  isEnabled: boolean;
}

export interface Plan {
  _id: string;
  category: string;
  basePrice: number;
  isPopular: boolean;
  yearlyDiscountPercentage: number;
  isActive: boolean;
  yearlyPrice: number;
  title: string;
  features: PlanFeature[];
}

export interface PlansResponse {
  results: number;
  plans: Plan[];
}

@Injectable({
  providedIn: 'root',
})
export class PlansApiService {
  private readonly baseUrl = environment.api.baseUrl;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
  ) {}

  getAllPlans(): Observable<PlansResponse> {
    const currentLanguage = this.languageService.getCurrentLanguage();

    // إضافة headers مباشرة في السيرفيس
    const headers = {
      'Accept-Language': currentLanguage,
      'Content-Language': currentLanguage,
      'X-Language': currentLanguage,
    };

    console.log('📋 PlansApiService - getAllPlans() called with:');
    console.log('  - language:', currentLanguage);
    console.log('  - headers:', headers);

    return this.http.get<PlansResponse>(`${this.baseUrl}/plan/public/all`, {
      headers,
    });
  }
}
