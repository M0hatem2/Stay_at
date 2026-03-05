import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../core/services/api.service';
import { Subscription } from 'rxjs';

interface CalendarDay {
  date: number;
  status: 'available' | 'unavailable' | 'past';
  isCurrentMonth: boolean;
  fullDate: Date;
  isToday: boolean;
  isSelected?: boolean;
  isInRange?: boolean;
}

interface AvailabilityPeriod {
  _id: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface AvailabilityResponse {
  message: string;
  dataRes: AvailabilityPeriod[];
}

@Component({
  selector: 'app-availability-calendar',
  imports: [CommonModule],
  templateUrl: './availability-calendar.html',
  styleUrl: './availability-calendar.scss',
})
export class AvailabilityCalendarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() unitId?: string;
  @Input() availabilityPeriods?: AvailabilityPeriod[] | null;
  @Output() dateRangeSelected = new EventEmitter<{ startDate: Date; endDate: Date }>();

  currentDate = new Date();
  calendarMonth = new Date().getMonth();
  calendarYear = new Date().getFullYear();
  calendarDays: CalendarDay[] = [];
  availableCount = 0;

  // Date range selection
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  isSelectingRange = false;

  // API data
  private resolvedAvailabilityPeriods: AvailabilityPeriod[] = [];
  private subscription: Subscription | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    if (!this.unitId && !Array.isArray(this.availabilityPeriods)) {
      this.generateCalendar();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('unitId' in changes || 'availabilityPeriods' in changes) {
      this.initializeAvailabilitySource();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private initializeAvailabilitySource(): void {
    if (this.tryUsePreloadedAvailability()) {
      return;
    }

    if (this.unitId) {
      this.loadAvailability();
      return;
    }

    this.generateCalendar();
  }

  private tryUsePreloadedAvailability(): boolean {
    if (!Array.isArray(this.availabilityPeriods)) {
      return false;
    }

    this.subscription?.unsubscribe();
    this.resolvedAvailabilityPeriods = this.availabilityPeriods;
    this.isLoading = false;
    this.errorMessage = '';
    this.generateCalendar();
    return true;
  }

  loadAvailability(): void {
    if (!this.unitId) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.subscription = this.apiService
      .get<AvailabilityResponse>(`/availability/${this.unitId}/unit-availability`)
      .subscribe({
        next: (response) => {
          console.log('Availability Response:', response);
          this.resolvedAvailabilityPeriods = response.dataRes;
          this.generateCalendar();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading availability:', error);
          this.errorMessage = 'Failed to load availability';
          this.isLoading = false;
          this.generateCalendar();
        },
      });
  }

  generateCalendar(): void {
    const firstDay = new Date(this.calendarYear, this.calendarMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    this.availableCount = 0;

    for (let i = 0; i < 42; i++) {
      const current = new Date(startDate);
      current.setDate(startDate.getDate() + i);

      const isCurrentMonth = current.getMonth() === this.calendarMonth;
      const isPast = current < new Date(new Date().setHours(0, 0, 0, 0));

      let status: 'available' | 'unavailable' | 'past';

      if (isPast) {
        status = 'past';
      } else {
        status = this.getDateStatus(current);
        if (status === 'available' && isCurrentMonth) {
          this.availableCount++;
        }
      }

      const isSelected = this.isDateSelected(current);
      const isInRange = this.isDateInRange(current);

      days.push({
        date: current.getDate(),
        status,
        isCurrentMonth,
        fullDate: new Date(current),
        isToday: this.isToday(current),
        isSelected,
        isInRange,
      });
    }

    this.calendarDays = days;
  }

  private getDateStatus(date: Date): 'available' | 'unavailable' {
    if (this.resolvedAvailabilityPeriods.length === 0) {
      return 'unavailable';
    }

    for (const period of this.resolvedAvailabilityPeriods) {
      if (period.status !== 'available') continue;

      const startDate = new Date(period.startDate);
      const endDate = new Date(period.endDate);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      const checkDate = new Date(date);
      checkDate.setHours(12, 0, 0, 0);

      if (checkDate >= startDate && checkDate <= endDate) {
        return 'available';
      }
    }

    return 'unavailable';
  }

  private isDateSelected(date: Date): boolean {
    if (!this.selectedStartDate && !this.selectedEndDate) return false;

    const dateStr = this.formatDateForComparison(date);
    const startStr = this.selectedStartDate
      ? this.formatDateForComparison(this.selectedStartDate)
      : null;
    const endStr = this.selectedEndDate ? this.formatDateForComparison(this.selectedEndDate) : null;

    return dateStr === startStr || dateStr === endStr;
  }

  private isDateInRange(date: Date): boolean {
    if (!this.selectedStartDate || !this.selectedEndDate) return false;
    return date > this.selectedStartDate && date < this.selectedEndDate;
  }

  previousMonth(): void {
    if (this.calendarMonth === 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    } else {
      this.calendarMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.calendarMonth === 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    } else {
      this.calendarMonth++;
    }
    this.generateCalendar();
  }

  onDateClick(day: CalendarDay): void {
    if (day.status === 'unavailable' || day.status === 'past') {
      return;
    }

    if (!this.selectedStartDate) {
      this.selectedStartDate = day.fullDate;
      this.selectedEndDate = null;
      this.isSelectingRange = true;
      this.generateCalendar();
      return;
    }

    if (this.isSelectingRange) {
      if (day.fullDate <= this.selectedStartDate) {
        this.selectedStartDate = day.fullDate;
        this.selectedEndDate = null;
        this.generateCalendar();
        return;
      }

      if (this.hasUnavailableDatesInRange(this.selectedStartDate, day.fullDate)) {
        this.selectedStartDate = day.fullDate;
        this.selectedEndDate = null;
        this.generateCalendar();
        return;
      }

      this.selectedEndDate = day.fullDate;
      this.isSelectingRange = false;
      this.generateCalendar();

      this.dateRangeSelected.emit({
        startDate: this.selectedStartDate,
        endDate: this.selectedEndDate,
      });

      return;
    }

    this.selectedStartDate = day.fullDate;
    this.selectedEndDate = null;
    this.isSelectingRange = true;
    this.generateCalendar();
  }

  private hasUnavailableDatesInRange(startDate: Date, endDate: Date): boolean {
    const current = new Date(startDate);
    current.setDate(current.getDate() + 1);

    while (current < endDate) {
      const status = this.getDateStatus(current);
      if (status !== 'available') {
        return true;
      }
      current.setDate(current.getDate() + 1);
    }

    return false;
  }

  clearSelection(): void {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.isSelectingRange = false;
    this.generateCalendar();
  }

  getMonthName(): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${months[this.calendarMonth]} ${this.calendarYear}`;
  }

  getDayClasses(day: CalendarDay): string {
    let classes =
      'aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all relative min-h-[32px] sm:min-h-[40px]';

    if (day.isCurrentMonth) {
      classes += ' text-gray-700';
    } else {
      classes += ' text-gray-400';
    }

    if (day.status === 'available') {
      classes +=
        ' bg-green-50 border-green-200 cursor-pointer hover:scale-105 hover:shadow-md hover:bg-green-100';
    } else if (day.status === 'unavailable') {
      classes += ' bg-gray-100 border-gray-200 cursor-not-allowed opacity-40';
    } else if (day.status === 'past') {
      classes += ' bg-gray-50 border-gray-200 cursor-not-allowed opacity-60';
    }

    if (day.isSelected) {
      classes += ' !bg-[#de5806] !border-[#de5806] !text-white ring-2 ring-[#de5806] ring-offset-2';
    } else if (day.isInRange) {
      classes += ' !bg-orange-100 !border-orange-300';
    }

    if (day.isToday && !day.isSelected) {
      classes += ' ring-2 ring-blue-400 ring-offset-1';
    }

    return classes;
  }

  private formatDateForComparison(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }
}
