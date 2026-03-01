import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentApiService, SubscriptionRequest } from '../../../../services/payment-api.service';
import { PaymentService } from '../../../../services/payment.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  @Input() subscriptionId: string = '';
  @Input() planTitle: string = '';
  @Input() planPrice: number = 0;
  @Input() planCurrency: string = 'EGP';
  @Input() planPeriod: string = '';
  @Output() back = new EventEmitter<void>();
  @Output() paymentSuccess = new EventEmitter<void>();

  // Form fields
  mobileNumber = signal<string>('01010101010');

  isProcessing = signal<boolean>(false);
  errorMessage = signal<string>('');
  paymentUrl = signal<string>('');
  showPaymentButton = signal<boolean>(false);

  // Get payment data from service
  paymentData = computed(() => this.paymentService.currentPaymentData());

  constructor(
    private paymentApiService: PaymentApiService,
    private paymentService: PaymentService,
  ) {}

  onBack() {
    this.back.emit();
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  onSubmit() {
    const data = this.paymentData();
    if (!data) {
      this.errorMessage.set('Payment data not found');
      return;
    }

    if (!this.mobileNumber()) {
      this.errorMessage.set('Please enter mobile number');
      return;
    }

    this.isProcessing.set(true);
    this.errorMessage.set('');

    const subscriptionRequest: SubscriptionRequest = {
      planId: data.plan.id,
      billingCycle: data.billing as 'monthly' | 'yearly',
      paymentMethod: 'card',
      mobileNumber: this.mobileNumber(),
    };

    this.paymentApiService.createSubscription(subscriptionRequest).subscribe({
      next: (response) => {
        console.log('Subscription created:', response);
        this.paymentUrl.set(response.URL);
        this.showPaymentButton.set(true);
        this.isProcessing.set(false);
      },
      error: (err) => {
        console.error('Subscription error:', err);
        this.isProcessing.set(false);
        this.errorMessage.set(
          err.error?.message || 'Failed to create subscription. Please try again.',
        );
      },
    });
  }

  redirectToPayment() {
    if (this.paymentUrl()) {
      window.open(this.paymentUrl(), '_blank');
    }
  }
}
