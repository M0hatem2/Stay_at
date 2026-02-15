import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Buy } from '../components/buy/buy';

@Component({
  selector: 'app-buy-page',
  imports: [Buy],
  templateUrl: './buy.page.html',
  styleUrl: './buy.page.scss',
})
export class BuyPage {
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
