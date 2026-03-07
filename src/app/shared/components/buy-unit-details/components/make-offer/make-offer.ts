import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';

type OfferTargetType = 'unit' | 'property' | 'project';
type OfferType = 'cash' | 'installment';

interface OfferPayload {
  targetType: OfferTargetType;
  targetId: string;
  salePriceId: string;
  buyerSnapshot: {
    name: string;
    phone: string;
    email: string;
  };
  offeredPrice: number;
  offerType: OfferType;
  paymentPlanProposal?: {
    downPaymentAmount: number;
    years: number;
    interestRate: number;
  };
  notes?: string;
}

interface CreatedOffer {
  _id: string;
  status: string;
}

interface OfferResponse {
  message: string;
  offer: CreatedOffer;
}

@Component({
  selector: 'app-make-offer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './make-offer.html',
  styleUrl: './make-offer.scss',
})
export class MakeOffer {
  @Input() targetType: OfferTargetType = 'unit';
  @Input() targetId: string = '';
  @Input() salePriceId: string = '';

  @Output() closeModal = new EventEmitter<void>();

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  createdOfferId = '';
  createdOfferStatus = '';

  formData = {
    name: '',
    phone: '',
    email: '',
    offerPrice: '',
    paymentMethod: 'cash',
    downPaymentAmount: '',
    years: '',
    interestRate: '',
    notes: '',
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.createdOfferId = '';
    this.createdOfferStatus = '';

    if (!this.targetId) {
      this.errorMessage = 'Missing targetId for this offer.';
      return;
    }

    if (!this.salePriceId) {
      this.errorMessage = 'Missing salePriceId for this offer.';
      return;
    }

    const token = this.authService.getAccessToken();
    if (!token) {
      this.errorMessage = 'You need to login first.';
      return;
    }

    const offeredPrice = Number(this.formData.offerPrice);
    if (!Number.isFinite(offeredPrice) || offeredPrice <= 0) {
      this.errorMessage = 'Please enter a valid offered price.';
      return;
    }

    const offerType = this.formData.paymentMethod === 'installment' ? 'installment' : 'cash';
    const payload = this.buildPayload(offeredPrice, offerType);

    if (!payload) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.isSubmitting = true;
    this.http.post<OfferResponse>(`${environment.api.baseUrl}/offer`, payload, { headers }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response?.message || 'Offer created successfully.';
        this.createdOfferId = response?.offer?._id || '';
        this.createdOfferStatus = response?.offer?.status || '';
        setTimeout(() => this.closeModal.emit(), 5000);
        console.log('Offer created successfully:', response);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error?.error?.message || 'Failed to submit offer. Please try again.';
      console.error('Offer submission error:', error);
      },
    });
  }

  onClose(): void {
    if (this.isSubmitting) return;
    this.closeModal.emit();
  }

  private buildPayload(offeredPrice: number, offerType: OfferType): OfferPayload | null {
    const payload: OfferPayload = {
      targetType: this.targetType,
      targetId: this.targetId,
      salePriceId: this.salePriceId,
      buyerSnapshot: {
        name: this.formData.name.trim(),
        phone: this.formData.phone.trim(),
        email: this.formData.email.trim(),
      },
      offeredPrice,
      offerType,
      notes: this.formData.notes.trim() || undefined,
    };

    if (offerType === 'installment') {
      const downPaymentAmount = Number(this.formData.downPaymentAmount);
      const years = Number(this.formData.years);
      const interestRate = Number(this.formData.interestRate);

      if (!Number.isFinite(downPaymentAmount) || downPaymentAmount <= 0) {
        this.errorMessage = 'Please enter a valid down payment amount.';
        return null;
      }

      if (!Number.isFinite(years) || years <= 0) {
        this.errorMessage = 'Please enter a valid number of years.';
        return null;
      }

      if (!Number.isFinite(interestRate) || interestRate < 0) {
        this.errorMessage = 'Please enter a valid interest rate.';
        return null;
      }

      payload.paymentPlanProposal = {
        downPaymentAmount,
        years,
        interestRate,
      };
    }

    return payload;
  }
}
