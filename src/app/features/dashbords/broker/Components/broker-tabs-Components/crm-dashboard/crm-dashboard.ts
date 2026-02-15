import { Component, OnInit } from '@angular/core';
import { CrmTabsService, Tab } from '../../../services/crm-tabs.service';
import { CommonModule } from '@angular/common';
import { CrmHeader } from './Components/crm-header/crm-header';
import { CrmTabsNavigation } from './Components/crm-tabs-navigation/crm-tabs-navigation';
import { CrmTabsContent } from './Components/crm-tabs-content/crm-tabs-content';

@Component({
  selector: 'app-crm-dashboard',
  standalone: true,
  imports: [CommonModule, CrmHeader, CrmTabsNavigation, CrmTabsContent],
  templateUrl: './crm-dashboard.html',
  styleUrl: './crm-dashboard.scss',
})
export class CrmDashboard implements OnInit {
  tabs: Tab[] = [];
  activeTab: string = '';

  constructor(private tabsService: CrmTabsService) {}

  ngOnInit(): void {
    this.tabs = this.tabsService.getTabs();
    // Set initial active tab for CRM dashboard
    this.activeTab = 'available-units';
    this.tabsService.setActiveTab('available-units');

    this.tabsService.activeTab$.subscribe((tabId) => {
      this.activeTab = tabId;
    });
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
