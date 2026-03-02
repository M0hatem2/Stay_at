import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm space-y-3">
      <button
        (click)="onRequestCall()"
        class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#de5806] to-[#470e03] text-white rounded-lg hover:shadow-lg transition-all"
      >
        <i class="fa-solid fa-phone w-4 h-4"></i>
        <span>Request Call</span>
      </button>
      <button
        (click)="onBookVisit()"
        class="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#de5806] text-[#de5806] rounded-lg hover:bg-[#de5806]/10 transition-colors"
      >
        <i class="fa-solid fa-calendar w-4 h-4"></i>
        <span>Book Visit</span>
      </button>
      <button
        (click)="onGetBrochure()"
        class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <i class="fa-solid fa-envelope w-4 h-4"></i>
        <span>Get Brochure</span>
      </button>
    </div>
  `,
})
export class ActionButtonsComponent {
  @Output() requestCall = new EventEmitter<void>();
  @Output() bookVisit = new EventEmitter<void>();
  @Output() getBrochure = new EventEmitter<void>();

  onRequestCall() {
    this.requestCall.emit();
  }

  onBookVisit() {
    this.bookVisit.emit();
  }

  onGetBrochure() {
    this.getBrochure.emit();
  }
}
