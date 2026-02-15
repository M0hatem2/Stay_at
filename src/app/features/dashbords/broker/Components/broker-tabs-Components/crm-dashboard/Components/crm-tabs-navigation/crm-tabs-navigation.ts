import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CrmTabsService, Tab } from '../../../../../services/crm-tabs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crm-tabs-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crm-tabs-navigation.html',
  styleUrls: ['./crm-tabs-navigation.scss'],
})
export class CrmTabsNavigation implements AfterViewInit {
  tabs: Tab[] = [];
  activeTab: string = '';

  @ViewChildren('tabRef') tabRefs!: QueryList<ElementRef>;

  activeTabWidth = 0;
  activeTabLeft = 0;

  constructor(private tabsService: CrmTabsService) {}

  ngOnInit(): void {
    this.tabs = this.tabsService.getTabs();
    this.activeTab = this.tabsService.getActiveTab();

    this.tabsService.activeTab$.subscribe((tabId) => {
      this.activeTab = tabId;
      this.updateUnderline();
    });
  }

  ngAfterViewInit(): void {
    this.updateUnderline();
    this.tabRefs.changes.subscribe(() => this.updateUnderline());
  }

  onTabClick(tabId: string): void {
    this.tabsService.setActiveTab(tabId);
    this.updateUnderline();
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  updateUnderline() {
    const activeTabEl = this.tabRefs.find((_, i) => this.tabs[i].id === this.activeTab);
    if (activeTabEl) {
      const rect = activeTabEl.nativeElement.getBoundingClientRect();
      const parentRect = activeTabEl.nativeElement.parentElement.getBoundingClientRect();
      this.activeTabWidth = rect.width;
      this.activeTabLeft = rect.left - parentRect.left;
    }
  }
}
