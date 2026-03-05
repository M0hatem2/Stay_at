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
import {
  BookingService,
  CreateBookingRequest,
} from '../../../features/rent/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-book-the-apartment',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-the-apartment.html',
  styleUrl: './book-the-apartment.scss',
})
export class BookTheApartment implements OnInit, OnChanges {
  @Input() unitId: string | null = null;
  @Input() selectedStartDate?: Date | null;
  @Input() selectedEndDate?: Date | null;
  @Input() defaultGuests: number = 1;
  @Input() defaultRentalType: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily';
  @Input() defaultCurrency: string = 'EGP';
  @Input() defaultCity: string = '';
  @Input() defaultState: string = '';
  @Input() defaultCountry: string = '';
  @Output() closePopup = new EventEmitter<void>();

  // Form fields
  name: string = '';
  email: string = '';
  mobileNumber: string = '';
  numberOfGuests: number = 1;
  checkInDate: string = '';
  checkOutDate: string = '';
  rentalType: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily';
  paymentMethod: 'card' | 'wallet' = 'card';
  currency: string = 'EGP';
  city: string = '';
  state: string = '';
  country: string = '';
  message: string = '';

  isDateDisabled: boolean = false;
  isSubmitting: boolean = false;
  submitError: string = '';
  submitSuccess: string = '';

  readonly guestOptions = [1, 2, 3, 4, 5];

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log('🚀 BookTheApartment Component Initialized');
    console.log('📥 Input Properties:');
    console.log('- Unit ID:', this.unitId);
    console.log('- Selected Start Date:', this.selectedStartDate);
    console.log('- Selected End Date:', this.selectedEndDate);
    console.log('- Default Guests:', this.defaultGuests);
    console.log('- Default Rental Type:', this.defaultRentalType);
    console.log('- Default Currency:', this.defaultCurrency);
    console.log('- Default City:', this.defaultCity);
    console.log('- Default State:', this.defaultState);
    console.log('- Default Country:', this.defaultCountry);
    
    this.applyDefaults();
    this.updateDates();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('🔄 Component Input Changes Detected:', changes);
    
    if (changes['selectedStartDate'] || changes['selectedEndDate']) {
      console.log('📅 Date changes detected - updating dates');
      this.updateDates();
    }

