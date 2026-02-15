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
export class SeekerTabsService {
  private activeTabSubject = new BehaviorSubject<string>('favorites');
  public activeTab$ = this.activeTabSubject.asObservable();

  private tabs: Tab[] = [
    { id: 'advanced-search', title: 'Advanced Search', component: 'AdvancedSearchComponent' },
    { id: 'favorites', title: 'Favorites', component: 'FavoritesComponent' },
    { id: 'previews', title: 'Previews', component: 'PreviewsComponent' },
    { id: 'bookings', title: 'Bookings', component: 'BookingsComponent' },
    { id: 'comparison', title: 'Comparison', component: 'ComparisonComponent' },
    { id: 'alerts', title: 'Alerts', component: 'AlertsComponent' },
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
