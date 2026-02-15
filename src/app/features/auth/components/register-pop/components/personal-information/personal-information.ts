import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RegistrationService, SignUpRequest } from '../../../../services/registration.service';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-information.html',
  styleUrl: './personal-information.scss',
})
export class PersonalInformation implements OnInit {
  personalForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;

  @Output() signUpSuccess = new EventEmitter<{ email: string; otp?: string; role: string }>();

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
  ) {}

  ngOnInit(): void {
    this.personalForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[+]?[0-9]{10,15}$/)]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber;
    return !passwordValid ? { passwordStrength: true } : null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.personalForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.personalForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'This field is required';
    if (field.errors['minLength'])
      return `Minimum length is ${field.errors['minLength'].requiredLength}`;
    if (field.errors['email']) return 'Please enter a valid email address';
    if (field.errors['pattern']) return 'Please enter a valid phone number';
    if (field.errors['passwordStrength'])
      return 'Password must contain uppercase, lowercase, and number';
    if (field.errors['passwordMismatch']) return 'Passwords do not match';

    return '';
  }

  isFormValid(): boolean {
    return this.personalForm.valid;
  }

  getFormData(): any {
    const formValue = this.personalForm.value;
    // Don't include passwords in the confirmation view
    return {
      fullName: formValue.fullName,
      email: formValue.email,
      phone: formValue.phone,
    };
  }

  getFullFormData(): any {
    // Include passwords for actual registration
    return this.personalForm.value;
  }

  /**
   * Submit signup request
   */
  submitSignUp(role: string): void {
    if (!this.personalForm.valid) {
      this.personalForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.personalForm.value;
    const [firstName, ...lastNameParts] = formValue.fullName.trim().split(' ');
    const lastName = lastNameParts.join(' ') || firstName;

    const signUpData: SignUpRequest = {
      firstName,
      lastName,
      email: formValue.email,
      phoneNumber: formValue.phone,
      role,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
    };

    this.registrationService.signUp(signUpData).subscribe({
      next: (response) => {
        this.isSubmitting = false;

        // Show OTP if provided
        if (response.otp) {
          alert(`OTP: ${response.otp}`);
        }

        // Emit success event with email and otp
        this.signUpSuccess.emit({
          email: response.user.email,
          otp: response.otp,
          role: response.user.role,
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Signup error:', error);
        alert(error.error?.message || 'Signup failed. Please try again.');
      },
    });
  }

  resetForm(): void {
    this.personalForm.reset();
    this.showPassword = false;
    this.showConfirmPassword = false;
  }
}
