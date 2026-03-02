import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { RegistrationService } from '../../../../services/registration.service';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-confirmation.html',
  styleUrl: './email-confirmation.scss',
})
export class EmailConfirmation implements AfterViewInit {
  @Input() email: string = '';
  @Input() providedOtp: string = '';
  @Output() confirmSuccess = new EventEmitter<string>(); // Emit accessToken

  otpBoxes = Array.from({ length: 6 });
  otpValue: string[] = Array(6).fill('');
  isSubmitting = false;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private registrationService: RegistrationService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      // If OTP is provided, fill it automatically
      if (this.providedOtp && this.providedOtp.length === 6) {
        this.fillOtp(this.providedOtp);
      } else {
        this.focusOtp(0);
      }
    });
  }

  fillOtp(otp: string): void {
    const digits = otp.split('');
    digits.forEach((d, i) => {
      if (i < this.otpBoxes.length) {
        this.otpValue[i] = d;
        const el = this.otpInputs.get(i)?.nativeElement;
        if (el) el.value = d;
      }
    });
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    const digit = (input.value || '').replace(/\D/g, '').slice(0, 1);
    input.value = digit;
    this.otpValue[index] = digit;

    if (digit && index < this.otpBoxes.length - 1) {
      this.focusOtp(index + 1);
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (!input.value && index > 0) {
        // ارجع للخانة اللي قبلها
        this.otpValue[index - 1] = '';
        const prev = this.otpInputs.get(index - 1)?.nativeElement;
        if (prev) {
          prev.value = '';
          prev.focus();
          prev.select();
        }
      } else {
        this.otpValue[index] = '';
      }
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) this.focusOtp(index - 1);
    if (event.key === 'ArrowRight' && index < this.otpBoxes.length - 1) this.focusOtp(index + 1);
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const text = event.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/\D/g, '').slice(0, this.otpBoxes.length).split('');

    digits.forEach((d, i) => {
      this.otpValue[i] = d;
      const el = this.otpInputs.get(i)?.nativeElement;
      if (el) el.value = d;
    });

    const nextIndex = Math.min(digits.length, this.otpBoxes.length - 1);
    this.focusOtp(nextIndex);
  }

  getOtpCode(): string {
    return this.otpValue.join('');
  }

  /**
   * Verify OTP
   */
  verifyOtp(): void {
    const otp = this.getOtpCode();

    if (otp.length !== 6) {
      alert('Please enter complete OTP code');
      return;
    }

    if (!this.email) {
      alert('Email is required');
      return;
    }

    this.isSubmitting = true;

    this.registrationService.confirmEmail({ email: this.email, otp }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        // Emit Bearer token to parent
        this.confirmSuccess.emit(response.accessToken);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('OTP verification error:', error);
        alert(error.error?.message || 'OTP verification failed. Please try again.');
      },
    });
  }

  private focusOtp(index: number): void {
    const el = this.otpInputs.get(index)?.nativeElement;
    if (!el) return;
    el.focus();
    el.select();
  }
}
