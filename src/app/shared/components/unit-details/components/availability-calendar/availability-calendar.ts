import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarDay {
  date: number;
  status: 'available' | 'occupied' | 'pending' | 'past';
  isCurrentMonth: boolean;
  fullDate: Date;
  isToday: boolean;
}

@Component({
  selector: 'app-availability-calendar',
  imports: [CommonModule],
  templateUrl: './availability-calendar.html',
  styleUrl: './availability-calendar.scss',
})
export class AvailabilityCalendarComponent implements OnInit {
  @Output() dateClicked = new EventEmitter<CalendarDay>();

  currentDate = new Date();
  calendarMonth = new Date().getMonth();
  calendarYear = new Date().getFullYear();
  calendarDays: CalendarDay[] = [];
  availableCount = 0;
  occupiedCount = 0;
  pendingCount = 0;

  // Sample booking data (replace with real data from API)
  private bookedDates = new Set<string>([
    '2026-02-10',
    '2026-02-11',
    '2026-02-15',
    '2026-02-25',
    '2026-03-05',
    '2026-03-15',
    '2026-03-20',
  ]);

  private pendingDates = new Set<string>(['2026-02-18', '2026-02-22', '2026-03-08', '2026-03-12']);

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const firstDay = new Date(this.calendarYear, this.calendarMonth, 1);
    const lastDay = new Date(this.calendarYear, this.calendarMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    this.availableCount = 0;
    this.occupiedCount = 0;
    this.pendingCount = 0;

    for (let i = 0; i < 42; i++) {
      const current = new Date(startDate);
      current.setDate(startDate.getDate() + i);

      const dateStr = this.formatDateForComparison(current);
      const isCurrentMonth = current.getMonth() === this.calendarMonth;
      const isPast = current < new Date(new Date().setHours(0, 0, 0, 0));

      let status: 'available' | 'occupied' | 'pending' | 'past';

      if (isPast) {
        status = 'past';
      } else if (this.bookedDates.has(dateStr)) {
        status = 'occupied';
        this.occupiedCount++;
      } else if (this.pendingDates.has(dateStr)) {
        status = 'pending';
        this.pendingCount++;
      } else {
        status = 'available';
        if (isCurrentMonth) this.availableCount++;
      }

      days.push({
        date: current.getDate(),
        status,
        isCurrentMonth,
        fullDate: new Date(current),
        isToday: this.isToday(current),
      });
    }

    this.calendarDays = days;
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
    this.dateClicked.emit(day);
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
      'aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all relative cursor-pointer hover:scale-105 hover:shadow-md min-h-[32px] sm:min-h-[40px]';

    if (day.isCurrentMonth) {
      classes += ' bg-white text-gray-700 border-gray-200 hover:bg-gray-50';
    } else {
      classes += ' bg-gray-50 text-gray-400 border-gray-200';
    }

    if (day.isToday) {
      classes += ' ring-2 ring-[#de5806] ring-offset-2';
    }

    if (day.status === 'past') {
      classes += ' cursor-not-allowed opacity-60';
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
