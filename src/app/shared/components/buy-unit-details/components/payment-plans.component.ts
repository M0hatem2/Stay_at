import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetails } from '../../../../core/models/property-details.model';

type PaymentPlan = PropertyDetails['payment_plans'][number];
type SelectedPlanSummary = PropertyDetails['selected_plan_summary'];

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
      @if (plans.length) {
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          @for (plan of plans; track plan.name) {
            <div
              class="relative p-6 rounded-xl cursor-pointer transition-all transform-none"
              [ngClass]="
                isPlanSelected(plan)
                  ? 'bg-gradient-to-br from-[#de5806] to-[#470e03] text-white shadow-xl ring-4 ring-[#de5806]/30'
                  : 'bg-gray-50 border-2 border-gray-200 hover:border-[#de5806]/50 hover:shadow-md'
              "
              tabindex="0"
              role="button"
              (click)="selectPlan(plan)"
              (keydown)="onPlanCardKeydown($event, plan)"
            >
              @if (plan.tag) {
                <div
                  class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-600 text-white text-xs rounded-full shadow-md"
                >
                  {{ plan.tag }}
                </div>
              }
              @if (isPlanSelected(plan)) {
                <div
                  class="absolute -top-3 right-0 px-3 py-1 bg-white text-black text-xs rounded-full shadow-md flex items-center gap-1"
                >
                  <i class="fa-solid fa-check-circle w-3 h-3"></i>
                </div>
              }
              <div class="text-center">
                <h3 class="mb-3" [class]="isPlanSelected(plan) ? 'text-white' : 'text-gray-900'">
                  {{ plan.name }}
                </h3>
                @if (plan.discount) {
                  <div
                    class="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm mb-3"
                    [ngClass]="
                      isPlanSelected(plan) ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                    "
                  >
                    <i class="fa-solid fa-arrow-trend-down w-4 h-4"></i>
                    <span>Save {{ plan.discount }}</span>
                  </div>
                }
                <div class="space-y-3 mb-4">
                  <div>
                    <div
                      class="text-xs mb-1"
                      [class]="isPlanSelected(plan) ? 'text-white/80' : 'text-gray-500'"
                    >
                      Down Payment
                    </div>
                    <div class="text-lg" [class]="isPlanSelected(plan) ? 'text-white' : 'text-gray-900'">
                      {{ plan.down_payment }}
                    </div>
                  </div>
                  @if (plan.monthly) {
                    <div>
                      <div
                        class="text-xs mb-1"
                        [class]="isPlanSelected(plan) ? 'text-white/80' : 'text-gray-500'"
                      >
                        Monthly
                      </div>
                      <div
                        class="text-lg"
                        [class]="isPlanSelected(plan) ? 'text-white' : 'text-gray-900'"
                      >
                        {{ plan.monthly }}
                      </div>
                    </div>
                  }
                  <div>
                    <div
                      class="text-xs mb-1"
                      [class]="isPlanSelected(plan) ? 'text-white/80' : 'text-gray-500'"
                    >
                      Final Price
                    </div>
                    <div class="text-xl" [class]="isPlanSelected(plan) ? 'text-white' : 'text-black'">
                      {{ plan.final_price }}
                    </div>
                  </div>
                </div>
                <p class="text-xs" [class]="isPlanSelected(plan) ? 'text-white/90' : 'text-gray-600'">
                  {{ plan.note }}
                </p>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="mb-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
          Payment plans are not available for this unit yet.
        </div>
      }
      <div
        class="p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl border-2 border-gray-300 opacity-100 transform-none"
      >
        <div class="flex items-center gap-2 mb-3">
          <i class="fa-solid fa-check-circle w-5 h-5 text-[#808080]"></i>
          <span class="text-gray-900"
            >Selected Plan: <strong>{{ selectedPlan?.name || 'Not selected yet' }}</strong></span
          >
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <div class="text-gray-500 mb-1">Down Payment</div>
            <div class="text-gray-900">{{ selectedPlan?.down_payment || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">Duration</div>
            <div class="text-gray-900">{{ selectedPlan?.duration || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">Monthly Installment</div>
            <div class="text-gray-900">{{ selectedPlan?.monthly_installment || '-' }}</div>
          </div>
          <div>
            <div class="text-gray-500 mb-1">Discount</div>
            <div class="text-green-600">{{ selectedPlan?.discount || '-' }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PaymentPlansComponent {
  @Input() plans: PaymentPlan[] = [];
  @Input() selectedPlan: SelectedPlanSummary | null = null;
  @Output() planSelected = new EventEmitter<PaymentPlan>();

  selectPlan(plan: PaymentPlan): void {
    this.planSelected.emit(plan);
  }

  onPlanCardKeydown(event: KeyboardEvent, plan: PaymentPlan): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectPlan(plan);
    }
  }

  isPlanSelected(plan: PaymentPlan): boolean {
    if (this.selectedPlan?.name) {
      return this.selectedPlan.name === plan.name;
    }
    return !!plan.selected;
  }
}
