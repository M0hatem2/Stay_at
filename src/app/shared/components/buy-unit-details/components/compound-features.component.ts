import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compound-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-100 rounded-2xl p-6 border-2 border-gray-300"
    >
      <div class="flex items-center gap-2 mb-6">
        <i class="fa-solid fa-building w-6 h-6 text-[#808080]"></i>
        <h2 class="text-gray-900">{{ compoundName || 'Compound' }} Features</h2>
      </div>
      @if (compoundFeatures.length) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          @for (feature of compoundFeatures; track feature) {
            <div class="flex items-center gap-3 bg-white rounded-lg p-3">
              <i class="fa-solid fa-check-circle w-5 h-5 text-[#808080]"></i>
              <span class="text-gray-700 text-sm">{{ feature }}</span>
            </div>
          }
        </div>
      } @else {
        <div class="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-600">
          Compound services are not available yet.
        </div>
      }
    </div>
  `,
})
export class CompoundFeaturesComponent {
  @Input() compoundFeatures: string[] = [];
  @Input() compoundName: string = '';
}
