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
export class CrmTabsService {
  private activeTabSubject = new BehaviorSubject<string>('available-units');
  public activeTab$ = this.activeTabSubject.asObservable();

  private tabs: Tab[] = [
    { id: 'available-units', title: 'Available Units', component: 'AvailableUnitsComponent' },
    { id: 'my-customers', title: 'My Customers', component: 'MyCustomersComponent' },
    { id: 'my-deals', title: 'My Deals', component: 'MyDealsComponent' },
    { id: 'my-activities', title: 'My Activities', component: 'MyActivitiesComponent' },
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
