import { Component, OnInit } from '@angular/core';
import { OwnerTabsService, Tab } from '../../services/owner-tabs.service';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../owner-tabs-Components/overview/overview';
import { MyPropertiesComponent } from '../owner-tabs-Components/my-properties/my-properties';
import { RequestsOffersComponent } from '../owner-tabs-Components/requests-offers/requests-offers';
import { AnalyticsComponent } from '../owner-tabs-Components/analytics/analytics';
import { FinancialComponent } from '../owner-tabs-Components/financial/financial';

@Component({
  selector: 'app-owner-tabs-content',
  standalone: true,
  imports: [
    CommonModule,
    OverviewComponent,
    MyPropertiesComponent,
    RequestsOffersComponent,
    AnalyticsComponent,
    FinancialComponent,
  ],
  templateUrl: './owner-tabs-content.html',
  styleUrl: './owner-tabs-content.scss',
})
export class OwnerTabsContent implements OnInit {
  activeTab: string = '';
  tabs: Tab[] = [];

  constructor(private tabsService: OwnerTabsService) {}

  ngOnInit(): void {
    this.tabs = this.tabsService.getTabs();
    this.activeTab = this.tabsService.getActiveTab();

    this.tabsService.activeTab$.subscribe((tabId) => {
      this.activeTab = tabId;
    });
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  getComponentForTab(tabId: string): any {
    // Import components dynamically based on tab ID
    switch (tabId) {
      case 'overview':
        return import('../owner-tabs-Components/overview/overview').then(
          (m) => m.OverviewComponent
        );
      case 'my-properties':
        return import('../owner-tabs-Components/my-properties/my-properties').then(
          (m) => m.MyPropertiesComponent
        );
      case 'requests-offers':
        return import('../owner-tabs-Components/requests-offers/requests-offers').then(
          (m) => m.RequestsOffersComponent
        );
      case 'analytics':
        return import('../owner-tabs-Components/analytics/analytics').then(
          (m) => m.AnalyticsComponent
        );
      case 'financial':
        return import('../owner-tabs-Components/financial/financial').then(
          (m) => m.FinancialComponent
        );
      default:
        return null;
    }
  }
}
