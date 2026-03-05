import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-viewing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-viewing.html',
  styleUrl: './schedule-viewing.scss',
})
export class ScheduleViewing {
  @Output() closeModal = new EventEmitter<void>();

  formData = {
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    notes: ''
  };

  timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '18:00', label: '6:00 PM' },
  ];

  // Get today's date in YYYY-MM-DD format for min date
  get minDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit(): void {
    console.log('Viewing scheduled:', this.formData);
    // Here you would typically call a service to submit the booking
    this.closeModal.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
