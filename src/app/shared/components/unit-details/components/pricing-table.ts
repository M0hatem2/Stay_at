import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ApiPricingTier {
  minDays: number;
  pricePerDay: number;
  label: string;
  _id: string;
}

interface FinalPricing {
  price: number;
  tiers: ApiPricingTier[];
  currency: string;
  rentType: string;
}

interface DisplayTier {
  duration_label: string;
  days: number;
  price_per_day: number;
  total_price: number;
  discount_percent: number;
  savings: number;
  isPopular: boolean;
  isSelected?: boolean;
}

@Component({
  selector: 'app-pricing-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-6 sm:mt-8">
      <div
        class="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100 overflow-hidden"
      >
        <div
          class="bg-gradient-to-r from-black to-gray-900 px-4 sm:px-6 py-4 sm:py-5 border-b-4 border-[#de5806]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="p-1.5 sm:p-2 bg-[#808080]/20 rounded-lg">
                <i class="fa-solid fa-calendar-days w-4 h-4 sm:w-6 sm:h-6 text-[#808080]"></i>
              </div>
              <div>
                <h3 class="text-lg sm:text-xl text-white">Pricing Table</h3>
                <p class="text-xs sm:text-sm text-gray-400 mt-0.5">
                  Choose the duration that suits you
                </p>
              </div>
            </div>
            <i class="fa-solid fa-wand-magic-sparkles w-5 h-5 sm:w-6 sm:h-6 text-white"></i>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px]" dir="ltr">
            <thead>
              <tr class="bg-gray-100 border-b-2 border-gray-200">
                <th class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm text-gray-700">
                  Duration
                </th>
                <th class="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-700">
                  Price/Day
                </th>
                <th class="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-700">
                  Discount
                </th>
                <th class="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-700">
                  Total
                </th>
                <th class="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-700">
                  Savings
                </th>
                <th class="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-700">
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              @for (tier of displayTiers; track $index) {
                <tr
                  class="border-b border-gray-200 cursor-pointer transition-all hover:bg-gray-50"
                  [class.bg-gradient-to-r]="tier.isPopular"
                  [class.from-black/10]="tier.isPopular"
                  [class.to-black/5]="tier.isPopular"
                  (click)="selectTier($index)"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      @if (tier.isPopular) {
                        <i class="fa-solid fa-star w-4 h-4 text-black fill-black"></i>
                      }
                      <span class="text-gray-900">{{ tier.duration_label }}</span>
                      @if (tier.isPopular) {
                        <span class="px-2 py-0.5 bg-black text-white text-xs rounded-full"
                          >Popular</span
                        >
                      }
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="text-gray-900">
                      {{ tier.price_per_day
                      }}<span class="text-sm text-gray-500 mr-1">{{ displayCurrency }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    @if (tier.discount_percent > 0) {
                      <div
                        class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        <i class="fa-solid fa-arrow-trend-down w-4 h-4"></i
                        >{{ tier.discount_percent }}%
                      </div>
                    } @else {
                      <span class="text-gray-400">-</span>
                    }
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="text-lg text-gray-900">
                      {{ tier.total_price.toLocaleString()
                      }}<span class="text-sm text-gray-500 mr-1">{{ displayCurrency }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    @if (tier.savings > 0) {
                      <div class="text-green-600">
                        {{ tier.savings.toLocaleString()
                        }}<span class="text-xs mr-1">{{ displayCurrency }}</span>
                      </div>
                    } @else {
                      <span class="text-gray-400">-</span>
                    }
                  </td>
                  <td class="px-6 py-4 text-center">
                    @if (!isTierSelected($index)) {
                      <button
                        class="px-4 py-2 rounded-lg transition-all font-medium"
                        [class.bg-black]="!tier.isPopular"
                        [class.text-white]="!tier.isPopular"
                        [class.hover:bg-[#404040]]="!tier.isPopular"
                        [class.hover:shadow-md]="!tier.isPopular"
                        [class.bg-gradient-to-r]="tier.isPopular"
                        [class.from-black]="tier.isPopular"
                        [class.to-[#404040]]="tier.isPopular"
                        [class.shadow-lg]="tier.isPopular"
                        [class.scale-105]="tier.isPopular"
                      >
                        <span class="text-sm">Select</span>
                      </button>
                    } @else {
                      <button
                        class="px-4 py-2 rounded-lg transition-all font-medium bg-green-600 text-white shadow-lg scale-105"
                      >
                        <i class="fa-solid fa-check w-5 h-5"></i>
                      </button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div
          class="bg-gradient-to-r from-black/5 to-transparent px-6 py-4 border-t-2 border-gray-100"
        >
          <div class="flex items-start gap-3">
            <i class="fa-solid fa-wand-magic-sparkles w-5 h-5 text-black shrink-0 mt-0.5"></i>
            <div>
              <p class="text-sm text-gray-700 mb-2">💎 The longer you book, the more you save!</p>
              <div class="flex flex-wrap gap-3 text-xs text-gray-600">
                <span>✓ All utilities included</span><span>✓ Negotiable</span
                ><span>✓ Flexible payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PricingTableComponent implements OnInit {
  @Input() finalPricing?: FinalPricing;
  @Input() currency: string = 'EGP';
  @Output() priceSelected = new EventEmitter<{
    pricePerDay: number;
    totalPrice: number;
    days: number;
    label: string;
  }>();

  displayTiers: DisplayTier[] = [];
  displayCurrency: string = 'EGP';
  selectedTierIndex: number = -1;

  ngOnInit() {
    this.generateDisplayTiers();
  }

  ngOnChanges() {
    this.generateDisplayTiers();
  }

  private generateDisplayTiers() {
    if (!this.finalPricing) {
      this.displayTiers = [];
      return;
    }

    this.displayCurrency = this.finalPricing.currency || this.currency;
    const basePrice = this.finalPricing.price;

    // إضافة السعر الأساسي (يوم واحد)
    const tiers: DisplayTier[] = [
      {
        duration_label: '1 Day',
        days: 1,
        price_per_day: basePrice,
        total_price: basePrice,
        discount_percent: 0,
        savings: 0,
        isPopular: false,
        isSelected: false,
      },
    ];

    // إضافة الأسعار من tiers
    if (this.finalPricing.tiers && this.finalPricing.tiers.length > 0) {
      this.finalPricing.tiers.forEach((tier) => {
        const days = tier.minDays;
        const pricePerDay = tier.pricePerDay;
        const totalPrice = pricePerDay * days;
        const originalTotal = basePrice * days;
        const savings = originalTotal - totalPrice;
        const discountPercent = Math.round((savings / originalTotal) * 100);

        tiers.push({
          duration_label: tier.label || `${days} Days`,
          days: days,
          price_per_day: pricePerDay,
          total_price: totalPrice,
          discount_percent: discountPercent,
          savings: savings,
          isPopular: days === 30 || tier.label?.toLowerCase().includes('month'),
          isSelected: false,
        });
      });
    }

    this.displayTiers = tiers;
  }

  selectTier(index: number) {
    // إلغاء التحديد السابق
    this.displayTiers.forEach((tier, i) => {
      tier.isSelected = i === index;
    });

    this.selectedTierIndex = index;
    const selectedTier = this.displayTiers[index];

    // إرسال البيانات للمكون الأب
    this.priceSelected.emit({
      pricePerDay: selectedTier.price_per_day,
      totalPrice: selectedTier.total_price,
      days: selectedTier.days,
      label: selectedTier.duration_label,
    });
  }

  isTierSelected(index: number): boolean {
    return this.displayTiers[index]?.isSelected || false;
  }
}
