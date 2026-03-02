import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faArrowRight,
  faUser,
  faArrowLeft,
  faHome,
  faBriefcase,
  faBuilding,
  faMagic,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignInComponent {
  signInForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  faEnvelope = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faArrowRight = faArrowRight;
  faUser = faUser;
  faArrowLeft = faArrowLeft;
  faHome = faHome;
  faBriefcase = faBriefcase;
  faBuilding = faBuilding;
  faMagic = faMagic;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.signIn(this.signInForm.value).subscribe({
        next: (response: any) => {
          console.log('✅ Sign in successful:', response);
          this.isLoading = false;

          if (response.accessToken) {
            // Save tokens
            console.log('💾 Saving accessToken...');
            this.authService.setAccessToken(response.accessToken);
            if (response.refreshToken) {
              console.log('💾 Saving refreshToken...');
              this.authService.setRefreshToken(response.refreshToken);
            }

            // Verify token was saved
            const savedToken = this.authService.getAccessToken();
            console.log('🔍 Verification - Token saved?', savedToken ? 'YES' : 'NO');

            // Navigate based on role
            this.navigateBasedOnRole(response.role);
          } else {
            console.error('❌ No accessToken in response');
          }
        },
        error: (error: any) => {
          console.error('❌ Sign in failed:', error);
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Sign in failed';
        },
      });
    }
  }

  private navigateBasedOnRole(role: string) {
    console.log('🔄 Navigating based on role:', role);

    switch (role) {
      case 'system_admin':
        this.router.navigate(['/dashboard/system_admin']);
        break;
      case 'real_estate_broker':
        this.router.navigate(['/dashboard/real_estate_broker']);
        break;
      case 'real_estate_developer':
        this.router.navigate(['/dashboard/real_estate_developer']);
        break;
      case 'property_seeker':
        this.router.navigate(['/dashboard/property_seeker']);
        break;
      case 'property_owner':
        this.router.navigate(['/dashboard/property_owner']);
        break;
      default:
        console.warn('⚠️ Unknown role:', role, '- redirecting to home');
        this.router.navigate(['/home']);
    }
  }
}
