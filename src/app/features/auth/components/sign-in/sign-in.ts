import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faEye, faArrowRight, faUser, faArrowLeft, faHome, faBriefcase, faBuilding, faMagic } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
          this.isLoading = false;
          if (response.accessToken) {
            this.authService.setAccessToken(response.accessToken);
            this.navigateBasedOnRole(response.role);
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Sign in failed';
        }
      });
    }
  }

  private navigateBasedOnRole(role: string) {
    switch (role) {
      case 'system_admin':
        this.router.navigate(['/dashboard/owner']); // Assuming admin uses owner dashboard
        break;
      case 'broker':
        this.router.navigate(['/dashboard/broker']);
        break;
      case 'developer':
        this.router.navigate(['/dashboard/developer']);
        break;
      case 'seeker':
        this.router.navigate(['/dashboard/seeker']);
        break;
      case 'owner':
        this.router.navigate(['/dashboard/owner']);
        break;
      default:
        this.router.navigate(['/home']);
    }
  }
}