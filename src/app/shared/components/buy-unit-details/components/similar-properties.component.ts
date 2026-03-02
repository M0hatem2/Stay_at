import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-similar-properties',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-gray-900 mb-6">Similar Properties</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="group cursor-pointer">
          <div class="relative h-48 rounded-xl overflow-hidden mb-3">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
              alt="180sqm Apartment Same Compound"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 class="text-gray-900 text-sm mb-2 line-clamp-2">180sqm Apartment Same Compound</h3>
          <div class="flex items-center justify-between mb-2">
            <div class="text-[#de5806] font-semibold">3 EGP</div>
            <div class="text-sm text-gray-500">17 EGP/sqm</div>
          </div>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-bed w-4 h-4"></i><span>3</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-bath w-4 h-4"></i><span>2</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-maximize w-4 h-4"></i><span>180</span>
            </div>
          </div>
        </div>
        <div class="group cursor-pointer">
          <div class="relative h-48 rounded-xl overflow-hidden mb-3">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
              alt="220sqm Apartment - Higher Floor"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 class="text-gray-900 text-sm mb-2 line-clamp-2">220sqm Apartment - Higher Floor</h3>
          <div class="flex items-center justify-between mb-2">
            <div class="text-[#de5806] font-semibold">4 EGP</div>
            <div class="text-sm text-gray-500">18 EGP/sqm</div>
          </div>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-bed w-4 h-4"></i><span>4</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-bath w-4 h-4"></i><span>3</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-maximize w-4 h-4"></i><span>220</span>
            </div>
          </div>
        </div>
        <div class="group cursor-pointer">
          <div class="relative h-48 rounded-xl overflow-hidden mb-3">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
              alt="250sqm Duplex with Garden"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 class="text-gray-900 text-sm mb-2 line-clamp-2">250sqm Duplex with Garden</h3>
          <div class="flex items-center justify-between mb-2">
            <div class="text-[#de5806] font-semibold">4 EGP</div>
            <div class="text-sm text-gray-500">19 EGP/sqm</div>
          </div>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-bed w-4 h-4"></i><span>4</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-bath w-4 h-4"></i><span>4</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-maximize w-4 h-4"></i><span>250</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SimilarPropertiesComponent {}
