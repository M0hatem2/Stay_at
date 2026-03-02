import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-gray-900 mb-6">Amenities & Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for (amenity of amenities; track amenity) {
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-circle-check w-5 h-5 text-[#de5806] flex-shrink-0"></i>
            <span class="text-gray-700">{{ amenity }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class AmenitiesComponent {
  @Input() amenities: string[] = [
    'Olympic Swimming Pool',
    'Fully Equipped Gym',
    'Commercial Area',
    'Nursery & Schools',
    'Running & Cycling Tracks',
    'Gardens & Green Spaces',
    '24/7 Security',
    'Parking Spaces',
  ];
}
