import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Rent } from '../components/rent/rent';

@Component({
  selector: 'app-rent-page',
  imports: [Rent],
  templateUrl: './rent.page.html',
  styleUrl: './rent.page.scss',
})
export class RentPage {
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
