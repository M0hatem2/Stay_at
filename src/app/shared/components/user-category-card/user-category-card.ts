import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
export type UserCategoryTheme = 'blue' | 'green' | 'purple' | 'orange';

export interface UserCategory {
  theme: UserCategoryTheme;
  icon: string; // FontAwesome class
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonIcon?: string;
  userType?: 'owner' | 'broker' | 'developer'; // For navigation to plans
}

@Component({
  selector: 'app-user-category-card',
  imports: [CommonModule],
  templateUrl: './user-category-card.html',
  styleUrl: './user-category-card.scss',
})
export class UserCategoryCardComponent {
  @Input() category!: UserCategory;

  constructor(private router: Router) {}

  navigateToPlans() {
    if (this.category.userType) {
      this.router.navigate(['/plans'], {
        queryParams: { type: this.category.userType },
      });
    }
  }
}
