import { Component, OnInit } from '@angular/core';
import { BrokerTabsService, Tab } from '../../services/broker-tabs.service';
import { CommonModule } from '@angular/common';
import { Overview } from '../broker-tabs-Components/overview/overview';
import { Customers } from '../broker-tabs-Components/customers/customers';
import { Deals } from '../broker-tabs-Components/deals/deals';
import { CrmDashboard } from '../broker-tabs-Components/crm-dashboard/crm-dashboard';
import { Calendar } from '../broker-tabs-Components/calendar/calendar';
import { Marketing } from '../broker-tabs-Components/marketing/marketing';
import { Commissions } from '../broker-tabs-Components/commissions/commissions';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-broker-tabs-content',
  standalone: true,
  imports: [
    CommonModule,
    Overview,
    Customers,
    Deals,
    CrmDashboard,
    Calendar,
    Marketing,
    Commissions,
  ],
  templateUrl: './broker-tabs-content.html',
  styleUrl: './broker-tabs-content.scss',
  animations: [
    trigger('tabAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
    trigger('contentAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            stagger('100ms', [
              animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class BrokerTabsContent implements OnInit {
  activeTab: string = '';
  tabs: Tab[] = [];
  previousTab: string = '';

  constructor(private tabsService: BrokerTabsService) {}

  ngOnInit(): void {
    this.tabs = this.tabsService.getTabs();
    this.activeTab = this.tabsService.getActiveTab();

    this.tabsService.activeTab$.subscribe((tabId) => {
      this.previousTab = this.activeTab;
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
        return import('../broker-tabs-Components/overview/overview').then((m) => m.Overview);
      case 'customers':
        return import('../broker-tabs-Components/customers/customers').then((m) => m.Customers);
      case 'deals':
        return import('../broker-tabs-Components/deals/deals').then((m) => m.Deals);
      case 'crm-dashboard':
        return import('../broker-tabs-Components/crm-dashboard/crm-dashboard').then(
          (m) => m.CrmDashboard
        );
      case 'calendar':
        return import('../broker-tabs-Components/calendar/calendar').then((m) => m.Calendar);
      case 'marketing':
        return import('../broker-tabs-Components/marketing/marketing').then((m) => m.Marketing);
      case 'commissions':
        return import('../broker-tabs-Components/commissions/commissions').then(
          (m) => m.Commissions
        );
      default:
        return null;
    }
  }
}
