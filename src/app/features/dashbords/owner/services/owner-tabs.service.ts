import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Tab {
  id: string;
  title: string;
  component: string;
}

@Injectable({
  providedIn: 'root',
})
export class OwnerTabsService {
  private activeTabSubject = new BehaviorSubject<string>('overview');
  public activeTab$ = this.activeTabSubject.asObservable();

  private tabs: Tab[] = [
    { id: 'overview', title: 'Overview', component: 'OverviewComponent' },
    { id: 'my-properties', title: 'My Properties', component: 'MyPropertiesComponent' },
    { id: 'requests-offers', title: 'Requests & Offers', component: 'RequestsOffersComponent' },
    { id: 'analytics', title: 'Analytics', component: 'AnalyticsComponent' },
    { id: 'financial', title: 'Financial', component: 'FinancialComponent' },
  ];

  constructor() {}

  getTabs(): Tab[] {
    return this.tabs;
  }

  getActiveTab(): string {
    return this.activeTabSubject.value;
  }

  setActiveTab(tabId: string): void {
    this.activeTabSubject.next(tabId);
  }

  getTabById(tabId: string): Tab | undefined {
    return this.tabs.find((tab) => tab.id === tabId);
  }
}
