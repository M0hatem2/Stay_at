import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth.service';

export interface SeekerFavoriteItem {
  createdAt: string;
  favoriteId: string;
  type: string;
  itemId: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  currency: string;
  priceType: string;
  location: string;
  isFeatured: boolean;
  isTrusted: boolean;
}

export interface SeekerFavoritesResponse {
  success: boolean;
  results: number;
  data: SeekerFavoriteItem[];
}

@Injectable({
  providedIn: 'root',
})
export class SeekerFavoritesService {
  private baseUrl = environment.api.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getFavorites(): Observable<SeekerFavoritesResponse> {
    const token = this.authService.getAccessToken();
    const headers = token
      ? new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      : undefined;

    return this.http.get<SeekerFavoritesResponse>(`${this.baseUrl}/seeker/favorites`, { headers });
  }
}

