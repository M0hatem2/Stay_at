import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-masterplan',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-gray-900">Masterplan</h2>
      </div>
      <img [src]="masterplanImage" alt="Masterplan" class="w-full h-96 object-cover" />
    </div>
  `,
})
export class MasterplanComponent {
  @Input() masterplanImage: string =
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop';
}
