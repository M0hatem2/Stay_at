import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
      <div class="space-y-3">
        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#de5806]/10 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-building w-5 h-5 text-[#de5806]"></i>
            </div>
            <div>
              <div class="text-gray-900">Cairo Festival City</div>
              <div class="text-sm text-gray-500">Mall</div>
            </div>
          </div>
          <div class="text-left">
            <div class="text-gray-900">2 km</div>
            <div class="text-sm text-gray-500">5 min</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#de5806]/10 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-building w-5 h-5 text-[#de5806]"></i>
            </div>
            <div>
              <div class="text-gray-900">American University</div>
              <div class="text-sm text-gray-500">University</div>
            </div>
          </div>
          <div class="text-left">
            <div class="text-gray-900">3.5 km</div>
            <div class="text-sm text-gray-500">8 min</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#de5806]/10 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-building w-5 h-5 text-[#de5806]"></i>
            </div>
            <div>
              <div class="text-gray-900">El Salam International Hospital</div>
              <div class="text-sm text-gray-500">Hospital</div>
            </div>
          </div>
          <div class="text-left">
            <div class="text-gray-900">1.5 km</div>
            <div class="text-sm text-gray-500">4 min</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#de5806]/10 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-building w-5 h-5 text-[#de5806]"></i>
            </div>
            <div>
              <div class="text-gray-900">Carrefour Fifth Settlement</div>
              <div class="text-sm text-gray-500">Supermarket</div>
            </div>
          </div>
          <div class="text-left">
            <div class="text-gray-900">1 km</div>
            <div class="text-sm text-gray-500">3 min</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#de5806]/10 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-building w-5 h-5 text-[#de5806]"></i>
            </div>
            <div>
              <div class="text-gray-900">Choueifat International School</div>
              <div class="text-sm text-gray-500">School</div>
            </div>
          </div>
          <div class="text-left">
            <div class="text-gray-900">2.5 km</div>
            <div class="text-sm text-gray-500">6 min</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NearbyPlacesComponent {}
