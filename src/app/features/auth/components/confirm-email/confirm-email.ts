import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirm-email.html',
  styleUrls: ['./confirm-email.scss'],
})
export class ConfirmEmailComponent {
  confirmForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.confirmForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  onSubmit() {
    if (this.confirmForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { email, otp } = this.confirmForm.value;

      this.authService.confirmEmail(email, otp).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.successMessage = 'Email confirmed successfully! You can now sign in.';
          // Clear form
          this.confirmForm.reset();

          // Redirect to sign in after a short delay
          setTimeout(() => {
            this.router.navigate(['/auth/sign-in']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Email confirmation failed:', error);
          this.errorMessage = error.error?.message || 'Invalid OTP or email. Please try again.';
        },
      });
    }
  }

  // Resend OTP
  resendOTP() {
    const email = this.confirmForm.value.email;
    if (email) {
      this.authService.resendOTP(email).subscribe({
        next: (response: any) => {
          this.successMessage = 'OTP sent successfully! Please check your email.';
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to resend OTP. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please enter your email address first.';
    }
  }

  // Navigate to resend OTP page
  goToResendOTP() {
    this.router.navigate(['/auth/resend-otp']);
  }

  // Navigate to refresh token page
  goToRefreshToken() {
    this.router.navigate(['/auth/refresh-token']);
  }
}
