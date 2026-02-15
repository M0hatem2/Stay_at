import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { Sider } from './components/sider/sider';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    RouterOutlet,
    Sider
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  sidebarOpen: boolean = false;

  constructor(private router: Router) {}

  onMenuItemClick(menuItem: string): void {
    this.router.navigate(['/dashboard/admin', menuItem]);
    this.closeSidebar(); // Close sidebar on mobile after navigation
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
