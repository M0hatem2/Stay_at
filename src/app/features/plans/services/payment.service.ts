import { Injectable, signal } from '@angular/core';
import { PlanCard } from '../models/plan.model';

export type PaymentMethod = 'card' | 'wallet' | 'bank';

export interface PaymentData {
  plan: PlanCard;
  planType: string;
  billing: string;
  subscriptionId?: string; // Add subscriptionId
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentData = signal<PaymentData | null>(null);
  private selectedMethod = signal<PaymentMethod | null>(null);

  // Expose as readonly
  readonly currentPaymentData = this.paymentData.asReadonly();
  readonly currentMethod = this.selectedMethod.asReadonly();

  setPaymentData(data: PaymentData) {
    this.paymentData.set(data);
  }

  setPaymentMethod(method: PaymentMethod) {
    this.selectedMethod.set(method);
  }

  clearPaymentData() {
    this.paymentData.set(null);
    this.selectedMethod.set(null);
  }
}
