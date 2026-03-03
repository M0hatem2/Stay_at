import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-the-apartment',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-the-apartment.html',
  styleUrl: './book-the-apartment.scss',
})
export class BookTheApartment implements OnInit, OnChanges {
  @Input() selectedStartDate?: Date | null;
  @Input() selectedEndDate?: Date | null;
  @Output() closePopup = new EventEmitter<void>();

  // Form fields
  checkInDate: string = '';
  checkOutDate: string = '';
  isDateDisabled: boolean = false;

  ngOnInit() {
    this.updateDates();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedStartDate'] || changes['selectedEndDate']) {
      this.updateDates();
    }
  }

  private updateDates() {
    if (this.selectedStartDate) {
      this.checkInDate = this.formatDateForInput(this.selectedStartDate);
      this.isDateDisabled = true;
    }
    if (this.selectedEndDate) {
      this.checkOutDate = this.formatDateForInput(this.selectedEndDate);
      this.isDateDisabled = true;
    }
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onClose() {
    this.closePopup.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Booking submitted:', {
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    });
    // يمكنك إضافة منطق الحجز هنا
  }
}
