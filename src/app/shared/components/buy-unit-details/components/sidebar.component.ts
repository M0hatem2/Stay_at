import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sticky top-24 space-y-6">
      <div
        class="bg-gradient-to-br from-[#de5806] via-[#470e03] to-[#de5806] rounded-2xl p-6 text-white shadow-xl opacity-100 transform-none"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="text-white/80 text-sm">Payment Plan</div>
          <div class="px-2 py-1 bg-white/20 rounded-lg text-xs">
            {{ propertyData?.sidebar?.payment_plan_label }}
          </div>
        </div>
        <div class="text-3xl mb-1">{{ propertyData?.sidebar?.price_display }}</div>
        <div class="space-y-2 pb-4 border-b border-white/20 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-white/80">Per sqm</span>
            <span>{{ propertyData?.sidebar?.per_sqm }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-white/80">Down Payment</span>
            <span>{{ propertyData?.sidebar?.down_payment }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-white/80">Monthly</span>
            <span>{{ propertyData?.sidebar?.monthly }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-white/80">Duration</span>
            <span>{{ propertyData?.sidebar?.duration }}</span>
          </div>
        </div>
        <div class="space-y-3">
          <button
            class="w-full px-4 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/40 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <i class="fa-solid fa-calculator w-4 h-4"></i><span>Change Plan</span>
          </button>
          <button
            class="w-full px-6 py-3 bg-white text-[#de5806] rounded-xl hover:bg-gray-100 transition-all font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <i class="fa-solid fa-dollar-sign w-5 h-5"></i><span>Make an Offer</span>
          </button>
          <button
            class="w-full px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-calendar-days w-5 h-5"></i><span>Schedule Viewing</span>
          </button>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex items-start gap-4 mb-4">
          <div
            class="w-16 h-16 bg-gradient-to-br from-[#de5806] to-[#470e03] rounded-full flex items-center justify-center text-white text-xl cursor-pointer hover:scale-110 transition-transform ring-2 ring-[#de5806]/20"
          >
            {{ agentInitial }}
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-gray-900 cursor-pointer hover:text-black transition-colors">
                {{ propertyData?.agent?.name }}
              </h3>
              @if (propertyData?.agent?.verified) {
                <i class="fa-solid fa-check-circle w-5 h-5 text-[#808080]"></i>
              }
            </div>
            <div class="text-sm text-gray-600 mb-2">{{ propertyData?.agent?.title }}</div>
            <div class="flex items-center gap-1 text-sm">
              <i class="fa-solid fa-star w-4 h-4 text-[#808080] fill-[#808080]"></i>
              <span class="text-gray-900">{{ propertyData?.agent?.rating }}</span>
              <span class="text-gray-500">({{ propertyData?.agent?.reviews_count }} reviews)</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 py-4 border-y border-gray-200 mb-4">
          <div>
            <div class="text-2xl text-black mb-1">{{ propertyData?.agent?.sold_count }}</div>
            <div class="text-sm text-gray-600">Sold</div>
          </div>
          <div>
            <div class="text-2xl text-black mb-1">{{ propertyData?.agent?.listed_count }}</div>
            <div class="text-sm text-gray-600">Listed</div>
          </div>
          <div class="col-span-2">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <i class="fa-solid fa-check-circle w-4 h-4 text-green-600"></i>
              <span>Response rate: {{ propertyData?.agent?.response_rate }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <i class="fa-solid fa-check-circle w-4 h-4 text-green-600"></i>
              <span>Response time: {{ propertyData?.agent?.response_time }}</span>
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <button
            class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-black to-[#404040] text-white rounded-lg hover:shadow-lg transition-all"
          >
            <i class="fa-solid fa-user w-4 h-4"></i><span>View Profile</span>
          </button>
          <button
            class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#808080]/10 text-[#808080] rounded-lg hover:bg-[#808080]/20 transition-colors"
          >
            <i class="fa-solid fa-phone w-4 h-4"></i><span>Show Phone Number</span>
          </button>
          <button
            class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#808080]/10 text-[#808080] rounded-lg hover:bg-[#808080]/20 transition-colors"
          >
            <i class="fa-solid fa-envelope w-4 h-4"></i><span>Send Message</span>
          </button>
        </div>
      </div>
      <div
        class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-300"
      >
        <div class="flex items-center gap-2 mb-4">
          <i class="fa-solid fa-wand-magic-sparkles w-5 h-5 text-[#808080]"></i>
          <h3 class="text-gray-900">AI Insights</h3>
        </div>
        <div class="space-y-4">
          @for (insight of propertyData?.ai_insights; track insight.title) {
            <div class="flex items-start gap-3">
              <i class="fa-solid fa-check-circle w-5 h-5 text-green-600 mt-0.5"></i>
              <div>
                <div class="text-gray-900 text-sm mb-1">{{ insight.title }}</div>
                <p class="text-gray-600 text-xs">{{ insight.detail }}</p>
              </div>
            </div>
          }
        </div>
      </div>
      <button
        class="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-600 hover:text-[#de5806] transition-colors"
      >
        <i class="fa-solid fa-exclamation-circle w-4 h-4"></i>
        <span class="text-sm">Report this listing</span>
      </button>
    </div>
  `,
})
export class SidebarComponent {
  @Input() propertyData: any;
  @Input() agentInitial: string = '';
}
