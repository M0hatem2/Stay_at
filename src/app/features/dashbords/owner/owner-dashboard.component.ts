import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OwnerHeader } from './Components/owner-header/owner-header';
import { OwnerTabsNavigation } from './Components/owner-tabs-navigation/owner-tabs-navigation';
import { OwnerTabsContent } from './Components/owner-tabs-content/owner-tabs-content';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule, OwnerHeader, OwnerTabsNavigation, OwnerTabsContent],
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss'],
})
export class OwnerDashboardComponent {
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