    if (
      changes['defaultGuests'] ||
      changes['defaultRentalType'] ||
      changes['defaultCurrency'] ||
      changes['defaultCity'] ||
      changes['defaultState'] ||
      changes['defaultCountry']
    ) {
      console.log('🔧 Default value changes detected - applying new defaults');
      this.applyDefaults();
    }
  }

  private updateDates() {
    console.log('📅 Updating Dates from Input Properties:');
    console.log('- Selected Start Date:', this.selectedStartDate);
    console.log('- Selected End Date:', this.selectedEndDate);
    
    if (this.selectedStartDate) {
      this.checkInDate = this.formatDateForInput(this.selectedStartDate);
      this.isDateDisabled = true;
      console.log('✅ Start date formatted:', this.checkInDate);
    }
    if (this.selectedEndDate) {
      this.checkOutDate = this.formatDateForInput(this.selectedEndDate);
      this.isDateDisabled = true;
      console.log('✅ End date formatted:', this.checkOutDate);
    }
    
    console.log('- Date fields disabled:', this.isDateDisabled);
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private applyDefaults(): void {
    console.log('🔧 Applying Default Values:');
    console.log('- Default Guests:', this.defaultGuests, '→ Applied:', this.defaultGuests || 1);
    console.log('- Default Rental Type:', this.defaultRentalType, '→ Applied:', this.defaultRentalType || 'daily');
    console.log('- Default Currency:', this.defaultCurrency, '→ Applied:', this.defaultCurrency || 'EGP');
    console.log('- Default City:', this.defaultCity, '→ Applied:', this.defaultCity || '');
    console.log('- Default State:', this.defaultState, '→ Applied:', this.defaultState || this.defaultCity || '');
    console.log('- Default Country:', this.defaultCountry, '→ Applied:', this.defaultCountry || '');
    
    this.numberOfGuests = this.defaultGuests || 1;
    this.rentalType = this.defaultRentalType || 'daily';
    this.currency = this.resolveCurrencyCode(this.defaultCurrency);
    this.city = this.defaultCity || '';
    this.state = this.defaultState || this.defaultCity || '';
    this.country = this.defaultCountry || '';
    
    console.log('✅ Defaults applied successfully');
  }

  onClose() {
    console.log('❌ Booking popup closed by user');
    this.closePopup.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitError = '';
    this.submitSuccess = '';

    console.log('🏁 Starting Booking Process...');
    console.log('📊 Current Form Data:');
    console.log('- Unit ID:', this.unitId);
    console.log('- Name:', this.name);
    console.log('- Email:', this.email);
    console.log('- Mobile Number:', this.mobileNumber);
    console.log('- Number of Guests:', this.numberOfGuests);
    console.log('- Check-in Date:', this.checkInDate);
    console.log('- Check-out Date:', this.checkOutDate);
    console.log('- Rental Type:', this.rentalType);
    console.log('- Payment Method:', this.paymentMethod);
    console.log('- Currency:', this.currency);
    console.log('- City:', this.city);
    console.log('- State:', this.state);
    console.log('- Country:', this.country);
    console.log('- Message:', this.message);
    console.log('- Is Date Disabled:', this.isDateDisabled);

    const accessToken = this.authService.getAccessToken();
    console.log('🔐 Authentication Status:', !!accessToken);
    
    if (!accessToken) {
      console.log('❌ No access token found - User not authenticated');
      this.submitError = 'Please login first to continue booking.';
      return;
    }

    if (!this.unitId) {
      console.log('❌ Validation failed: Unit ID is missing');
      this.submitError = 'Unit ID is missing.';
      return;
    }

    console.log('✅ Unit ID validation passed');

    // Validate required fields
    const requiredFields = {
      name: this.name.trim(),
      email: this.email.trim(),
      mobileNumber: this.mobileNumber.trim(),
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };

    console.log('🔍 Validating Required Fields:', requiredFields);

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log('❌ Validation failed: Missing required fields:', missingFields);
      this.submitError = 'Please complete all required booking fields.';
      return;
    }

    console.log('✅ All required fields validation passed');

    // Validate dates
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);
    
    console.log('📅 Date Validation:');
    console.log('- Check-in Date:', checkIn);
    console.log('- Check-out Date:', checkOut);
    console.log('- Check-out > Check-in:', checkOut > checkIn);

    if (checkOut <= checkIn) {
      console.log('❌ Date validation failed: Check-out date must be after check-in date');
      this.submitError = 'Departure date must be after arrival date.';
      return;
    }

    console.log('✅ Date validation passed');

    // Prepare and sanitize data
    console.log('🧹 Data Processing and Sanitization:');
    const sanitizedMobile = this.sanitizePhoneNumber(this.mobileNumber);
    const normalizedRentalType = this.normalizeRentalType(this.rentalType);
    const normalizedCurrency = this.resolveCurrencyCode(this.currency, this.defaultCurrency);
    const normalizedCity = this.resolveLocationText(this.city, this.defaultCity, 'Cairo');
    const normalizedState = this.resolveLocationText(
      this.state,
      this.defaultState || normalizedCity,
      normalizedCity,
    );
    const normalizedCountry = this.resolveLocationText(this.country, this.defaultCountry, 'Egypt');
    
    console.log('- Original Mobile:', this.mobileNumber, '→ Sanitized:', sanitizedMobile);
    console.log('- Original Rental Type:', this.rentalType, '-> Normalized:', normalizedRentalType);
    console.log('- Original Currency:', this.currency, '-> Normalized:', normalizedCurrency);
    console.log('- Original City:', this.city, '-> Normalized:', normalizedCity);
    console.log('- Original State:', this.state, '-> Normalized:', normalizedState);
    console.log('- Original Country:', this.country, '-> Normalized:', normalizedCountry);

    const payload: CreateBookingRequest = {
      unitId: this.unitId,
      paymentMethod: this.paymentMethod,
      name: this.name.trim(),
      email: this.email.trim(),
      mobileNumber: sanitizedMobile,
      numberOfGuests: Number(this.numberOfGuests),
      arrivalDate: this.checkInDate,
      departureDate: this.checkOutDate,
      rentalType: normalizedRentalType,
      currency: normalizedCurrency,
      city: normalizedCity,
      state: normalizedState,
      country: normalizedCountry,
    };

    console.log('🚀 Booking Payload Being Sent:', JSON.stringify(payload, null, 2));
    console.log('📋 Detailed Payload Structure:');
    console.log('- Unit ID:', payload.unitId);
    console.log('- Payment Method:', payload.paymentMethod);
    console.log('- Guest Name:', payload.name);
    console.log('- Email:', payload.email);
    console.log('- Mobile Number:', payload.mobileNumber);
    console.log('- Number of Guests:', payload.numberOfGuests);
    console.log('- Arrival Date:', payload.arrivalDate);
    console.log('- Departure Date:', payload.departureDate);
    console.log('- Rental Type:', payload.rentalType);
    console.log('- Currency:', payload.currency);
    console.log('- City:', payload.city);
    console.log('- State:', payload.state);
    console.log('- Country:', payload.country);

    this.isSubmitting = true;
    this.bookingService.createBooking(payload).subscribe({
      next: (response) => {
        console.log('✅ Booking Response Received:', JSON.stringify(response, null, 2));
        console.log('🔗 Response Details:');
        const paymentUrl = this.extractPaymentUrl(response);
        console.log('- Payment URL:', paymentUrl || '(empty)');
        console.log('- Full Response Object:', response);
        
        this.isSubmitting = false;
        if (paymentUrl) {
          console.log('Redirecting to payment URL:', paymentUrl);
          window.location.href = paymentUrl;
          return;
        }
        if (this.paymentMethod === 'wallet') {
          this.submitSuccess = 'Booking created successfully with wallet.';
          console.log('Wallet booking completed without redirect URL');
          return;
        }
        this.submitSuccess = '';
        this.submitError = 'Booking was created, but payment link is missing. Please try again or contact support.';
        console.error('❌ Error: Payment URL missing from response');
      },
      error: (error) => {
        console.error('❌ Booking Error Received:', error);
        console.log('📝 Error Details:');
        console.log('- Error Object:', JSON.stringify(error, null, 2));
        console.log('- Error Message:', error?.error?.message || error?.message);
        console.log('- HTTP Status:', error?.status);
        console.log('- Status Text:', error?.statusText);
        console.log('- Error Headers:', error?.headers);
        
        this.isSubmitting = false;
        this.submitSuccess = '';
        this.submitError = error?.error?.message || error?.message || 'Failed to create booking.';
        console.error('Failed to create booking:', error);
      },
    });
  }
  private extractPaymentUrl(response: unknown): string {
    const value = response as any;
    const candidates = [
      value?.URL,
      value?.url,
      value?.paymentUrl,
      value?.paymentURL,
      value?.redirectUrl,
      value?.data?.URL,
      value?.data?.url,
      value?.data?.paymentUrl,
      value?.data?.paymentURL,
      value?.data?.redirectUrl,
    ];

    const validUrl = candidates.find(
      (candidate) => typeof candidate === 'string' && candidate.trim().length > 0,
    );

    return validUrl ? String(validUrl).trim() : '';
  }
  private sanitizePhoneNumber(value: string): string {
    const sanitized = value.replace(/\D/g, '');
    console.log('📱 Phone Number Sanitization:', value, '→', sanitized);
    return sanitized;
  }

  private normalizeRentalType(
    value: 'daily' | 'weekly' | 'monthly' | 'yearly',
  ): 'daily' | 'weekly' | 'monthly' | 'yearly' {
    const normalized = String(value || 'daily').toLowerCase();
    let result: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily';
    
    if (normalized === 'weekly') result = 'weekly';
    else if (normalized === 'monthly') result = 'monthly';
    else if (normalized === 'yearly') result = 'yearly';
    else result = 'daily';
    
    console.log('🏷️  Rental Type Normalization:', value, '→', result);
    return result;
  }

  private resolveCurrencyCode(value: string, fallback: string = 'EGP'): string {
    const fromValue = this.extractCurrencyCode(value);
    if (fromValue) {
      return fromValue;
    }

    const fromFallback = this.extractCurrencyCode(fallback);
    if (fromFallback) {
      return fromFallback;
    }

    return 'EGP';
  }

  private extractCurrencyCode(value: string | null | undefined): string | null {
    const normalized = String(value || '')
      .trim()
      .toUpperCase();

    if (!normalized) {
      return null;
    }

    return /^[A-Z]{3}$/.test(normalized) ? normalized : null;
  }

  private resolveLocationText(
    value: string | null | undefined,
    fallbackValue: string | null | undefined,
    defaultValue: string,
  ): string {
    const primary = this.normalizeLocationText(value);
    if (primary) {
      return primary;
    }

    const fallback = this.normalizeLocationText(fallbackValue);
    if (fallback) {
      return fallback;
    }

    return this.normalizeLocationText(defaultValue) || defaultValue;
  }

  private normalizeLocationText(value: string | null | undefined): string {
    const normalized = String(value || '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!normalized) {
      return '';
    }

    return this.toTitleCase(normalized);
  }

  private toTitleCase(value: string): string {
    const result = value
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    console.log('🔤 Title Case Conversion:', value, '→', result);
    return result;
  }
}




