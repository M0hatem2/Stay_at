import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetails } from '../../../../core/models/property-details.model';

type NearbyPlace = PropertyDetails['nearby_places'][number];

@Component({
  selector: 'app-nearby-places',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="flex items-center gap-2 mb-6">
        <i class="fa-solid fa-map-marker-alt w-5 h-5 text-[#de5806]"></i>
        <h2 class="text-gray-900">Nearby Places</h2>
      </div>
      @if (places.length) {
        <div class="space-y-3">
          @for (place of places; track place.name + place.type + place.distance_km) {
            <div
              class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-[#de5806]/10 rounded-lg flex items-center justify-center">
                  <i [class]="getTypeIcon(place.type) + ' w-5 h-5 text-[#de5806]'"></i>
                </div>
                <div>
                  <div class="text-gray-900">{{ valueOrDefault(place.name, 'Nearby place') }}</div>
                  <div class="text-sm text-gray-500">{{ valueOrDefault(place.type) }}</div>
                </div>
              </div>
              <div class="text-left">
                <div class="text-gray-900">{{ formatDistance(place.distance_km) }}</div>
                <div class="text-sm text-gray-500">{{ valueOrDefault(place.travel_time, 'N/A') }}</div>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
          Nearby places are not available for this unit yet.
        </div>
      }
    </div>
  `,
})
export class NearbyPlacesComponent {
  @Input() places: NearbyPlace[] = [];

  valueOrDefault(value: unknown, fallback: string = 'N/A'): string {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    return text ? text : fallback;
  }

  formatDistance(distance: unknown): string {
    if (typeof distance === 'number' && distance > 0) {
      return `${distance} km`;
    }
    return 'N/A';
  }

  getTypeIcon(type: string): string {
    const normalized = (type || '').toLowerCase();
    if (normalized.includes('school') || normalized.includes('university')) return 'fa-solid fa-school';
    if (normalized.includes('hospital') || normalized.includes('clinic')) return 'fa-solid fa-hospital';
    if (normalized.includes('park') || normalized.includes('nature')) return 'fa-solid fa-tree';
    if (normalized.includes('metro') || normalized.includes('station')) return 'fa-solid fa-train-subway';
    if (normalized.includes('mall') || normalized.includes('shop')) return 'fa-solid fa-store';
    return 'fa-solid fa-location-dot';
  }
}
