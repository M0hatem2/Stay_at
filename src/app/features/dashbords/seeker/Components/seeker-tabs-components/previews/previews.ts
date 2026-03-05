import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeekerViewingItem, SeekerViewingsService } from '../../../services/seeker-viewings.service';

@Component({
  selector: 'app-previews',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './previews.html',
  styleUrl: './previews.scss',
})
export class Previews implements OnInit {
  viewings: SeekerViewingItem[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private seekerViewingsService: SeekerViewingsService) {}

  ngOnInit(): void {
    this.loadViewings();
  }

  loadViewings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.seekerViewingsService.getViewings().subscribe({
      next: (response) => {
        this.viewings = response?.viewings || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading seeker viewings:', error);
        this.errorMessage = 'Failed to load scheduled visits';
        this.viewings = [];
        this.isLoading = false;
      },
    });
  }

  trackByViewingId(_: number, viewing: SeekerViewingItem): string {
    return viewing.viewingId;
  }

  getStatusLabel(status: string): string {
    const normalizedStatus = (status || '').trim().toLowerCase();
    if (normalizedStatus === 'confirmed') return 'Confirmed';
    if (normalizedStatus === 'cancelled') return 'Cancelled';
    return 'Pending';
  }

  getStatusClasses(status: string): string {
    const normalizedStatus = (status || '').trim().toLowerCase();
    if (normalizedStatus === 'confirmed') return 'bg-green-100 text-green-700';
    if (normalizedStatus === 'cancelled') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  }

  getDisplayTime(viewing: SeekerViewingItem): string {
    const timeSlot = (viewing.timeSlot || '').trim();
    if (timeSlot) return timeSlot.replace('Z', '').slice(0, 5);

    const dateValue = new Date(viewing.scheduledDate);
    if (Number.isNaN(dateValue.getTime())) return 'N/A';

    return dateValue.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  getContactName(viewing: SeekerViewingItem): string {
    return viewing.requester?.name || viewing.owner?.name || 'N/A';
  }

  getContactPhone(viewing: SeekerViewingItem): string {
    return viewing.requester?.phone || viewing.owner?.phone || 'N/A';
  }
}
