import { Component, OnInit } from '@angular/core';
import { SeekerTabsService, Tab } from '../../services/seeker-tabs.service';
import { CommonModule } from '@angular/common';
import { AdvancedSearch } from '../seeker-tabs-components/advanced-search/advanced-search';
import { Favorites } from '../seeker-tabs-components/favorites/favorites';
import { Previews } from '../seeker-tabs-components/previews/previews';
import { Bookings } from '../seeker-tabs-components/bookings/bookings';
import { Comparison } from '../seeker-tabs-components/comparison/comparison';
import { Alerts } from '../seeker-tabs-components/alerts/alerts';

@Component({
  selector: 'app-seeker-tabs-content',
  standalone: true,
  imports: [
    CommonModule,
    AdvancedSearch,
    Favorites,
    Previews,
    Bookings,
    Comparison,
    Alerts
  ],
  templateUrl: './seeker-tabs-content.html',
  styleUrl: './seeker-tabs-content.scss',
})
export class SeekerTabsContent implements OnInit {
  activeTab: string = '';
  tabs: Tab[] = [];

  constructor(private tabsService: SeekerTabsService) {}

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
      case 'advanced-search':
        return import('../seeker-tabs-components/advanced-search/advanced-search').then(
          (m) => m.AdvancedSearch
        );
      case 'favorites':
        return import('../seeker-tabs-components/favorites/favorites').then((m) => m.Favorites);
      case 'previews':
        return import('../seeker-tabs-components/previews/previews').then((m) => m.Previews);
      case 'bookings':
        return import('../seeker-tabs-components/bookings/bookings').then((m) => m.Bookings);
      case 'comparison':
        return import('../seeker-tabs-components/comparison/comparison').then((m) => m.Comparison);
      case 'alerts':
        return import('../seeker-tabs-components/alerts/alerts').then((m) => m.Alerts);
      default:
        return null;
    }
  }
}
