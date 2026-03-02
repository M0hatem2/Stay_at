import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-plans',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="payment-plans" class="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
      <div class="flex items-center gap-2 mb-6">
        <i class="fa-solid fa-calculator w-6 h-6 text-[#808080]"></i>
        <h2 class="text-gray-900">Available Payment Plans</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div
          class="relative p-6 rounded-xl cursor-pointer transition-all bg-gray-50 border-2 border-gray-200 hover:border-[#de5806]/50 hover:shadow-md transform-none"
          tabindex="0"
        >
          <div
            class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-600 text-white text-xs rounded-full shadow-md"
          >
            🔥 Best Deal
          </div>
          <div class="text-center">
            <h3 class="mb-3 text-gray-900">Cash - Instant Discount</h3>
            <div
              class="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm mb-3 bg-green-100 text-green-700"
            >
              <i class="fa-solid fa-arrow-trend-down w-4 h-4"></i><span>Save 10%</span>
            </div>
            <div class="space-y-3 mb-4">
              <div>
                <div class="text-xs mb-1 text-gray-500">Down Payment</div>
                <div class="text-lg text-gray-900">100%</div>
              </div>
              <div>
                <div class="text-xs mb-1 text-gray-500">Final Price</div>
                <div class="text-xl text-black">3</div>
              </div>
            </div>
            <p class="text-xs text-gray-600">
              10% discount (EGP 350,000) on total price for immediate payment
            </p>
          </div>
        </div>
        <div
          class="relative p-6 rounded-xl cursor-pointer transition-all bg-gray-50 border-2 border-gray-200 hover:border-[#de5806]/50 hover:shadow-md transform-none"
          tabindex="0"
        >
          <div class="text-center">
            <h3 class="mb-3 text-gray-900">5 Years Installment</h3>
            <div
              class="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm mb-3 bg-green-100 text-green-700"
            >
              <i class="fa-solid fa-arrow-trend-down w-4 h-4"></i><span>Save 5%</span>
            </div>
            <div class="space-y-3 mb-4">
              <div>
                <div class="text-xs mb-1 text-gray-500">Down Payment</div>
                <div class="text-lg text-gray-900">20%</div>
              </div>
              <div>
                <div class="text-xs mb-1 text-gray-500">Monthly</div>
                <div class="text-lg text-gray-900">44,000</div>
              </div>
              <div>
                <div class="text-xs mb-1 text-gray-500">Final Price</div>
                <div class="text-xl text-black">3</div>
              </div>
            </div>
            <p class="text-xs text-gray-600">
              EGP 700,000 down payment (20%), rest EGP 2,625,000 over 60 months
            </p>
          </div>
        </div>
        <div
          class="relative p-6 rounded-xl cursor-pointer transition-all bg-gradient-to-br from-[#de5806] to-[#470e03] text-white shadow-xl ring-4 ring-[#de5806]/30 transform-none"
          tabindex="0"
        >
          <div
            class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs rounded-full shadow-md flex items-center gap-1"
          >
            <i class="fa-solid fa-check-circle w-3 h-3"></i><span>Selected</span>
          </div>
          <div class="text-center">
            <h3 class="mb-3 text-white">7 Years Installment</h3>
            <div class="space-y-3 mb-4">
              <div>
                <div class="text-xs mb-1 text-white/80">Down Payment</div>
                <div class="text-lg text-white">15%</div>
              </div>
              <div>
                <div class="text-xs mb-1 text-white/80">Monthly</div>
                <div class="text-lg text-white">35,000</div>
              </div>
              <div>
                <div class="text-xs mb-1 text-white/80">Final Price</div>
                <div class="text-xl text-white">3</div>
              </div>
            </div>
            <p class="text-xs text-white/90">
              EGP 525,000 down payment (15%), rest EGP 2,975,000 over 84 months
            </p>
          </div>
        </div>
      </div>
      <div
        class="p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl border-2 border-gray-300 opacity-100 transform-none"
      >
        <div class="flex items-center gap-2 mb-3">
          <i class="fa-solid fa-check-circle w-5 h-5 text-[#808080]"></i>
          <span class="text-gray-900"
            >Selected Plan: <strong>{{ selectedPlan?.name }}</strong></span
          >
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <div class="text-gray-500 mb-1">Down Payment</div>
            <div class="text-gray-900">{{ selectedPlan?.down_payment }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">Duration</div>
            <div class="text-gray-900">{{ selectedPlan?.duration }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">Monthly Installment</div>
            <div class="text-gray-900">{{ selectedPlan?.monthly_installment }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">Discount</div>
            <div class="text-green-600">{{ selectedPlan?.discount }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PaymentPlansComponent {
  @Input() selectedPlan: any;
}
