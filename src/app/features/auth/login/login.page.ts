import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in';

@Component({
  selector: 'app-login-page',
  imports: [SignInComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  goToRegisterPop() {
    this.router.navigate(['/auth/register-pop']);
  }
}
