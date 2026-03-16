import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LanguageService } from '../../../core/services/language.service';
import { ApiProperty } from '../../../core/models/api-property.model';

export interface PropertyLocation {
  country: string;
  city: string;
  area: string;
  address: string;
  coordinates: {
    type: string;
    coordinates: number[];
  };
}

export interface PropertyMedia {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  original_filename: string;
  _id: string;
}

export interface Property extends ApiProperty {
  salePricing?: {
    _id: string;
    basePrice: number;
    pricePerMeter: number;
    currency: string;
    plans: Array<{
      name_ar: string;
      name_en: string;
      saleType: string;
      downPaymentPercent?: number;
      years?: number;
      interestRate?: number;
      discountPercent?: number;
      _id: string;
    }>;
    negotiable: boolean;
    status: string;
  };
  saleAnalysis?: {
    priceAnalysis: {
      pricePerMeter: number;
      priceDiffPercent: number;
      status: string;
    };
    investmentAnalysis: {
      appreciationRate: number;
      investmentScore: number;
      rentalYield?: number;
      annualRentIncome?: number;
      paybackPeriod?: number;
    };
    summary: string;
    lastUpdated: string;
    smartInsights: string[];
  };
  nearbyLandmarks?: Array<{ name: string; type: string; distance: string }>;
  project?: any;
  owner?: any;
}

