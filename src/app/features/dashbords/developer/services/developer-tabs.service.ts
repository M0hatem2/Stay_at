import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Tab {
  id: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class DeveloperTabsService {
  private tabs: Tab[] = [
    { id: 'dashboard', title: 'Dashboard' },
    { id: 'projects', title: 'Projects' },
    { id: 'units', title: 'Units' },
    { id: 'sales', title: 'Sales' },
    { id: 'reservations', title: 'Reservations' },
    { id: 'contracts', title: 'Contracts' },
    { id: 'installments', title: 'Installments' },
    { id: 'deliveries', title: 'Deliveries' },
    { id: 'crm-management', title: 'CRM Management' },
    { id: 'customer-service', title: 'Customer Service' },
    { id: 'reports', title: 'Reports' },
    { id: 'settings', title: 'Settings' },
  ];

  private activeTabSubject = new BehaviorSubject<string>(this.tabs[0].id);
  public activeTab$ = this.activeTabSubject.asObservable();

  getTabs(): Tab[] {
    return this.tabs;
  }

  getActiveTab(): string {
    return this.activeTabSubject.value;
  }

  setActiveTab(tabId: string): void {
    this.activeTabSubject.next(tabId);
  }
}
