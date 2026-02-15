import { Component, computed, OnInit, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService, PaymentMethod } from '../../services/payment.service';
import { PaymentMethodComponent } from './component/payment-method/payment-method';
import { CardComponent } from './component/card/card';
import { WalletComponent } from './component/wallet/wallet';
import { BankComponent } from './component/bank/bank';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule, PaymentMethodComponent, CardComponent, WalletComponent, BankComponent],
  templateUrl: './pay.html',
  styleUrl: './pay.scss',
})
export class Pay implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  currentStep = signal<number>(1);
  selectedMethod = signal<PaymentMethod | null>(null);

  paymentData = computed(() => this.paymentService.currentPaymentData());

  // Computed values for display
  planTitle = computed(() => this.paymentData()?.plan.title || '');
  planPrice = computed(() => {
    const data = this.paymentData();
    if (!data) return 0;
    return data.billing === 'yearly' ? data.plan.priceYearly : data.plan.priceMonthly;
  });
  planCurrency = computed(() => this.paymentData()?.plan.currency || 'EGP');
  planPeriod = computed(() => {
    const data = this.paymentData();
    if (!data) return '';
    return data.billing === 'yearly' ? data.plan.periodLabelYearly : data.plan.periodLabelMonthly;
  });

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    // Modal will handle the display, no need to check
  }

  onPaymentMethodSelected(method: PaymentMethod) {
    this.selectedMethod.set(method);
    this.paymentService.setPaymentMethod(method);
    // Move to step 2 immediately
    this.currentStep.set(2);
  }

  closePayment() {
    this.paymentService.clearPaymentData();
    this.closeModal.emit();
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }
}
