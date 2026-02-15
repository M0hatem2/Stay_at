import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeveloperTabsNavigation } from './Components/developer-tabs-navigation/developer-tabs-navigation';
import { DeveloperTabsContent } from './Components/developer-tabs-content/developer-tabs-content';
import { DeveloperHeader } from './Components/developer-header/developer-header';

@Component({
  selector: 'app-developer-dashboard',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.scss'],
  imports: [DeveloperTabsNavigation, DeveloperTabsContent, DeveloperHeader],
})
export class DeveloperDashboardComponent {
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
