import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss'],
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const email = this.forgotForm.value.email;

      this.authService.forgotPassword(email).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.successMessage = 'Password reset link sent to your email! Please check your inbox.';
          // Clear form
          this.forgotForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Forgot password failed:', error);
          this.errorMessage =
            error.error?.message || 'Failed to send reset link. Please try again.';
        },
      });
    }
  }

  // Navigate back to sign in
  goToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  // Navigate to reset password
  goToResetPassword() {
    this.router.navigate(['/auth/reset-password']);
  }
}
