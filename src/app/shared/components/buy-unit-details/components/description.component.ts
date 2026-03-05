import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-gray-900 mb-4">Description</h2>
      <p class="text-gray-600 leading-relaxed whitespace-pre-line">
        {{ description || 'Description is not available yet.' }}
      </p>
    </div>
  `,
})
export class DescriptionComponent {
  @Input() description: string = '';
}
