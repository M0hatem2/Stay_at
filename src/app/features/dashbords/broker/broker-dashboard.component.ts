import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrokerTabsService } from './services/broker-tabs.service';
import { CommonModule } from '@angular/common';
import { BrokerHeader } from './Components/broker-header/broker-header';
import { BrokerTabsNavigation } from './Components/broker-tabs-navigation/broker-tabs-navigation';
import { BrokerTabsContent } from './Components/broker-tabs-content/broker-tabs-content';

@Component({
  selector: 'app-broker-dashboard',
  standalone: true,
  imports: [CommonModule, BrokerHeader, BrokerTabsNavigation, BrokerTabsContent],
  templateUrl: './broker-dashboard.component.html',
  styleUrls: ['./broker-dashboard.component.scss'],
})
export class BrokerDashboardComponent {
  constructor(private tabsService: BrokerTabsService, private router: Router) {}

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
