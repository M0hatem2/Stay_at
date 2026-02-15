import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register-page',
  imports: [ ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export class RegisterPage {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  goToRegisterPop() {
    this.router.navigate(['/auth/register-pop']);
  }
}
