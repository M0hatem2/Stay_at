import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UserCategoryCardComponent,
  UserCategory,
} from '../../../../shared/components/user-category-card/user-category-card';

@Component({
  selector: 'app-home-who-are-you',
  imports: [CommonModule, UserCategoryCardComponent],
  templateUrl: './home-who-are-you.html',
  styleUrl: './home-who-are-you.scss',
})
export class HomeWhoAreYou {
  userCategories: UserCategory[] = [
    {
      theme: 'blue',
      icon: 'fas fa-search',
      title: 'For Seekers',
      description: 'Find your ideal property, save favorites, book, and request viewings easily',
      features: [
        'Advanced Smart Search',
        'Save Favorite Units',
        'Request Viewings',
        'Book Managed Units',
        'Price Alerts',
        'Compare Units',
      ],
      buttonText: 'Get Started',
    },
    {
      theme: 'green',
      icon: 'fas fa-home',
      title: 'For Property Owners',
      description:
        'List your property, manage it professionally, and receive booking and viewing requests',
      features: [
        'Unlimited Property Listings',
        'Performance Analysis',
        'Manage Requests & Bookings',
        'Smart Price Suggestions',
        'AI Auto Description',
        'Financial Reports',
      ],
      buttonText: 'Subscribe Now - View Plans',
      buttonIcon: 'fas fa-arrow-right',
      userType: 'owner',
    },
    {
      theme: 'purple',
      icon: 'fas fa-briefcase',
      title: 'For Brokers',
      description: 'Integrated CRM system, manage your clients, properties, and deals in one place',
      features: [
        'Integrated Client CRM',
        'Property & Client Management',
        'Smart Client Classification',
        'Deal Tracking',
        'Property Performance Analysis',
        'Custom Reports',
      ],
      buttonText: 'Subscribe Now - View Plans',
      buttonIcon: 'fas fa-arrow-right',
      userType: 'broker',
    },
    {
      theme: 'orange',
      icon: 'fas fa-building',
      title: 'For Developers',
      description: 'Publish your projects, manage units, track sales, and analyze performance',
      features: [
        'Publish Real Estate Projects',
        'Unit & Sales Management',
        'Market Analysis',
        'Track Sales & Bookings',
        'Analytical Dashboard',
        'Sales Team',
      ],
      buttonText: 'Join as Developer - View Plans',
      buttonIcon: 'fas fa-arrow-right',
      userType: 'developer',
    },
  ];
}
