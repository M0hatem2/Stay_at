import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccountStat } from './accounts-information.models';

@Component({
  selector: 'app-account-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-xl p-4 border" [ngClass]="stat.containerClass">
      <div class="text-2xl text-gray-900 mb-1">{{ stat.value }}</div>
      <div class="text-sm text-gray-600">{{ stat.label }}</div>
    </div>
  `,
})
export class AccountStatCardComponent {
  @Input({ required: true }) stat!: AccountStat;
}
