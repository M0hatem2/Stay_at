import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UnitsCard, PropertyCardData } from '../../../../shared/components/units-card/units-card';
import { ApiProperty } from '../../../../core/models/api-property.model';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

const FEATURED_UNITS_FAKE_DATA: ApiProperty[] = [
  {
    _id: 'featured-001',
    slug: 'featured-luxury-apartment-eastown',
    status: 'active',
    ownerType: 'broker',
    ownerId: 'featured-owner-001',
    projectId: 'featured-project-001',
    targetId: 'unit-rent-001',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'New Cairo',
      address: 'Eastown Residence',
      coordinates: { type: 'Point', coordinates: [31.4922, 30.0221] },
    },
    isFeatured: true,
    isTrusted: true,
    gallery: [
      {
        public_id: 'featured-001-1',
        secure_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'featured-001',
        _id: 'featured-media-001-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600' },
    documents: [],
    floorsCount: 12,
    name: 'Luxury Apartment - Eastown',
    title: 'Luxury Apartment - Eastown',
    description: 'Premium furnished apartment in a prime residential compound.',
    type: 'apartment',
    facilitiesAndServices: ['Parking', 'Security', 'Clubhouse'],
    area: 180,
    bedrooms: 3,
    bathrooms: 3,
    furnished: true,
    displayPrice: 42000,
    currency: 'EGP',
    priceType: 'monthly',
    purpose: 'rent',
    rating: 4.8,
    createdAt: '2026-02-10T10:00:00.000Z',
  },
  {
    _id: 'featured-002',
    slug: 'featured-penthouse-zed-west',
    status: 'active',
    ownerType: 'real_estate_developer',
    ownerId: 'featured-owner-002',
    projectId: 'featured-project-002',
    targetId: 'unit-sale-012',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Giza',
      area: 'Sheikh Zayed',
      address: 'ZED West',
      coordinates: { type: 'Point', coordinates: [30.9731, 30.0151] },
    },
    isFeatured: true,
    isTrusted: true,
    gallery: [
      {
        public_id: 'featured-002-1',
        secure_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'featured-002',
        _id: 'featured-media-002-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600' },
    documents: [],
    floorsCount: 18,
    name: 'Luxury Penthouse - ZED West',
    title: 'Luxury Penthouse - ZED West',
    description: 'High-end penthouse with panoramic skyline views and concierge service.',
    type: 'penthouse',
    facilitiesAndServices: ['Concierge', 'Valet', 'Private Terrace'],
    area: 320,
    bedrooms: 4,
    bathrooms: 4,
    furnished: true,
    displayPrice: 21500000,
    currency: 'EGP',
    priceType: 'total',
    purpose: 'sale',
    rating: 4.9,
    createdAt: '2026-02-08T17:00:00.000Z',
  },
  {
    _id: 'featured-003',
    slug: 'featured-marassi-villa',
    status: 'active',
    ownerType: 'owner',
    ownerId: 'featured-owner-003',
    projectId: 'featured-project-003',
    targetId: 'unit-rent-003',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Matrouh',
      area: 'North Coast',
      address: 'Marassi',
      coordinates: { type: 'Point', coordinates: [28.9484, 30.8844] },
    },
    isFeatured: true,
    isTrusted: true,
    gallery: [
      {
        public_id: 'featured-003-1',
        secure_url: 'https://images.unsplash.com/photo-1613977257592-487ecd136cc3?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'featured-003',
        _id: 'featured-media-003-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1613977257592-487ecd136cc3?w=600' },
    documents: [],
    floorsCount: 2,
    name: 'Beachfront Villa - Marassi',
    title: 'Beachfront Villa - Marassi',
    description: 'Exclusive villa with private beach access and premium amenities.',
    type: 'villa',
    facilitiesAndServices: ['Private Pool', 'Sea View', 'Housekeeping'],
    area: 350,
    bedrooms: 5,
    bathrooms: 4,
    furnished: true,
    displayPrice: 15000,
    currency: 'EGP',
    priceType: 'daily',
    purpose: 'rent',
    rating: 4.9,
    createdAt: '2026-01-28T12:00:00.000Z',
  },
  {
    _id: 'featured-004',
    slug: 'featured-il-bosco-smart-apartment',
    status: 'active',
    ownerType: 'real_estate_developer',
    ownerId: 'featured-owner-004',
    projectId: 'featured-project-004',
    targetId: 'unit-sale-011',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'New Capital',
      address: 'IL Bosco City',
      coordinates: { type: 'Point', coordinates: [31.7395, 30.0152] },
    },
    isFeatured: true,
    isTrusted: true,
    gallery: [
      {
        public_id: 'featured-004-1',
        secure_url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'featured-004',
        _id: 'featured-media-004-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600' },
    documents: [],
    floorsCount: 9,
    name: 'Smart Apartment - IL Bosco',
    title: 'Smart Apartment - IL Bosco',
    description: 'Modern smart apartment in one of the fastest-growing districts.',
    type: 'apartment',
    facilitiesAndServices: ['Smart Home', 'Security', 'Clubhouse'],
    area: 155,
    bedrooms: 3,
    bathrooms: 2,
    furnished: false,
    displayPrice: 6250000,
    currency: 'EGP',
    priceType: 'total',
    purpose: 'sale',
    rating: 4.6,
    createdAt: '2026-02-18T10:00:00.000Z',
  },
  {
    _id: 'featured-005',
    slug: 'featured-mivida-duplex',
    status: 'active',
    ownerType: 'broker',
    ownerId: 'featured-owner-005',
    projectId: 'featured-project-005',
    targetId: 'unit-rent-004',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'New Cairo',
      address: 'Mivida Compound',
      coordinates: { type: 'Point', coordinates: [31.4595, 30.0042] },
    },
    isFeatured: true,
    isTrusted: false,
    gallery: [
      {
        public_id: 'featured-005-1',
        secure_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'featured-005',
        _id: 'featured-media-005-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600' },
    documents: [],
    floorsCount: 3,
    name: 'Hybrid Duplex - Mivida',
    title: 'Hybrid Duplex - Mivida',
    description: 'Flexible duplex listing suitable for both sale and long-term rent.',
    type: 'duplex',
    facilitiesAndServices: ['Club Access', 'Security', 'Parking'],
    area: 240,
    bedrooms: 4,
    bathrooms: 3,
    furnished: false,
    displayPrice: 55000,
    currency: 'EGP',
    priceType: 'monthly',
    purpose: 'sale_and_rent',
    rating: 4.4,
    createdAt: '2026-02-02T09:30:00.000Z',
  },
  {
    _id: 'featured-006',
    slug: 'featured-hurghada-sea-view',
    status: 'active',
    ownerType: 'owner',
    ownerId: 'featured-owner-006',
    projectId: 'featured-project-006',
    targetId: 'unit-rent-008',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Red Sea',
      area: 'Hurghada',
      address: 'Hurghada Heights',
      coordinates: { type: 'Point', coordinates: [33.8312, 27.2579] },
    },
    isFeatured: true,
    isTrusted: true,
    gallery: [
      {
        public_id: 'featured-006-1',
        secure_url: 'https://images.unsplash.com/photo-1464890100898-a385f744067f?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'featured-006',
        _id: 'featured-media-006-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1464890100898-a385f744067f?w=600' },
    documents: [],
    floorsCount: 6,
    name: 'Sea View Apartment - Hurghada',
    title: 'Sea View Apartment - Hurghada',
    description: 'Resort-style apartment with direct sea view and vacation facilities.',
    type: 'apartment',
    facilitiesAndServices: ['Pool', 'Sea View', 'Reception'],
    area: 110,
    bedrooms: 2,
    bathrooms: 2,
    furnished: true,
    displayPrice: 3500,
    currency: 'EGP',
    priceType: 'daily',
    purpose: 'rent',
    rating: 4.7,
    createdAt: '2026-02-11T17:00:00.000Z',
  },
];

