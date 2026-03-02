import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h3 class="text-gray-900 mb-4">Quick Info</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <div class="flex items-center gap-2 text-gray-600">
            <i class="fa-solid fa-calendar w-4 h-4"></i>
            <span class="text-sm">Delivery</span>
          </div>
          <span class="text-gray-900">{{ deliveryDate }}</span>
        </div>
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <div class="flex items-center gap-2 text-gray-600">
            <i class="fa-solid fa-home w-4 h-4"></i>
            <span class="text-sm">Total Units</span>
          </div>
          <span class="text-gray-900">{{ totalUnits }}</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-gray-600">
            <i class="fa-solid fa-circle-check w-4 h-4"></i>
            <span class="text-sm">Available</span>
          </div>
          <span class="text-[#de5806]">{{ availableUnits }}</span>
        </div>
      </div>
    </div>
  `,
})
export class QuickInfoComponent {
  @Input() deliveryDate: string = '2025';
  @Input() totalUnits: string = '420';
  @Input() availableUnits: string = '180 units';
}
