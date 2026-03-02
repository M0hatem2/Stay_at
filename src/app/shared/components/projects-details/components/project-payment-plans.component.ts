import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-payment-plans',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-gradient-to-br from-gray-50 via-[#de5806]/10 to-gray-100 rounded-2xl p-6 border-2 border-[#de5806]/20"
    >
      <h2 class="text-gray-900 mb-4">Payment Plans</h2>
      <div class="space-y-3">
        @for (plan of paymentPlans; track plan) {
          <div class="flex items-start gap-3 bg-white rounded-lg p-4">
            <i class="fa-solid fa-circle-check w-5 h-5 text-[#de5806] flex-shrink-0 mt-0.5"></i>
            <span class="text-gray-700">{{ plan }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class ProjectPaymentPlansComponent {
  @Input() paymentPlans: string[] = [
    '10% down payment and installments over 8 years',
    '20% down payment and installments over 6 years',
    '30% down payment and installments over 5 years',
  ];
}