@Component({
  selector: 'app-home-featured-units',
  templateUrl: './home-featured-units.html',
  styleUrl: './home-featured-units.scss',
  imports: [CommonModule, UnitsCard],
})
export class HomeFeaturedUnits implements OnInit, OnDestroy {
  properties: ApiProperty[] = [];
  isLoading = false;
  errorMessage = '';
  private subscription: Subscription | null = null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadFeaturedUnits();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadFeaturedUnits(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.subscription = of(FEATURED_UNITS_FAKE_DATA)
      .pipe(delay(250))
      .subscribe({
        next: (data) => {
          this.properties = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Error loading featured units:', error);
          this.errorMessage = 'حدث خطأ أثناء تحميل الوحدات المميزة';
          this.isLoading = false;
        },
      });
  }

  onPropertyClick(property: PropertyCardData): void {
    console.log('🔍 Property clicked:', property);

    if ('targetId' in property && 'targetType' in property) {
      const apiProperty = property as ApiProperty;
      const targetId = apiProperty.targetId;
      const targetType = apiProperty.targetType;

      if (targetType === 'property' || targetType === 'project') {
        this.router.navigate(['/property', targetId], {
          state: { property: property },
        });
      } else if (targetType === 'unit') {
        const priceType = apiProperty.priceType;
        const purpose = apiProperty.purpose;

        if (purpose === 'sale_and_rent') {
          if (priceType === 'daily' || priceType === 'monthly') {
            this.router.navigate(['/rent', targetId], {
              state: { property: property },
            });
          } else if (priceType === 'total') {
            this.router.navigate(['/buy', targetId], {
              state: { property: property },
            });
          }
        } else if (purpose === 'rent') {
          this.router.navigate(['/rent', targetId], {
            state: { property: property },
          });
        } else if (purpose === 'sale') {
          this.router.navigate(['/buy', targetId], {
            state: { property: property },
          });
        }
      }
    } else {
      const id = '_id' in property ? property._id : 'id' in property ? property.id : '';
      this.router.navigate(['/property', id], {
        state: { property: property },
      });
    }
  }

  viewAllProperties(): void {
    this.router.navigate(['/properties']);
  }
}
