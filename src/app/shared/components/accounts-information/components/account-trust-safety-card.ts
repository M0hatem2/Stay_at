import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-trust-safety-card',
  standalone: true,
  template: `
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2 bg-green-600 rounded-lg">
          <i class="fas fa-shield-alt text-white"></i>
        </div>
        <h3 class="text-gray-900">Trust & Safety</h3>
      </div>

      <ul class="space-y-3 text-sm text-gray-700">
        @for (check of checks; track check) {
          <li class="flex items-start gap-2">
            <i class="fas fa-circle-check w-5 text-green-600 shrink-0 mt-0.5"></i>
            <span>{{ check }}</span>
          </li>
        }
      </ul>
    </div>
  `,
})
export class AccountTrustSafetyCardComponent {
  @Input() checks: string[] = [];
}
