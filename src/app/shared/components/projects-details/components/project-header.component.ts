import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="flex items-start gap-4 mb-4">
        <div
          class="w-16 h-16 bg-gradient-to-br from-[#de5806] to-[#470e03] rounded-xl flex items-center justify-center shadow-lg ring-2 ring-[#de5806]/20"
        >
          <i class="fa-solid fa-building w-8 h-8 text-white"></i>
        </div>
        <div class="flex-1">
          <h1 class="text-gray-900 mb-2">{{ projectName }}</h1>
          <div class="text-gray-600 mb-2">{{ developer }}</div>
          <div class="flex items-center gap-2 text-gray-600">
            <i class="fa-solid fa-map-marker-alt w-4 h-4"></i>
            <span>{{ location }}</span>
          </div>
        </div>
      </div>
      <p class="text-gray-600 leading-relaxed">{{ description }}</p>
    </div>
  `,
})
export class ProjectHeaderComponent {
  @Input() projectName: string = '';
  @Input() developer: string = '';
  @Input() location: string = '';
  @Input() description: string = '';
}
