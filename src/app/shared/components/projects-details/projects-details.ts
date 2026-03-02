import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../../../core/models/project.model';
import {
  ProjectHeaderComponent,
  MasterplanComponent,
  UnitTypesComponent,
  AmenitiesComponent,
  ProjectPaymentPlansComponent,
  ProjectGalleryComponent,
  QuickInfoComponent,
  ContactFormComponent,
  ActionButtonsComponent,
} from './components';

@Component({
  selector: 'app-projects-details',
  imports: [
    CommonModule,
    ProjectHeaderComponent,
    MasterplanComponent,
    UnitTypesComponent,
    AmenitiesComponent,
    ProjectPaymentPlansComponent,
    ProjectGalleryComponent,
    QuickInfoComponent,
    ContactFormComponent,
    ActionButtonsComponent,
  ],
  templateUrl: './projects-details.html',
  styleUrl: './projects-details.scss',
})
export class ProjectsDetails implements OnInit {
  // Project data
  projectName = 'Capital Gardens';
  developer = 'Real Estate Development Company';
  location = 'New Administrative Capital, R7';
  description =
    'An integrated residential project on 50 acres, offering a complete modern lifestyle with all services and facilities. Modern designs and spacious green areas.';

  deliveryDate = '2025';
  totalUnits = '420';
  availableUnits = '180 units';

  masterplanImage =
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop';

  unitTypes = [
    {
      name: '2 Bedroom Apartment',
      area: '120 - 140 sqm',
      price: 'From 2,500,000 EGP',
      available: '45 units',
    },
    {
      name: '3 Bedroom Apartment',
      area: '160 - 180 sqm',
      price: 'From 3,200,000 EGP',
      available: '65 units',
    },
    { name: 'Duplex', area: '220 - 260 sqm', price: 'From 4,800,000 EGP', available: '38 units' },
    {
      name: 'Penthouse',
      area: '280 - 320 sqm',
      price: 'From 6,500,000 EGP',
      available: '12 units',
    },
  ];

  amenities = [
    'Olympic Swimming Pool',
    'Fully Equipped Gym',
    'Commercial Area',
    'Nursery & Schools',
    'Running & Cycling Tracks',
    'Gardens & Green Spaces',
    '24/7 Security',
    'Parking Spaces',
  ];

  paymentPlans = [
    '10% down payment and installments over 8 years',
    '20% down payment and installments over 6 years',
    '30% down payment and installments over 5 years',
  ];

  galleryImages = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  ];

  unitTypeNames = ['2 Bedroom Apartment', '3 Bedroom Apartment', 'Duplex', 'Penthouse'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get project data from navigation state
    const navigation = this.router.getCurrentNavigation();
    const navState = navigation?.extras.state as { property?: Project } | undefined;

    if (navState?.property) {
      this.applyProjectData(navState.property);
      return;
    }

    // Fallback: check window.history.state for browser refresh
    if (typeof window !== 'undefined') {
      const histState = (window.history?.state as { property?: Project }) || {};
      if (histState?.property) {
        this.applyProjectData(histState.property);
      }
    }
  }

  private applyProjectData(project: Project): void {
    this.projectName = project.name || this.projectName;
    this.developer = project.developer || this.developer;
    this.location = project.location || this.location;
    this.deliveryDate = project.deliveryDate || this.deliveryDate;
    this.totalUnits = project.totalUnits?.toString() || this.totalUnits;

    if (project.imageUrl) {
      this.masterplanImage = project.imageUrl;
      this.galleryImages = [project.imageUrl, ...this.galleryImages.slice(1)];
    }

    if (project.unitTypes && project.unitTypes.length > 0) {
      this.unitTypeNames = project.unitTypes;
    }

    if (project.startingPrice) {
      const formattedPrice = `From ${project.startingPrice.toLocaleString()} EGP`;
      this.unitTypes = this.unitTypes.map((unit, index) => ({
        ...unit,
        price: index === 0 ? formattedPrice : unit.price,
      }));
    }
  }

  // Event handlers
  onRequestCall() {
    console.log('Request call clicked');
  }

  onBookVisit() {
    console.log('Book visit clicked');
  }

  onGetBrochure() {
    console.log('Get brochure clicked');
  }
}
