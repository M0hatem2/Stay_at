import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss'],
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  email: string = '';
  otp: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );

    // Get email and OTP from route params if available
    this.route.queryParams.subscribe((params) => {
      if (params['email']) {
        this.email = params['email'];
        this.resetForm.patchValue({ email: this.email });
      }
      if (params['otp']) {
        this.otp = params['otp'];
        this.resetForm.patchValue({ otp: this.otp });
      }
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      const errors = confirmPassword?.errors;
      if (errors) {
        delete errors['mismatch'];
        confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
      }
    }
    return null;
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { email, otp, newPassword } = this.resetForm.value;

      this.authService.resetPassword(email, otp, newPassword).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.successMessage =
            'Password reset successfully! You can now sign in with your new password.';
          // Clear form
          this.resetForm.reset();

          // Redirect to sign in after a short delay
          setTimeout(() => {
            this.router.navigate(['/auth/sign-in']);
          }, 3000);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Reset password failed:', error);
          this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
        },
      });
    }
  }

  // Navigate back to sign in
  goToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  // Navigate to forgot password
  goToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }
}
