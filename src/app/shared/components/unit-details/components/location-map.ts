import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMap } from '../../google-map/google-map';

interface NearbyLandmark {
  name: string;
  type: string;
  distance: string;
}

@Component({
  selector: 'app-location-map',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, GoogleMap],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-gray-900">Location</h2>
        <button
          class="flex items-center gap-2 text-[#808080] hover:text-black text-sm transition-colors"
        >
          <i class="fa-solid fa-diamond-turn-right w-4 h-4"></i>Get Directions
        </button>
      </div>
      <div class="relative h-80 bg-gray-100 rounded-xl overflow-hidden mb-4">
        <app-google-map
          [latitude]="latitude"
          [longitude]="longitude"
          [propertyName]="propertyName || 'موقع العقار'"
          [propertyAddress]="fullAddress"
          [propertyImage]="propertyImage || ''"
        ></app-google-map>
      </div>
      <div>
        <h3 class="text-gray-900 mb-3">Nearby Places</h3>
        @if (nearbyLandmarks && nearbyLandmarks.length) {
          <div class="space-y-2">
            @for (landmark of nearbyLandmarks; track landmark.name) {
              <div class="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <i class="fa-solid fa-map-marker-alt w-4 h-4 text-[#808080]"></i>
                  <div>
                    <div class="text-gray-900 text-sm">{{ landmark.name }}</div>
                    <div class="text-gray-500 text-xs">{{ landmark.type }}</div>
                  </div>
                </div>
                <div class="text-gray-600 text-sm">{{ landmark.distance }}</div>
              </div>
            }
          </div>
        } @else {
          <div class="space-y-2">
            <div class="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-map-marker-alt w-4 h-4 text-[#808080]"></i>
                <div>
                  <div class="text-gray-900 text-sm">Cairo Festival City</div>
                  <div class="text-gray-500 text-xs">Mall</div>
                </div>
              </div>
              <div class="text-gray-600 text-sm">2 km</div>
            </div>
            <div class="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-map-marker-alt w-4 h-4 text-[#808080]"></i>
                <div>
                  <div class="text-gray-900 text-sm">American University</div>
                  <div class="text-gray-500 text-xs">University</div>
                </div>
              </div>
              <div class="text-gray-600 text-sm">3.5 km</div>
            </div>
            <div class="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-map-marker-alt w-4 h-4 text-[#808080]"></i>
                <div>
                  <div class="text-gray-900 text-sm">El Salam Hospital</div>
                  <div class="text-gray-500 text-xs">Hospital</div>
                </div>
              </div>
              <div class="text-gray-600 text-sm">1.5 km</div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class LocationMapComponent {
  @Input() nearbyLandmarks?: NearbyLandmark[];
  @Input() coordinates: string = 'Lat: 30.0444, Lng: 31.2357';
  @Input() locationAddress?: string;
  @Input() locationArea?: string;
  @Input() locationCity?: string;
  @Input() locationCountry?: string;
  @Input() latitude: number = 30.0444;
  @Input() longitude: number = 31.2357;
  @Input() propertyName?: string;
  @Input() propertyImage?: string;

  get fullAddress(): string {
    const parts = [
      this.locationAddress,
      this.locationArea,
      this.locationCity,
      this.locationCountry,
    ].filter(Boolean);
    return parts.join(', ');
  }
}
