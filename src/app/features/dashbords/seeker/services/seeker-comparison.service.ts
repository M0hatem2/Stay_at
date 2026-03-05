import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth.service';

export type SeekerComparisonType = 'sale' | 'rent';

export interface SeekerComparisonRequest {
  unit1Id: string;
  unit2Id: string;
  type: SeekerComparisonType;
}

export interface SeekerComparisonLocation {
  country: string;
  city: string;
  area: string;
  address: string;
}

export interface SeekerComparisonPricing {
  purpose: string;
  rentType?: string;
  price?: number;
  currency?: string;
}

export interface SeekerComparisonUnit {
  _id: string;
  title: string;
  unitType: string;
  unitArea: number;
  bedrooms: number;
  bathrooms: number;
  floorNumber: number;
  furnished: boolean;
  location: SeekerComparisonLocation;
  gallery: string[];
  pricing?: SeekerComparisonPricing;
}

export interface SeekerComparisonMetrics {
  rentPrice?: {
    unit1: number;
    unit2: number;
  };
  salePrice?: {
    unit1: number;
    unit2: number;
  };
  flexibilityScore?: {
    unit1: number;
    unit2: number;
  };
}

export interface SeekerComparisonScoring {
  unit1: number;
  unit2: number;
  winner: 'unit_1' | 'unit_2' | 'tie' | string;
}

export interface SeekerComparisonResult {
  metrics: SeekerComparisonMetrics;
  scoring: SeekerComparisonScoring;
}

export interface SeekerComparisonResponse {
  unit1: SeekerComparisonUnit;
  unit2: SeekerComparisonUnit;
  comparison: SeekerComparisonResult;
  confidence: number;
}

export interface PublicSearchItem {
  _id: string;
  targetId: string;
  targetType: string;
  title?: string;
  slug?: string;
  type?: string;
  purpose?: string;
  priceType?: string;
  displayPrice?: number;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
  floorNumber?: number;
  area?: number;
  furnished?: boolean;
  isTrusted?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  location?: {
    country?: string;
    city?: string;
    area?: string;
    address?: string;
  };
  thumbnail?: {
    secure_url?: string;
  };
}

export interface PublicSearchResponse {
  message: string;
  results: {
    data: PublicSearchItem[];
    pages: number;
    currentPage: string | number;
    totalItems: number;
    itemsPerPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SeekerComparisonService {
  private baseUrl = environment.api.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getUnitsAndProperties(limit: number = 200): Observable<PublicSearchResponse> {
    const params = new HttpParams().set('limit', limit.toString()).set('page', '1');

    return this.http.get<PublicSearchResponse>(`${this.baseUrl}/public/search/units-and-properties`, {
      params,
    });
  }

  compareUnits(body: SeekerComparisonRequest): Observable<SeekerComparisonResponse> {
    const token = this.authService.getAccessToken();
    const headers = token
      ? new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      : undefined;

    const params = new HttpParams()
      .set('unit1Id', body.unit1Id)
      .set('unit2Id', body.unit2Id)
      .set('type', body.type);

    return this.http.get<SeekerComparisonResponse>(`${this.baseUrl}/seeker/unit/compare`, {
      headers,
      params,
    });
  }
}
