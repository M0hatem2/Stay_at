import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

interface OwnerInfo {
  id: string;
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
          @if (pricePerMeter) {
            <div class="text-gray-600 text-xs sm:text-sm mt-1">{{ pricePerMeter }}</div>
          }
        </div>
        <button
          (click)="bookNow.emit()"
          [disabled]="!hasSelectedDates"
          [class.opacity-50]="!hasSelectedDates"
          [class.cursor-not-allowed]="!hasSelectedDates"
          [class.hover:shadow-lg]="hasSelectedDates"
          class="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#de5806] to-[#470e03] text-white rounded-xl transition-all mb-2 sm:mb-3 flex items-center justify-center gap-2 text-sm sm:text-base disabled:cursor-not-allowed"
        >
          <i class="fa-solid fa-calendar-days w-4 h-4 sm:w-5 sm:h-5"></i>
          @if (hasSelectedDates) {
            <span>Book Now</span>
          } @else {
            <span>Select Dates First</span>
          }
        </button>
        @if (!hasSelectedDates) {
          <div class="text-center text-xs text-orange-600 mb-2">
            <i class="fa-solid fa-info-circle mr-1"></i>
            Please select dates from the calendar below
          </div>
        }
        <div class="text-center text-xs sm:text-sm text-gray-600">
          {{ cancellationPolicy }}
        </div>
      </div>

      <!-- Owner Information -->
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 class="text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Owner Information</h3>
        @if (owner) {
          <button class="w-full" type="button" (click)="openOwnerProfile()">
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
              [href]="getPhoneLink()"
              class="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-gray-200 text-black rounded-lg hover:from-green-600 hover:to-green-700 hover:shadow-lg transition-all text-sm sm:text-base"
            >
              <i class="fa-solid fa-phone w-4 h-4 sm:w-5 sm:h-5"></i>
              <span>{{ owner.phoneNumber }}</span>
            </a>
            <a
              [href]="getEmailLink()"
              class="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-gray-200 text-black rounded-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all text-sm sm:text-base"
            >
              <i class="fa-solid fa-envelope w-4 h-4 sm:w-5 sm:h-5"></i>
              <span class="truncate">{{ owner.email }}</span>
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
  @Input() pricePerMeter: string | null = null;
  @Input() cancellationPolicy: string = 'Free cancellation within 24 hours';
  @Input() owner: OwnerInfo | null = null;
  @Input() safetyTips: string[] = [
    "Don't pay before viewing",
    'Verify official documents',
    'Use secure payment methods',
  ];
  @Input() hasSelectedDates: boolean = false;

  @Output() bookNow = new EventEmitter<void>();

  constructor(private router: Router) {}

  openOwnerProfile(): void {
    if (!this.owner?.id) return;

    const normalizedRole = this.owner.role?.toLowerCase?.() || '';
    const roleSegment =
      normalizedRole === 'property_seeker' || normalizedRole === 'seeker'
        ? 'seeker'
        : normalizedRole === 'real_estate_developer' || normalizedRole === 'developer'
          ? 'developer'
          : 'owner';

    this.router.navigate(['/accounts-information', roleSegment, this.owner.id]);
  }

  getPhoneLink(): string {
    if (!this.owner?.phoneNumber) return '#';
    
    // Remove any non-digit characters for the tel link
    const cleanNumber = this.owner.phoneNumber.replace(/\D/g, '');
    return `tel:${cleanNumber}`;
  }

  getEmailLink(): string {
    if (!this.owner?.email) return '#';
    
    const subject = encodeURIComponent(`Booking Inquiry - Property Rental`);
    const body = encodeURIComponent(`Hi ${this.owner.name},\n\nI'm interested in booking your property. Could you please provide more details about availability?\n\nThank you!`);
    
    return `mailto:${this.owner.email}?subject=${subject}&body=${body}`;
  }
}
