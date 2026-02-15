import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../../core/services/language.service';

export interface SocialLink {
  icon: string;
  link: string;
  _id: string;
}

export interface QuickLink {
  title: string;
  url: string;
}

export interface Policy {
  label: string;
  url: string;
}

export interface ContactInfo {
  email: string;
  phoneNumber: string;
  address: string;
}

export interface Logo {
  public_id: string;
  secure_url: string;
}

export interface FooterData {
  _id: string;
  contactInfo: ContactInfo;
  logo: Logo;
  socialLinks: SocialLink[];
  title: string;
  description: string;
  copyright: string;
  quickLinks: QuickLink[];
  policies: Policy[];
}

export interface FooterResponse {
  footer: FooterData[];
}

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private baseUrl = environment.api.baseUrl;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  getFooterData(): Observable<FooterResponse> {
    const currentLanguage = this.languageService.getCurrentLanguage();
    
    // إضافة headers مباشرة في السيرفيس
    const headers = {
      'Accept-Language': currentLanguage,
      'Content-Language': currentLanguage,
      'X-Language': currentLanguage
    };

    console.log('🦶 FooterService - getFooterData() called with:');
    console.log('  - language:', currentLanguage);
    console.log('  - headers:', headers);
    
    return this.http.get<FooterResponse>(`${this.baseUrl}/footer`, { headers });
  }
}