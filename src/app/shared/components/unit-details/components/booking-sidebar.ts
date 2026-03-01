import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

interface OwnerInfo {
  name: string;
  type: string;
  role: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-booking-sidebar',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  template: `
    <div class="sticky top-4 sm:top-24 space-y-4 sm:space-y-6">
      <!-- Pricing Card -->
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
        <div class="mb-4 sm:mb-6">
          <div class="text-2xl sm:text-3xl text-black mb-1">{{ priceDisplay }}</div>
          <div class="text-gray-500 text-sm sm:text-base">{{ pricePeriod }}</div>
        </div>
        <button
          (click)="bookNow.emit()"
          class="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#de5806] to-[#470e03] text-white rounded-xl hover:shadow-lg transition-all mb-2 sm:mb-3 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <i class="fa-solid fa-calendar-days w-4 h-4 sm:w-5 sm:h-5"></i>Book Now
        </button>
        <div class="text-center text-xs sm:text-sm text-gray-600">
          {{ cancellationPolicy }}
        </div>
      </div>

      <!-- Owner Information -->
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 class="text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Owner Information</h3>
        @if (owner) {
          <button class="w-full">
            <div
              class="flex items-center gap-3 mb-3 sm:mb-4 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#de5806] to-[#470e03] rounded-full flex items-center justify-center ring-2 ring-[#de5806]/20"
              >
                <i class="fa-solid fa-user w-4 h-4 sm:w-6 sm:h-6 text-white"></i>
              </div>
              <div class="flex-1 text-left">
                <div class="text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  {{ owner.name }}
                  <i class="fa-solid fa-check-circle w-3 h-3 sm:w-4 sm:h-4 text-green-600"></i>
                </div>
                <div class="text-gray-500 text-xs sm:text-sm">
                  {{ owner.type | titlecase }} - {{ owner.role | titlecase }}
                </div>
              </div>
              <div class="text-[#de5806]">
                <i class="fa-solid fa-arrow-right w-4 h-4 sm:w-5 sm:h-5"></i>
              </div>
            </div>
          </button>
          <div class="space-y-2 sm:space-y-3">
            <a
              [href]="'tel:' + owner.phoneNumber"
              class="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              <i class="fa-solid fa-phone w-4 h-4 sm:w-5 sm:h-5 text-[#808080]"></i>
              <span class="text-gray-900">{{ owner.phoneNumber }}</span>
            </a>
            <a
              [href]="'mailto:' + owner.email"
              class="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              <i class="fa-solid fa-envelope w-4 h-4 sm:w-5 sm:h-5 text-[#808080]"></i>
              <span class="text-gray-900 text-xs sm:text-sm truncate">{{ owner.email }}</span>
            </a>
          </div>
        } @else {
          <div class="text-center py-4 text-gray-500 text-sm">
            <i class="fa-solid fa-user-slash w-8 h-8 mx-auto mb-2 opacity-50"></i>
            <p>Owner information not available</p>
          </div>
        }
      </div>

      <!-- Safety Tips -->
      <div class="bg-gray-100 rounded-2xl p-4 sm:p-6 border border-gray-300">
        <div class="flex items-start gap-2 sm:gap-3">
          <i
            class="fa-solid fa-shield-alt w-5 h-5 sm:w-6 sm:h-6 text-gray-600 flex-shrink-0 mt-0.5"
          ></i>
          <div>
            <div class="text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Safety Tips</div>
            <ul class="text-xs sm:text-sm text-gray-600 space-y-1">
              <li *ngFor="let tip of safetyTips">• {{ tip }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BookingSidebarComponent {
  @Input() priceDisplay: string = '';
  @Input() pricePeriod: string = '';
  @Input() cancellationPolicy: string = 'Free cancellation within 24 hours';
  @Input() owner: OwnerInfo | null = null;
  @Input() safetyTips: string[] = [
    "Don't pay before viewing",
    'Verify official documents',
    'Use secure payment methods',
  ];

  @Output() bookNow = new EventEmitter<void>();
}
