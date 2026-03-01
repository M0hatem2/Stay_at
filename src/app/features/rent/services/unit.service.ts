import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LanguageService } from '../../../core/services/language.service';

export interface UnitLocation {
  country: string;
  city: string;
  area: string;
  address: string;
  coordinates: {
    type: string;
    coordinates: number[];
  };
}

export interface UnitMedia {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  original_filename: string;
  _id: string;
}

export interface ListingPrice {
  salePrice: number;
  rentPrice: number;
  rentPeriod: string;
  currency: string;
}

export interface PriceEvaluation {
  status: string;
  marketComparison: string;
  isGoodDeal: boolean;
}

export interface LocationEvaluation {
  rating: number;
  pros: string[];
  description: string;
}

export interface NearbyLandmark {
  name: string;
  type: string;
  distance: string;
}

export interface AIAnalysis {
  priceEvaluation: PriceEvaluation;
  locationEvaluation: LocationEvaluation;
  nearbyLandmarks: NearbyLandmark[];
  summary: string;
  lastUpdated: string;
}

export interface Unit {
  _id: string;
  propertyId: string;
  projectId: string;
  ownerType: string;
  ownerId: string;
  slug: string;
  unitNumber: string;
  purpose: string;
  location: UnitLocation;
  unitArea: number;
  bedrooms: number;
  bathrooms: number;
  floorNumber: number;
  furnished: boolean;
  maxGuests: number;
  listingPrice: ListingPrice;
  isFeatured: boolean;
  gallery: UnitMedia[];
  documents: UnitMedia[];
  aiAnalysis: AIAnalysis;
  status: string;
  title: string;
  description: string;
  unitType: string;
  facilitiesAndServices: string[];
  finalPricing?: {
    _id: string;
    targetType: string;
    targetId: string;
    purpose: string;
    rentType: string;
    price: number;
    tiers: Array<{
      minDays: number;
      pricePerDay: number;
      label: string;
      _id: string;
    }>;
    currency: string;
    isActive: boolean;
    createdBy: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    updatedBy?: string;
    deletedAt?: string;
    deletedBy?: string;
  };
  owner?: {
    type: string;
    name: string;
    role: string;
    contact: {
      phoneNumber: string;
      email: string;
    };
  };
}

export interface UnitFilters {
  propertyId?: string;
  projectId?: string;
  title?: string;
  unitType?: string; // Can be comma-separated values
  purpose?: string;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  guests?: number;
  rentPeriod?: string; // Can be comma-separated values
  priceFrom?: number;
  priceTo?: number;
  isVerified?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface UnitsResponse {
  message: string;
  units: {
    data: Unit[];
    pages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private baseUrl = environment.api.baseUrl;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  getUnits(filters: UnitFilters = {}): Observable<UnitsResponse> {
    const currentLanguage = this.languageService.getCurrentLanguage();
    
    let params = new HttpParams();
    
    // إضافة الفلاتر كـ query parameters
    Object.keys(filters).forEach(key => {
      const value = filters[key as keyof UnitFilters];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    // إضافة headers مباشرة في السيرفيس
    const headers = {
      'Accept-Language': currentLanguage,
      'Content-Language': currentLanguage,
      'X-Language': currentLanguage
    };

    console.log('🏠 UnitService - getUnits() called with:');
    console.log('  - filters:', filters);
    console.log('  - language:', currentLanguage);
    console.log('  - params:', params.toString());
    console.log('  - headers:', headers);
    
    return this.http.get<UnitsResponse>(`${this.baseUrl}/unit/rent`, { 
      params,
      headers 
    });
  }

  getUnitById(id: string): Observable<any> {
    const currentLanguage = this.languageService.getCurrentLanguage();
    
    const headers = {
      'Accept-Language': currentLanguage,
      'Content-Language': currentLanguage,
      'X-Language': currentLanguage
    };

    return this.http.get(`${this.baseUrl}/unit/${id}/rent`, { headers });
  }
}