import { Component, OnInit } from '@angular/core';
import { DeveloperTabsService, Tab } from '../../services/developer-tabs.service';
import { CommonModule } from '@angular/common';
import { Dashboard } from '../developer-tabs-components/dashboard/dashboard';
import { Projects } from '../developer-tabs-components/projects/projects';
import { Units } from '../developer-tabs-components/units/units';
import { Sales } from '../developer-tabs-components/sales/sales';
import { Reservations } from '../developer-tabs-components/reservations/reservations';
import { Contracts } from '../developer-tabs-components/contracts/contracts';
import { Installments } from '../developer-tabs-components/installments/installments';
import { Deliveries } from '../developer-tabs-components/deliveries/deliveries';
import { CrmManagement } from '../developer-tabs-components/crm-management/crm-management';
import { CustomerService } from '../developer-tabs-components/customer-service/customer-service';
import { Reports } from '../developer-tabs-components/reports/reports';
import { Settings } from '../developer-tabs-components/settings/settings';

@Component({
  selector: 'app-developer-tabs-content',
  standalone: true,
  imports: [
    CommonModule,
    Dashboard,
    Projects,
    Units,
    Sales,
    Reservations,
    Contracts,
    Installments,
    Deliveries,
    CrmManagement,
    CustomerService,
    Reports,
    Settings,
  ],
  templateUrl: './developer-tabs-content.html',
  styleUrl: './developer-tabs-content.scss',
})
export class DeveloperTabsContent implements OnInit {
  activeTab: string = '';
  tabs: Tab[] = [];

  constructor(private tabsService: DeveloperTabsService) {}

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
      case 'dashboard':
        return import('../developer-tabs-components/dashboard/dashboard').then((m) => m.Dashboard);
      case 'projects':
        return import('../developer-tabs-components/projects/projects').then((m) => m.Projects);
      case 'units':
        return import('../developer-tabs-components/units/units').then((m) => m.Units);
      case 'sales':
        return import('../developer-tabs-components/sales/sales').then((m) => m.Sales);
      case 'reservations':
        return import('../developer-tabs-components/reservations/reservations').then(
          (m) => m.Reservations
        );
      case 'contracts':
        return import('../developer-tabs-components/contracts/contracts').then((m) => m.Contracts);
      case 'installments':
        return import('../developer-tabs-components/installments/installments').then(
          (m) => m.Installments
        );
      case 'deliveries':
        return import('../developer-tabs-components/deliveries/deliveries').then(
          (m) => m.Deliveries
        );
      case 'crm-management':
        return import('../developer-tabs-components/crm-management/crm-management').then(
          (m) => m.CrmManagement
        );
      case 'customer-service':
        return import('../developer-tabs-components/customer-service/customer-service').then(
          (m) => m.CustomerService
        );
      case 'reports':
        return import('../developer-tabs-components/reports/reports').then((m) => m.Reports);
      case 'settings':
        return import('../developer-tabs-components/settings/settings').then((m) => m.Settings);
      default:
        return null;
    }
  }
}
