import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sider',
  imports: [CommonModule],
  templateUrl: './sider.html',
  styleUrl: './sider.scss',
})
export class Sider {
  @Input() sidebarOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<string>();
  currentActive: string = 'dashboard-home';

  constructor(private router: Router) {
    // Listen to route changes to update active state
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const urlParts = event.urlAfterRedirects.split('/');
        this.currentActive = urlParts[urlParts.length - 1] || 'dashboard-home';
      });
  }

  selectMenuItem(menuItem: string): void {
    this.currentActive = menuItem;
    this.menuItemClick.emit(menuItem);
  }

  onCloseSidebar(): void {
    this.closeSidebar.emit();
  }
}
