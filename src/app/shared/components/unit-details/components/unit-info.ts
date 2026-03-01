import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl my-5 p-4 sm:p-6 shadow-sm">
      <h1 class="text-lg sm:text-xl lg:text-2xl text-gray-900 mb-3 sm:mb-4">
        {{ title }}
      </h1>
      <div class="flex items-center gap-1 text-gray-600 mb-4 sm:mb-6">
        <i class="fa-solid fa-map-marker-alt w-4 h-4 sm:w-5 sm:h-5"></i>
        <span class="text-sm sm:text-base">{{ location }}</span>
      </div>
      
      <!-- Main Stats -->
      <div
        class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-gray-200"
      >
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <i class="fa-solid fa-bed w-4 h-4 sm:w-5 sm:h-5 text-[#808080]"></i>
            <span class="text-gray-500 text-xs sm:text-sm">Bedrooms</span>
          </div>
          <div class="text-gray-900 text-sm sm:text-base">{{ bedrooms }}</div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <i class="fa-solid fa-bath w-4 h-4 sm:w-5 sm:h-5 text-[#808080]"></i>
            <span class="text-gray-500 text-xs sm:text-sm">Bathrooms</span>
          </div>
          <div class="text-gray-900 text-sm sm:text-base">{{ bathrooms }}</div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <i class="fa-solid fa-maximize w-4 h-4 sm:w-5 sm:h-5 text-[#808080]"></i>
            <span class="text-gray-500 text-xs sm:text-sm">Area</span>
          </div>
          <div class="text-gray-900 text-sm sm:text-base">{{ area }}</div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <i class="fa-solid fa-star w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"></i>
            <span class="text-gray-500 text-xs sm:text-sm">Rating</span>
          </div>
          <div class="text-gray-900 text-sm sm:text-base">
            {{ rating }} ({{ reviews }})
          </div>
        </div>
      </div>
      
      <!-- Additional Details -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 sm:py-6 border-b border-gray-200">
        <div>
          <div class="text-gray-500 text-xs sm:text-sm mb-1">Floor</div>
          <div class="text-gray-900 text-sm sm:text-base">{{ floor }}</div>
        </div>
        <div>
          <div class="text-gray-500 text-xs sm:text-sm mb-1">Furnished</div>
          <div class="text-gray-900 text-sm sm:text-base">
            {{ furnished ? 'Yes' : 'No' }}
          </div>
        </div>
        <div *ngIf="yearBuilt">
          <div class="text-gray-500 text-xs sm:text-sm mb-1">Year Built</div>
          <div class="text-gray-900 text-sm sm:text-base">{{ yearBuilt }}</div>
        </div>
      </div>
      
      <!-- Description -->
      <div class="py-4 sm:py-6 border-b border-gray-200">
        <h2 class="text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Description</h2>
        <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
          {{ description }}
        </p>
      </div>
      
      <!-- Amenities -->
      <div class="py-4 sm:py-6">
        <h2 class="text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Amenities</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <div
            *ngFor="let amenity of amenities"
            class="flex items-center gap-2"
          >
            <i class="fa-solid fa-check-circle w-4 h-4 sm:w-5 sm:h-5 text-green-600"></i>
            <span class="text-gray-700 text-sm sm:text-base">{{ amenity }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UnitInfoComponent {
  @Input() title: string = '';
  @Input() location: string = '';
  @Input() bedrooms: number = 0;
  @Input() bathrooms: number = 0;
  @Input() area: string = '';
  @Input() rating: number = 0;
  @Input() reviews: number = 0;
  @Input() floor: number | string = '';
  @Input() furnished: boolean = false;
  @Input() yearBuilt: number | null = null;
  @Input() description: string = '';
  @Input() amenities: string[] = [];
}