export interface PropertyResponse {
  message: string;
  results: {
    data: Property[];
    pages: number;
    currentPage: string | number;
    totalItems: number;
    itemsPerPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}

const ALL_PROPERTIES_FAKE_DATA: Property[] = [
  {
    _id: 'all-prop-001',
    slug: 'skyline-apartment-new-cairo',
    status: 'active',
    ownerType: 'broker',
    ownerId: 'owner-ap-001',
    projectId: 'project-eastown',
    targetId: 'unit-rent-001',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'New Cairo',
      address: 'Fifth Settlement, Eastown',
      coordinates: { type: 'Point', coordinates: [31.4922, 30.0221] },
    },
    isFeatured: true,
    isTrusted: true,
    gallery: [
      {
        public_id: 'all-prop-001-1',
        secure_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-001',
        _id: 'all-media-001-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600' },
    documents: [],
    floorsCount: 12,
    name: 'Skyline Apartment - New Cairo',
    title: 'Skyline Apartment - New Cairo',
    description: 'Contemporary apartment with open views and premium amenities.',
    type: 'apartment',
    facilitiesAndServices: ['Clubhouse', 'Gym', '24/7 Security', 'Parking'],
    area: 185,
    bedrooms: 3,
    bathrooms: 3,
    furnished: true,
    displayPrice: 45000,
    currency: 'EGP',
    priceType: 'monthly',
    purpose: 'rent',
    rating: 4.8,
    createdAt: '2026-02-20T09:00:00.000Z',
  },
  {
    _id: 'all-prop-002',
    slug: 'garden-villa-mountain-view-sale',
    status: 'active',
    ownerType: 'real_estate_developer',
    ownerId: 'owner-ap-002',
    projectId: 'project-mv-icity',
    targetId: 'all-prop-002',
    targetType: 'property',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'Mostakbal City',
      address: 'Mountain View iCity',
      coordinates: { type: 'Point', coordinates: [31.5742, 30.0326] },
    },
    isFeatured: true,
    isTrusted: true,
    gallery: [
      {
        public_id: 'all-prop-002-1',
        secure_url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-002',
        _id: 'all-media-002-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600' },
    documents: [],
    floorsCount: 2,
    name: 'Garden Villa - Mountain View iCity',
    title: 'Garden Villa - Mountain View iCity',
    description: 'Standalone villa with private garden in a gated family community.',
    type: 'villa',
    facilitiesAndServices: ['Private Garden', 'Security', 'Club Access'],
    area: 310,
    bedrooms: 4,
    bathrooms: 4,
    furnished: false,
    displayPrice: 13200000,
    currency: 'EGP',
    priceType: 'total',
    purpose: 'sale',
    rating: 4.7,
    createdAt: '2026-01-15T12:00:00.000Z',
    salePricing: {
      _id: 'sale-002',
      basePrice: 13200000,
      pricePerMeter: 42580,
      currency: 'EGP',
      plans: [
        {
          name_ar: 'كاش',
          name_en: 'Cash',
          saleType: 'cash',
          discountPercent: 10,
          _id: 'sale-plan-002-1',
        },
        {
          name_ar: 'تقسيط 8 سنوات',
          name_en: 'Installment 8 Years',
          saleType: 'installment',
          downPaymentPercent: 15,
          years: 8,
          interestRate: 0.1,
          _id: 'sale-plan-002-2',
        },
      ],
      negotiable: true,
      status: 'active',
    },
    saleAnalysis: {
      priceAnalysis: {
        pricePerMeter: 42580,
        priceDiffPercent: -2.3,
        status: 'Below area average',
      },
      investmentAnalysis: {
        appreciationRate: 12.4,
        investmentScore: 8.8,
        rentalYield: 7.1,
        annualRentIncome: 936000,
        paybackPeriod: 14,
      },
      summary: 'Strong long-term upside with high demand from family buyers.',
      lastUpdated: '2026-02-01T10:00:00.000Z',
      smartInsights: ['High absorption in this phase', 'Limited villa inventory'],
    },
    nearbyLandmarks: [
      { name: 'Madinaty Gate', type: 'Landmark', distance: '4.1 km' },
      { name: 'Open Air Mall', type: 'Mall', distance: '6.0 km' },
    ],
    project: {
      name: 'Mountain View iCity',
      featuresAndServices: ['Lagoon', 'Sports Courts', 'Retail District'],
      startDate: '2020-01-01T00:00:00.000Z',
      expectedDeliveryDate: '2027-12-31T00:00:00.000Z',
    },
    owner: {
      type: 'developer',
      name: 'Mountain View',
      role: 'developer',
      contact: {
        phoneNumber: '+201000000002',
        email: 'sales@mountainview.demo',
      },
      stats: {
        listedCount: 143,
        soldCount: 89,
      },
    },
  },
  {
    _id: 'all-prop-003',
    slug: 'marassi-serviced-chalet',
    status: 'active',
    ownerType: 'owner',
    ownerId: 'owner-ap-003',
    projectId: 'project-marassi',
    targetId: 'unit-rent-003',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Matrouh',
      area: 'North Coast',
      address: 'Marassi, Sidi Abdelrahman',
      coordinates: { type: 'Point', coordinates: [28.9484, 30.8844] },
    },
    isFeatured: true,
    isTrusted: true,
    gallery: [
      {
        public_id: 'all-prop-003-1',
        secure_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-003',
        _id: 'all-media-003-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600' },
    documents: [],
    floorsCount: 2,
    name: 'Marassi Serviced Chalet',
    title: 'Marassi Serviced Chalet',
    description: 'Premium serviced chalet with sea access and concierge support.',
    type: 'chalet',
    facilitiesAndServices: ['Beach Access', 'Housekeeping', 'Smart Access'],
    area: 145,
    bedrooms: 2,
    bathrooms: 2,
    furnished: true,
    displayPrice: 7800,
    currency: 'EGP',
    priceType: 'daily',
    purpose: 'rent',
    rating: 4.9,
    createdAt: '2026-02-12T08:15:00.000Z',
  },
  {
    _id: 'all-prop-004',
    slug: 'downtown-commercial-office',
    status: 'active',
    ownerType: 'broker',
    ownerId: 'owner-ap-004',
    projectId: 'project-downtown',
    targetId: 'all-prop-004',
    targetType: 'property',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'Downtown',
      address: 'Talaat Harb Street',
      coordinates: { type: 'Point', coordinates: [31.2395, 30.0478] },
    },
    isFeatured: false,
    isTrusted: true,
    gallery: [
      {
        public_id: 'all-prop-004-1',
        secure_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-004',
        _id: 'all-media-004-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600' },
    documents: [],
    floorsCount: 18,
    name: 'Downtown Commercial Office',
    title: 'Downtown Commercial Office',
    description: 'Fully fitted office floor in prime central business location.',
    type: 'office',
    facilitiesAndServices: ['Fiber Internet', 'Reception', 'Parking'],
    area: 420,
    bedrooms: 0,
    bathrooms: 4,
    furnished: true,
    displayPrice: 27500000,
    currency: 'EGP',
    priceType: 'total',
    purpose: 'sale',
    rating: 4.2,
    createdAt: '2025-12-22T11:00:00.000Z',
  },
  {
    _id: 'all-prop-005',
    slug: 'zayed-studio-hybrid-use',
    status: 'active',
    ownerType: 'broker',
    ownerId: 'owner-ap-005',
    projectId: 'project-zed',
    targetId: 'unit-rent-002',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Giza',
      area: 'Sheikh Zayed',
      address: 'ZED Towers',
      coordinates: { type: 'Point', coordinates: [30.9768, 30.0144] },
    },
    isFeatured: false,
    isTrusted: true,
    gallery: [
      {
        public_id: 'all-prop-005-1',
        secure_url: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-005',
        _id: 'all-media-005-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=600' },
    documents: [],
    floorsCount: 6,
    name: 'Zayed Studio - Hybrid Listing',
    title: 'Zayed Studio - Hybrid Listing',
    description: 'Flexible listing available for short rent and full purchase.',
    type: 'studio',
    facilitiesAndServices: ['Smart Lock', 'Gym', 'Coworking Space'],
    area: 82,
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    displayPrice: 2100,
    currency: 'EGP',
    priceType: 'daily',
    purpose: 'sale_and_rent',
    rating: 4.5,
    createdAt: '2026-02-13T14:30:00.000Z',
  },
  {
    _id: 'all-prop-006',
    slug: 'alex-seafront-apartment',
    status: 'active',
    ownerType: 'owner',
    ownerId: 'owner-ap-006',
    projectId: 'project-san-stefano',
    targetId: 'all-prop-006',
    targetType: 'property',
    location: {
      country: 'Egypt',
      city: 'Alexandria',
      area: 'San Stefano',
      address: 'Corniche Road',
      coordinates: { type: 'Point', coordinates: [29.9668, 31.2487] },
    },
    isFeatured: true,
    isTrusted: false,
    gallery: [
      {
        public_id: 'all-prop-006-1',
        secure_url: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-006',
        _id: 'all-media-006-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600' },
    documents: [],
    floorsCount: 14,
    name: 'Seafront Apartment - San Stefano',
    title: 'Seafront Apartment - San Stefano',
    description: 'Panoramic sea view residence in one of Alexandria’s prime spots.',
    type: 'apartment',
    facilitiesAndServices: ['Sea View', 'Concierge', 'Parking'],
    area: 210,
    bedrooms: 3,
    bathrooms: 3,
    furnished: false,
    displayPrice: 9800000,
    currency: 'EGP',
    priceType: 'total',
    purpose: 'sale',
    rating: 4.4,
    createdAt: '2026-01-30T09:45:00.000Z',
  },
  {
    _id: 'all-prop-007',
    slug: 'smart-apartment-nasr-city',
    status: 'active',
    ownerType: 'real_estate_developer',
    ownerId: 'owner-ap-007',
    projectId: 'project-taj-city',
    targetId: 'unit-rent-006',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'Nasr City',
      address: 'Taj City Compound',
      coordinates: { type: 'Point', coordinates: [31.3802, 30.0732] },
    },
    isFeatured: false,
    isTrusted: true,
    gallery: [
      {
        public_id: 'all-prop-007-1',
        secure_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-007',
        _id: 'all-media-007-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600' },
    documents: [],
    floorsCount: 10,
    name: 'Smart Apartment - Taj City',
    title: 'Smart Apartment - Taj City',
    description: 'Smart-home ready unit with flexible lease options.',
    type: 'apartment',
    facilitiesAndServices: ['Smart Home', 'Parking', 'Security'],
    area: 125,
    bedrooms: 2,
    bathrooms: 2,
    furnished: false,
    displayPrice: 36000,
    currency: 'EGP',
    priceType: 'monthly',
    purpose: 'rent',
    rating: 4.3,
    createdAt: '2026-02-05T13:00:00.000Z',
  },
  {
    _id: 'all-prop-008',
    slug: 'luxury-penthouse-zamalek',
    status: 'active',
    ownerType: 'owner',
    ownerId: 'owner-ap-008',
    projectId: 'project-zamalek-prime',
    targetId: 'all-prop-008',
    targetType: 'property',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'Zamalek',
      address: 'Brazil Street',
      coordinates: { type: 'Point', coordinates: [31.2244, 30.0618] },
    },
    isFeatured: true,
    isTrusted: true,
    gallery: [
      {
        public_id: 'all-prop-008-1',
        secure_url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-008',
        _id: 'all-media-008-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600' },
    documents: [],
    floorsCount: 20,
    name: 'Luxury Penthouse - Zamalek',
    title: 'Luxury Penthouse - Zamalek',
    description: 'Ultra-luxury penthouse with Nile view terrace.',
    type: 'penthouse',
    facilitiesAndServices: ['Private Elevator', 'Sky Terrace', 'Concierge'],
    area: 420,
    bedrooms: 5,
    bathrooms: 5,
    furnished: true,
    displayPrice: 42000000,
    currency: 'EGP',
    priceType: 'total',
    purpose: 'sale',
    rating: 4.9,
    createdAt: '2026-02-10T16:20:00.000Z',
  },
  {
    _id: 'all-prop-009',
    slug: 'porto-sokhna-weekend-home',
    status: 'active',
    ownerType: 'broker',
    ownerId: 'owner-ap-009',
    projectId: 'project-porto-sokhna',
    targetId: 'unit-rent-009',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Suez',
      area: 'Ain Sokhna',
      address: 'Porto Sokhna',
      coordinates: { type: 'Point', coordinates: [32.3292, 29.4428] },
    },
    isFeatured: false,
    isTrusted: true,
    gallery: [
      {
        public_id: 'all-prop-009-1',
        secure_url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-009',
        _id: 'all-media-009-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600' },
    documents: [],
    floorsCount: 3,
    name: 'Porto Sokhna Weekend Home',
    title: 'Porto Sokhna Weekend Home',
    description: 'Affordable weekend vacation unit with direct resort access.',
    type: 'studio',
    facilitiesAndServices: ['Pool', 'Resort Access', 'Beach Shuttle'],
    area: 68,
    bedrooms: 1,
    bathrooms: 1,
    furnished: true,
    displayPrice: 1900,
    currency: 'EGP',
    priceType: 'daily',
    purpose: 'rent',
    rating: 4.2,
    createdAt: '2026-02-14T10:20:00.000Z',
  },
  {
    _id: 'all-prop-010',
    slug: 'hybrid-duplex-mivida',
    status: 'active',
    ownerType: 'broker',
    ownerId: 'owner-ap-010',
    projectId: 'project-mivida',
    targetId: 'unit-rent-004',
    targetType: 'unit',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'New Cairo',
      address: 'Mivida Compound',
      coordinates: { type: 'Point', coordinates: [31.4595, 30.0042] },
    },
    isFeatured: false,
    isTrusted: false,
    gallery: [
      {
        public_id: 'all-prop-010-1',
        secure_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
        format: 'jpg',
        resource_type: 'image',
        original_filename: 'all-property-010',
        _id: 'all-media-010-1',
      },
    ],
    thumbnail: { secure_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600' },
    documents: [],
    floorsCount: 3,
    name: 'Hybrid Duplex - Mivida',
    title: 'Hybrid Duplex - Mivida',
    description: 'Duplex available for monthly rent and full purchase.',
    type: 'duplex',
    facilitiesAndServices: ['Security', 'Parking', 'Garden View'],
    area: 248,
    bedrooms: 4,
    bathrooms: 3,
    furnished: false,
    displayPrice: 59000,
    currency: 'EGP',
    priceType: 'monthly',
    purpose: 'sale_and_rent',
    rating: 4.4,
    createdAt: '2026-02-11T15:10:00.000Z',
  },
];

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private languageService: LanguageService) { }

