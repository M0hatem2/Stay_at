import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth.service';

export interface SeekerViewingOwner {
  name: string;
  phone: string;
}

export interface SeekerViewingRequester {
  name: string;
  phone: string;
  email: string;
}

export interface SeekerViewingItem {
  targetType: string;
  targetId: string;
  scheduledDate: string;
  timeSlot: string;
  notes: string;
  status: string;
  createdAt: string;
  owner: SeekerViewingOwner;
  viewingId: string;
  title: string;
  slug: string;
  image: string;
  location: string;
  requester: SeekerViewingRequester;
}

export interface SeekerViewingsResponse {
  viewings: SeekerViewingItem[];
}

@Injectable({
  providedIn: 'root',
})
export class SeekerViewingsService {
  private baseUrl = environment.api.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getViewings(): Observable<SeekerViewingsResponse> {
    const token = this.authService.getAccessToken();
    const headers = token
      ? new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      : undefined;

    return this.http.get<SeekerViewingsResponse>(`${this.baseUrl}/seeker/viewings`, { headers });
  }
}
