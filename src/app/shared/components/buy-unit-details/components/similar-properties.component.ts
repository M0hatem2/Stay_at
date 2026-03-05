import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetails } from '../../../../core/models/property-details.model';

type SimilarProperty = PropertyDetails['similar_properties'][number];

@Component({
  selector: 'app-similar-properties',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-gray-900 mb-6">Similar Properties</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        @if (similarProperties.length) {
          @for (property of similarProperties; track property.title + property.price) {
            <div class="group cursor-pointer">
              <div class="relative h-48 rounded-xl overflow-hidden mb-3">
                <img
                  [src]="property.image || fallbackImage"
                  [alt]="property.title || 'Similar property'"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 class="text-gray-900 text-sm mb-2 line-clamp-2">
                {{ valueOrDefault(property.title, 'Similar property') }}
              </h3>
              <div class="flex items-center justify-between mb-2">
                <div class="text-[#de5806] font-semibold">{{ valueOrDefault(property.price, 'N/A') }}</div>
                <div class="text-sm text-gray-500">{{ valueOrDefault(property.price_per_sqm, 'N/A') }}</div>
              </div>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <div class="flex items-center gap-1">
                  <i class="fa-solid fa-bed w-4 h-4"></i><span>{{ valueOrDefault(property.bedrooms) }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fa-solid fa-bath w-4 h-4"></i><span>{{ valueOrDefault(property.bathrooms) }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fa-solid fa-maximize w-4 h-4"></i><span>{{ valueOrDefault(property.area_sqm) }}</span>
                </div>
              </div>
            </div>
          }
        } @else {
          @for (card of [1, 2, 3]; track card) {
            <div class="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
              <div class="h-32 rounded-lg bg-gray-200 mb-3"></div>
              <h3 class="text-sm text-gray-800 mb-2">No similar property data yet</h3>
              <p class="text-xs text-gray-600">
                Similar units will appear here when listing data becomes available.
              </p>
            </div>
          }
        }
      </div>
    </div>
  `,
})
export class SimilarPropertiesComponent {
  readonly fallbackImage =
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop';

  @Input() similarProperties: SimilarProperty[] = [];

  valueOrDefault(value: unknown, fallback: string = 'N/A'): string {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    return text ? text : fallback;
  }
}
