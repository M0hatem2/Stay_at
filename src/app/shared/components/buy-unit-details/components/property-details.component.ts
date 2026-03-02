import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h1 class="text-gray-900 mb-4">{{ propertyData.title }}</h1>
      <div class="flex items-center gap-2 text-gray-600 mb-6">
        <i class="fa-solid fa-map-marker-alt w-5 h-5 text-[#808080]"></i>
        <span>{{ propertyData.location.full }}</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pb-6 border-b border-gray-200">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <i class="fa-solid fa-bed w-5 h-5 text-[#808080]"></i>
            <span class="text-gray-500 text-sm">Bedrooms</span>
          </div>
          <div class="text-gray-900">{{ propertyData.specs.bedrooms }}</div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <i class="fa-solid fa-bath w-5 h-5 text-[#808080]"></i>
            <span class="text-gray-500 text-sm">Bathrooms</span>
          </div>
          <div class="text-gray-900">{{ propertyData.specs.bathrooms }}</div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <i class="fa-solid fa-maximize w-5 h-5 text-[#808080]"></i>
            <span class="text-gray-500 text-sm">Area</span>
          </div>
          <div class="text-gray-900">{{ propertyData.specs.area_sqm }} sqm</div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <i class="fa-solid fa-building w-5 h-5 text-[#808080]"></i>
            <span class="text-gray-500 text-sm">Floor</span>
          </div>
          <div class="text-gray-900">{{ propertyData.specs.floor }}</div>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-6">
        <div>
          <div class="text-gray-500 text-sm mb-1">Property Type</div>
          <div class="text-gray-900">{{ propertyData.specs.property_type }}</div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">Ownership</div>
          <div class="text-gray-900">{{ propertyData.specs.ownership }}</div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">Finishing</div>
          <div class="text-gray-900">{{ propertyData.specs.finishing }}</div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">Year Built</div>
          <div class="text-gray-900">{{ propertyData.specs.year_built }}</div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">Compound</div>
          <div class="text-gray-900">{{ propertyData.specs.compound }}</div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">Delivery</div>
          <div class="text-black flex items-center gap-1">
            <i class="fa-solid fa-bolt w-4 h-4"></i>{{ propertyData.specs.delivery }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PropertyDetailsComponent {
  @Input() propertyData: any;
}
