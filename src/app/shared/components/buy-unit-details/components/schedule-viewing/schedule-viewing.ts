import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';

type ViewingTargetType = 'unit' | 'property' | 'project';

interface ViewingPayload {
  targetType: ViewingTargetType;
  targetId: string;
  requesterDetails: {
    name: string;
    phone: string;
    email: string;
  };
  scheduledDate: string;
  timeSlot: string;
  notes?: string;
}

interface ViewingResponse {
  message: string;
  viewing?: {
    _id?: string;
    status?: string;
  };
}

@Component({
  selector: 'app-schedule-viewing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-viewing.html',
  styleUrl: './schedule-viewing.scss',
})
export class ScheduleViewing {
  @Input() targetType: ViewingTargetType = 'unit';
  @Input() targetId: string = '';

  @Output() closeModal = new EventEmitter<void>();

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  createdViewingId = '';
  createdViewingStatus = '';

  formData = {
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    notes: '',
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

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  // Get today's date in YYYY-MM-DD format for min date
  get minDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.createdViewingId = '';
    this.createdViewingStatus = '';

    if (!this.targetId) {
      this.errorMessage = 'Missing targetId for viewing request.';
      return;
    }

    const token = this.authService.getAccessToken();
    if (!token) {
      this.errorMessage = 'You need to login first.';
      return;
    }

    const scheduledDate = this.toScheduledDate(this.formData.date, this.formData.time);
    const timeSlot = this.toTimeSlot(this.formData.time);
    if (!scheduledDate || !timeSlot) {
      this.errorMessage = 'Please select a valid date and time.';
      return;
    }

    const payload: ViewingPayload = {
      targetType: this.targetType,
      targetId: this.targetId,
      requesterDetails: {
        name: this.formData.name.trim(),
        phone: this.formData.phone.trim(),
        email: this.formData.email.trim(),
      },
      scheduledDate,
      timeSlot,
      notes: this.formData.notes.trim() || undefined,
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.isSubmitting = true;
    this.http.post<ViewingResponse>(`${environment.api.baseUrl}/viewing`, payload, { headers }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response?.message || 'Viewing request submitted successfully.';
        this.createdViewingId = response?.viewing?._id || '';
        this.createdViewingStatus = response?.viewing?.status || '';
        setTimeout(() => this.closeModal.emit(), 900);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error?.error?.message || 'Failed to submit viewing request.';
      },
    });
  }

  onClose(): void {
    if (this.isSubmitting) return;
    this.closeModal.emit();
  }

  private toScheduledDate(date: string, time: string): string {
    if (!date || !time) return '';
    return `${date}T${time}:00Z`;
  }

  private toTimeSlot(time: string): string {
    if (!time) return '';
    return `${time}:00Z`;
  }
}
