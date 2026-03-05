import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-section-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-gray-900 mb-4 flex items-center gap-2">
        @if (iconClass) {
          <i [class]="iconClass + ' text-[#C4A962]'"></i>
        }
        <span>{{ title }}</span>
      </h2>
      <ng-content></ng-content>
    </div>
  `,
})
export class AccountSectionCardComponent {
  @Input() title = '';
  @Input() iconClass = '';
}
