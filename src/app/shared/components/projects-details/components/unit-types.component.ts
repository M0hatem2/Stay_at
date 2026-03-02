import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UnitType {
  name: string;
  area: string;
  price: string;
  available: string;
}

@Component({
  selector: 'app-unit-types',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-gray-900 mb-6">Unit Types</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for (unit of unitTypes; track unit.name) {
          <div
            class="border-2 border-gray-200 rounded-xl p-4 hover:border-[#de5806] hover:shadow-lg transition-all group"
          >
            <div class="flex items-center gap-2 mb-3">
              <div
                class="w-8 h-8 bg-gradient-to-br from-[#de5806] to-[#470e03] rounded-lg flex items-center justify-center"
              >
                <i class="fa-solid fa-home w-4 h-4 text-white"></i>
              </div>
              <h3 class="text-gray-900">{{ unit.name }}</h3>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Area:</span>
                <span class="text-gray-900">{{ unit.area }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Price:</span>
                <span class="text-[#de5806] font-semibold">{{ unit.price }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Available:</span>
                <span class="text-gray-900">{{ unit.available }}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class UnitTypesComponent {
  @Input() unitTypes: UnitType[] = [
    {
      name: '2 Bedroom Apartment',
      area: '120 - 140 sqm',
      price: 'From 2,500,000 EGP',
      available: '45 units',
    },
    {
      name: '3 Bedroom Apartment',
      area: '160 - 180 sqm',
      price: 'From 3,200,000 EGP',
      available: '65 units',
    },
    { name: 'Duplex', area: '220 - 260 sqm', price: 'From 4,800,000 EGP', available: '38 units' },
    {
      name: 'Penthouse',
      area: '280 - 320 sqm',
      price: 'From 6,500,000 EGP',
      available: '12 units',
    },
  ];
}
