import { Component, Input } from '@angular/core';
import { AccountSectionCardComponent } from './account-section-card';
import { AccountBadgeItem } from './accounts-information.models';

@Component({
  selector: 'app-account-achievements-section',
  standalone: true,
  imports: [AccountSectionCardComponent],
  template: `
    <app-account-section-card title="Achievements & Certifications" iconClass="fas fa-award">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for (item of items; track item.title) {
          <div
            class="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200"
          >
            <div class="p-2 bg-[#C4A962] rounded-lg">
              <i [class]="item.iconClass + ' text-white'"></i>
            </div>
            <div>
              <div class="text-gray-900 mb-1">{{ item.title }}</div>
              <div class="text-sm text-gray-600">{{ item.description }}</div>
            </div>
          </div>
        }
      </div>
    </app-account-section-card>
  `,
})
export class AccountAchievementsSectionComponent {
  @Input() items: AccountBadgeItem[] = [];
}
