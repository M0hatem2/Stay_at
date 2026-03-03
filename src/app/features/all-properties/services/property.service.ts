import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LanguageService } from '../../../core/services/language.service';

export interface PropertyLocation {
  country: string;
  city: string;
  area: string;
  address: string;
  coordinates: {
    type: string;
    coordinates: number[];
  };
}

export interface PropertyMedia {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  original_filename: string;
  _id: string;
}

export interface Property {
  _id: string;
  slug: string;
  status: string;
  ownerType: string;
  ownerId: string;
  projectId: string;
  location: PropertyLocation;
  isFeatured: boolean;
  gallery: PropertyMedia[];
  documents: PropertyMedia[];
  floorsCount: number;
  name: string;
  description: string;
  type: string;
  facilitiesAndServices: string[];
}

export interface PropertyResponse {
  message: string;
  results: {
    data: Property[];
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
export class PropertyService {
  private baseUrl = environment.api.baseUrl;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
  ) {}

  getProperties(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Observable<PropertyResponse> {
    const currentLanguage = this.languageService.getCurrentLanguage();

    // إضافة headers مباشرة في السيرفيس كبديل
    const headers = {
      'Accept-Language': currentLanguage,
      'Content-Language': currentLanguage,
      'X-Language': currentLanguage,
    };

    // If search query exists, use search endpoint
    if (search && search.trim()) {
 
      const searchBody = {
        query: search.trim(),
        page,
        limit,
      };

      return this.http.post<PropertyResponse>(`${this.baseUrl}/property/search`, searchBody, {
        headers,
      });
    }

    // Otherwise use regular get endpoint
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
 

    return this.http.get<PropertyResponse>(`${this.baseUrl}/public/search/units-and-properties`, {
      params,
      headers,
    });
  }

  getPropertyById(id: string): Observable<any> {
    const currentLanguage = this.languageService.getCurrentLanguage();

    const headers = {
      'Accept-Language': currentLanguage,
      'Content-Language': currentLanguage,
      'X-Language': currentLanguage,
    };
 
    return this.http.get(`${this.baseUrl}/property/${id}`, { headers });
  }

  searchProperties(filters: any): Observable<PropertyResponse> {
    return this.http.post<PropertyResponse>(`${this.baseUrl}/property/search`, filters);
  }
}
