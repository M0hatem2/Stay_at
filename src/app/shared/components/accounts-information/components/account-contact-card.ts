import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-contact-card',
  standalone: true,
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-lg">
      <h3 class="text-gray-900 mb-4">Contact Owner</h3>

      <div class="space-y-3">
        @if (phoneNumber) {
          <a
            [href]="'tel:' + phoneNumber"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#C4A962] to-[#B39952] text-white rounded-lg hover:from-[#B39952] hover:to-[#A38942] transition-all shadow-md"
          >
            <i class="fas fa-phone"></i>
            <span>{{ phoneNumber }}</span>
          </a>
        } @else {
          <button
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#C4A962] to-[#B39952] text-white rounded-lg hover:from-[#B39952] hover:to-[#A38942] transition-all shadow-md"
            type="button"
          >
            <i class="fas fa-phone"></i>
            <span>Show Phone Number</span>
          </button>
        }

        @if (email) {
          <a
            [href]="'mailto:' + email"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i class="fas fa-envelope text-[#C4A962]"></i>
            <span class="text-gray-900 truncate">{{ email }}</span>
          </a>
        } @else {
          <button
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            type="button"
          >
            <i class="fas fa-envelope text-[#C4A962]"></i>
            <span class="text-gray-900">Send Message</span>
          </button>
        }
      </div>

      <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <i class="fas fa-clock text-[#C4A962]"></i>
          <span>Response Time:</span>
        </div>
        <div class="text-gray-900">{{ responseTime }}</div>
      </div>
    </div>
  `,
})
export class AccountContactCardComponent {
  @Input() responseTime = 'Within 1 hour';
  @Input() phoneNumber = '';
  @Input() email = '';
}
