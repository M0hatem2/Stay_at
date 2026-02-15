import { Component, OnInit } from '@angular/core';
import { CrmTabsService, Tab } from '../../../../../services/crm-tabs.service';
import { CommonModule } from '@angular/common';
import { AvailableUnitsComponent } from '../crm-tabs-Components/available-units/available-units';
import { MyCustomers } from '../crm-tabs-Components/my-customers/my-customers';
import { MyDeals } from '../crm-tabs-Components/my-deals/my-deals';
import { MyActivities } from '../crm-tabs-Components/my-activities/my-activities';

@Component({
  selector: 'app-crm-tabs-content',
  standalone: true,
  imports: [CommonModule, AvailableUnitsComponent, MyCustomers, MyDeals, MyActivities],
  templateUrl: './crm-tabs-content.html',
  styleUrl: './crm-tabs-content.scss',
})
export class CrmTabsContent implements OnInit {
  activeTab: string = '';
  tabs: Tab[] = [];

  constructor(private tabsService: CrmTabsService) {}

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
      case 'available-units':
        return import('../crm-tabs-Components/available-units/available-units').then(
          (m) => m.AvailableUnitsComponent
        );
      case 'my-customers':
        return import('../crm-tabs-Components/my-customers/my-customers').then(
          (m) => m.MyCustomers
        );
      case 'my-deals':
        return import('../crm-tabs-Components/my-deals/my-deals').then((m) => m.MyDeals);
      case 'my-activities':
        return import('../crm-tabs-Components/my-activities/my-activities').then(
          (m) => m.MyActivities
        );
      default:
        return null;
    }
  }
}
