import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface CalendarDay {
  date: number;
  fullDate: Date;
  status: 'available' | 'occupied' | 'pending' | 'past';
  isToday: boolean;
}

@Component({
  selector: 'app-day-details-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DatePipe],
  template: `
    <div
      *ngIf="show && selectedDay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      (click)="onClose()"
    >
      <div
        class="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
        (click)="$event.stopPropagation()"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ selectedDay.fullDate | date: 'EEEE, MMMM d, yyyy' }}
          </h3>
          <button (click)="onClose()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <i class="fa-solid fa-times w-4 h-4 text-gray-500"></i>
          </button>
        </div>

        <div class="space-y-4">
          <!-- Status Badge -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <div
                [ngClass]="{
                  'w-3 h-3 rounded-full': true,
                  'bg-green-500': selectedDay.status === 'available',
                  'bg-red-500': selectedDay.status === 'occupied',
                  'bg-yellow-500': selectedDay.status === 'pending',
                  'bg-gray-400': selectedDay.status === 'past',
                }"
              ></div>
              <span
                class="font-medium"
                [ngClass]="{
                  'text-green-700': selectedDay.status === 'available',
                  'text-red-700': selectedDay.status === 'occupied',
                  'text-yellow-700': selectedDay.status === 'pending',
                  'text-gray-600': selectedDay.status === 'past',
                }"
                >{{ getStatusText(selectedDay.status) }}</span
              >
            </div>
          </div>

          <!-- Details based on status -->
          <div class="bg-gray-50 rounded-lg p-4">
            <ng-container [ngSwitch]="selectedDay.status">
              <!-- Available -->
              <div *ngSwitchCase="'available'" class="space-y-3">
                <div class="flex items-center gap-2 text-green-700">
                  <i class="fa-solid fa-check-circle w-4 h-4"></i>
                  <span class="text-sm font-medium">This date is available for booking</span>
                </div>
                <button
                  (click)="onBookDate()"
                  class="w-full px-4 py-2 bg-[#de5806] text-white rounded-lg hover:bg-[#c54d05] transition-colors"
                >
                  <i class="fa-solid fa-calendar-plus w-4 h-4 mr-2"></i>
                  Book This Date
                </button>
              </div>

              <!-- Occupied -->
              <div *ngSwitchCase="'occupied'" class="space-y-3">
                <div class="flex items-center gap-2 text-red-700">
                  <i class="fa-solid fa-times-circle w-4 h-4"></i>
                  <span class="text-sm font-medium">This date is already booked</span>
                </div>
                <div class="text-xs text-gray-600">
                  <p>• Booking ID: #BK-2024-001</p>
                  <p>• Duration: 3 days</p>
                  <p>• Guest: John Smith</p>
                </div>
              </div>

              <!-- Pending -->
              <div *ngSwitchCase="'pending'" class="space-y-3">
                <div class="flex items-center gap-2 text-yellow-700">
                  <i class="fa-solid fa-clock w-4 h-4"></i>
                  <span class="text-sm font-medium">Booking pending confirmation</span>
                </div>
                <div class="text-xs text-gray-600">
                  <p>• Pending since: 2 hours ago</p>
                  <p>• Expected confirmation: Within 24 hours</p>
                </div>
              </div>

              <!-- Past -->
              <div *ngSwitchCase="'past'" class="space-y-3">
                <div class="flex items-center gap-2 text-gray-600">
                  <i class="fa-solid fa-history w-4 h-4"></i>
                  <span class="text-sm font-medium">This date has passed</span>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DayDetailsModalComponent {
  @Input() show: boolean = false;
  @Input() selectedDay?: CalendarDay | null;
  @Output() close = new EventEmitter<void>();
  @Output() bookDate = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onBookDate() {
    this.bookDate.emit();
    this.close.emit();
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      available: 'Available',
      occupied: 'Occupied',
      pending: 'Pending',
      past: 'Past Date',
    };
    return statusMap[status] || status;
  }
}
