import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllProperties } from '../components/all-properties/all-properties';

@Component({
  selector: 'app-all-properties-page',
  imports: [AllProperties],
  templateUrl: './all-properties.page.html',
  styleUrls: ['./all-properties.page.scss'],
})
export class AllPropertiesPage {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/auth/sign-up']);
  }

  goToRegisterPop() {
    this.router.navigate(['/auth/register-pop']);
  }
}
