import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-make-offer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './make-offer.html',
  styleUrl: './make-offer.scss',
})
export class MakeOffer {
  @Output() closeModal = new EventEmitter<void>();

  formData = {
    name: '',
    phone: '',
    email: '',
    offerPrice: '',
    paymentMethod: 'cash',
    notes: ''
  };

  onSubmit(): void {
    console.log('Offer submitted:', this.formData);
    // Here you would typically call a service to submit the offer
    this.closeModal.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
