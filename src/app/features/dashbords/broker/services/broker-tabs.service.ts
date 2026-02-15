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
export class BrokerTabsService {
  private activeTabSubject = new BehaviorSubject<string>('overview');
  public activeTab$ = this.activeTabSubject.asObservable();

  private tabs: Tab[] = [
    { id: 'overview', title: 'Overview', component: 'OverviewComponent' },
    { id: 'customers', title: 'Customers', component: 'CustomersComponent' },
    { id: 'deals', title: 'Deals', component: 'DealsComponent' },
    { id: 'crm-dashboard', title: 'CRM Dashboard', component: 'CrmDashboardComponent' },
    { id: 'calendar', title: 'Calendar', component: 'CalendarComponent' },
    { id: 'marketing', title: 'Marketing', component: 'MarketingComponent' },
    { id: 'commissions', title: 'Commissions', component: 'CommissionsComponent' },
  ];

  private crmTabs: Tab[] = [
    { id: 'available-units', title: 'Available Units', component: 'AvailableUnitsComponent' },
    { id: 'my-customers', title: 'My Customers', component: 'MyCustomersComponent' },
    { id: 'my-deals', title: 'My Deals', component: 'MyDealsComponent' },
    { id: 'my-activities', title: 'My Activities', component: 'MyActivitiesComponent' },
  ];

  constructor() {}

  getTabs(): Tab[] {
    return this.tabs;
  }

  getCrmTabs(): Tab[] {
    return this.crmTabs;
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
