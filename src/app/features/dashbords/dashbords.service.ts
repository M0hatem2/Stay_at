import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  pendingProperties: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalClients: number;
  newRequests: number;
}

export interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  area: number;
  rooms: number;
  status: 'active' | 'pending' | 'inactive';
  location: string;
  image?: string;
}

export interface Project {
  id: number;
  name: string;
  location: string;
  totalUnits: number;
  soldUnits: number;
  availableUnits: number;
  completionPercentage: number;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashbordsService {
  private apiUrl = 'api/dashboard';

  constructor(private http: HttpClient) {}

  // Broker Dashboard Methods
  getBrokerStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/broker/stats`);
  }

  getBrokerProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/broker/properties`);
  }

  getBrokerClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/broker/clients`);
  }

  getBrokerRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/broker/requests`);
  }

  // Developer Dashboard Methods
  getDeveloperStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/developer/stats`);
  }

  getDeveloperProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/developer/projects`);
  }

  getDeveloperUnits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/developer/units`);
  }

  // Owner Dashboard Methods
  getOwnerStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/owner/stats`);
  }

  getOwnerProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/owner/properties`);
  }

  getOwnerRentals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/owner/rentals`);
  }

  // Seeker Dashboard Methods
  searchProperties(filters: any): Observable<Property[]> {
    return this.http.post<Property[]>(`${this.apiUrl}/seeker/search`, filters);
  }

  getFavoriteProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/seeker/favorites`);
  }

  addToFavorites(propertyId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/seeker/favorites/${propertyId}`, {});
  }

  removeFromFavorites(propertyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/seeker/favorites/${propertyId}`);
  }

  // Common Methods
  getPropertyDetails(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/properties/${id}`);
  }

  updatePropertyStatus(id: number, status: string): Observable<Property> {
    return this.http.patch<Property>(`${this.apiUrl}/properties/${id}/status`, { status });
  }
}