  getProperties(
    page: number = 1,
    limit: number = 10,
    title: string = '',
  ): Observable<PropertyResponse> {
    const currentLanguage = this.languageService.getCurrentLanguage();

    const normalizedTitle = title.trim().toLowerCase();
    const filtered = ALL_PROPERTIES_FAKE_DATA.filter((property) => {
      if (!normalizedTitle) return true;
      return (
        property.title?.toLowerCase().includes(normalizedTitle) ||
        property.name?.toLowerCase().includes(normalizedTitle) ||
        property.location.city.toLowerCase().includes(normalizedTitle) ||
        property.location.area.toLowerCase().includes(normalizedTitle)
      );
    });

    const localizedData = filtered.map((property) =>
      currentLanguage === 'ar'
        ? {
          ...property,
          title: this.translateTitle(property.title || property.name || ''),
          name: this.translateTitle(property.name || property.title || ''),
        }
        : property,
    );

    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const totalItems = localizedData.length;
    const pages = Math.max(1, Math.ceil(totalItems / safeLimit));
    const start = (safePage - 1) * safeLimit;
    const end = start + safeLimit;
    const pageData = localizedData.slice(start, end);

    return of({
      message: 'Properties loaded from local fake data',
      results: {
        data: pageData,
        pages,
        currentPage: safePage,
        totalItems,
        itemsPerPage: safeLimit,
        nextPage: safePage < pages ? safePage + 1 : null,
        previousPage: safePage > 1 ? safePage - 1 : null,
      },
    }).pipe(delay(220));
  }

