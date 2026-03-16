import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface CreateBookingRequest {
  unitId: string;
  paymentMethod: 'card' | 'wallet';
  name: string;
  email: string;
  mobileNumber: string;
  numberOfGuests: number;
  arrivalDate: string;
  departureDate: string;
  rentalType: 'daily' | 'weekly' | 'monthly' | 'yearly';
  currency: string;
  city: string;
  state: string;
  country: string;
}

export interface CreateBookingResponse {
  URL: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor() { }

  createBooking(payload: CreateBookingRequest): Observable<CreateBookingResponse> {
    const bookingReference = `BK-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const paymentAmountEstimate = this.estimatePaymentAmount(payload);

    const paymentQuery = new URLSearchParams({
      bookingRef: bookingReference,
      unitId: payload.unitId,
      method: payload.paymentMethod,
      rentalType: payload.rentalType,
      amount: String(paymentAmountEstimate),
      currency: payload.currency,
    });

    const paymentUrl =
      payload.paymentMethod === 'card'
        ? `https://stay-at.demo/pay?${paymentQuery.toString()}`
        : '';

    return of({ URL: paymentUrl }).pipe(delay(450));
  }

  private estimatePaymentAmount(payload: CreateBookingRequest): number {
    const start = new Date(payload.arrivalDate).getTime();
    const end = new Date(payload.departureDate).getTime();
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

    const baseDailyByRentalType: Record<CreateBookingRequest['rentalType'], number> = {
      daily: 1800,
      weekly: 1500,
      monthly: 1200,
      yearly: 950,
    };

    const baseDaily = baseDailyByRentalType[payload.rentalType] || 1800;
    const guestFactor = 1 + Math.max(0, payload.numberOfGuests - 1) * 0.06;
    return Math.round(baseDaily * days * guestFactor);
  }
}
