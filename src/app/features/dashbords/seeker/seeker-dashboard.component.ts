import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeekerHeader } from './Components/seeker-header/seeker-header';
import { SeekerTabsNavigation } from './Components/seeker-tabs-navigation/seeker-tabs-navigation';
import { SeekerTabsContent } from './Components/seeker-tabs-content/seeker-tabs-content';
import { AdvancedSearch } from './Components/seeker-tabs-components/advanced-search/advanced-search';
import { Favorites } from './Components/seeker-tabs-components/favorites/favorites';
import { Previews } from './Components/seeker-tabs-components/previews/previews';
import { Bookings } from './Components/seeker-tabs-components/bookings/bookings';
import { Comparison } from './Components/seeker-tabs-components/comparison/comparison';
import { Alerts } from './Components/seeker-tabs-components/alerts/alerts';

@Component({
  selector: 'app-seeker-dashboard',
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.scss'],
  imports: [
    SeekerHeader,
    SeekerTabsNavigation,
    SeekerTabsContent
],
})
export class SeekerDashboardComponent {
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
