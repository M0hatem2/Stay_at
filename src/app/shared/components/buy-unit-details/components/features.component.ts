import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-gray-900 mb-6">Apartment Features</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        @for (feature of features; track feature) {
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-check-circle w-5 h-5 text-[#808080]"></i>
            <span class="text-gray-700">{{ feature }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class FeaturesComponent {
  @Input() features: string[] = [];
}