  getPropertyById(id: string): Observable<any> {
    const property = ALL_PROPERTIES_FAKE_DATA.find(
      (item) => item._id === id || item.slug === id || item.targetId === id,
    );

    if (!property) {
      return throwError(() => new Error('Property not found'));
    }

    return of(this.toPropertyDetailsShape(property)).pipe(delay(180));
  }

  searchProperties(filters: any): Observable<PropertyResponse> {
    const page = Number(filters?.page || 1);
    const limit = Number(filters?.limit || 10);
    const title = String(filters?.title || filters?.search || '');
    return this.getProperties(page, limit, title);
  }

  private toPropertyDetailsShape(property: Property): any {
    const basePrice = property.salePricing?.basePrice || property.displayPrice || 0;
    const pricePerMeter =
      property.salePricing?.pricePerMeter ||
      (property.area && property.area > 0 ? Math.round(basePrice / property.area) : 0);

    return {
      _id: property._id,
      slug: property.slug,
      status: property.status || 'active',
      ownerType: property.ownerType || 'broker',
      ownerId: property.ownerId || 'owner-demo',
      projectId: property.projectId || 'project-demo',
      name: property.name || property.title,
      description: property.description || '',
      type: property.type,
      location: property.location,
      isFeatured: !!property.isFeatured,
      gallery: property.gallery || [],
      documents: property.documents || [],
      floorsCount: property.floorsCount || 0,
      facilitiesAndServices: property.facilitiesAndServices || [],
      nearbyLandmarks: property.nearbyLandmarks || [
        { name: 'Primary Service Center', type: 'Service', distance: '1.2 km' },
      ],
      project:
        property.project ||
        ({
          name: 'Stay_At Signature Development',
          featuresAndServices: ['Security', 'Retail', 'Community Spaces'],
          startDate: '2021-01-01T00:00:00.000Z',
          expectedDeliveryDate: '2027-01-01T00:00:00.000Z',
        } as any),
      owner:
        property.owner ||
        ({
          type: property.ownerType,
          name: 'Stay_At Verified Broker',
          role: 'broker',
          contact: {
            phoneNumber: '+201000000000',
            email: 'contact@stay-at.demo',
          },
          stats: {
            listedCount: 24,
            soldCount: 11,
          },
        } as any),
      salePricing:
        property.salePricing ||
        ({
          _id: `sale-${property._id}`,
          basePrice,
          pricePerMeter,
          currency: property.currency || 'EGP',
          plans: [
            {
              name_ar: 'كاش',
              name_en: 'Cash',
              saleType: 'cash',
              discountPercent: 5,
              _id: `plan-cash-${property._id}`,
            },
            {
              name_ar: 'تقسيط 6 سنوات',
              name_en: 'Installment 6 Years',
              saleType: 'installment',
              downPaymentPercent: 20,
              years: 6,
              interestRate: 0.1,
              _id: `plan-inst-${property._id}`,
            },
          ],
          negotiable: true,
          status: 'active',
        } as any),
      saleAnalysis:
        property.saleAnalysis ||
        ({
          priceAnalysis: {
            pricePerMeter,
            priceDiffPercent: -1.8,
            status: 'Competitive in current market.',
          },
          investmentAnalysis: {
            appreciationRate: 10.2,
            investmentScore: 8.1,
            rentalYield: 6.5,
            annualRentIncome: Math.round(basePrice * 0.065),
            paybackPeriod: 15,
          },
          summary: 'Balanced asset with resilient demand and liquidity.',
          lastUpdated: '2026-03-01T10:00:00.000Z',
          smartInsights: ['Stable capital appreciation', 'Healthy resale demand'],
        } as any),
    };
  }

  private translateTitle(title: string): string {
    const map: Record<string, string> = {
      'Skyline Apartment - New Cairo': 'شقة سكاي لاين - القاهرة الجديدة',
      'Garden Villa - Mountain View iCity': 'فيلا بحديقة - ماونتن فيو آي سيتي',
      'Marassi Serviced Chalet': 'شاليه فندقي - مراسي',
      'Downtown Commercial Office': 'مكتب تجاري - وسط البلد',
      'Zayed Studio - Hybrid Listing': 'استوديو الشيخ زايد - عرض مرن',
      'Seafront Apartment - San Stefano': 'شقة مطلة على البحر - سان ستيفانو',
      'Smart Apartment - Taj City': 'شقة ذكية - تاج سيتي',
      'Luxury Penthouse - Zamalek': 'بنتهاوس فاخر - الزمالك',
      'Porto Sokhna Weekend Home': 'وحدة عطلات - بورتو السخنة',
      'Hybrid Duplex - Mivida': 'دوبلكس مرن - ميفيدا',
    };

    return map[title] || title;
  }
}
