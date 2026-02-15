import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
 
@Component({
  selector: 'app-resend-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resend-otp.html',
  styleUrls: ['./resend-otp.scss'],
})
export class ResendOtpComponent {
  resendForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.resendForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.resendForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const email = this.resendForm.value.email;

      this.authService.resendOTP(email).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.successMessage = 'OTP sent successfully! Please check your email.';
          // Clear form
          this.resendForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Resend OTP failed:', error);
          this.errorMessage = error.error?.message || 'Failed to resend OTP. Please try again.';
        },
      });
    }
  }

  // Navigate to confirm email page
  goToConfirmEmail() {
    this.router.navigate(['/auth/confirm-email']);
  }

  // Navigate to refresh token page
  goToRefreshToken() {
    this.router.navigate(['/auth/refresh-token']);
  }
}
