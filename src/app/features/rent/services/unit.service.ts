import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LanguageService } from '../../../core/services/language.service';
import { ApiProperty } from '../../../core/models/api-property.model';

export interface UnitLocation {
  country: string;
  city: string;
  area: string;
  address: string;
  coordinates: {
    type: string;
    coordinates: number[];
  };
}

export interface UnitMedia {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  original_filename: string;
  _id: string;
}

export interface ListingPrice {
  salePrice: number;
  rentPrice: number;
  rentPeriod: string;
  currency: string;
}

export interface PriceEvaluation {
  status: string;
  marketComparison: string;
  isGoodDeal: boolean;
}

export interface LocationEvaluation {
  rating: number;
  pros: string[];
  description: string;
}

export interface NearbyLandmark {
  name: string;
  type: string;
  distance: string;
}

export interface AIAnalysis {
  priceEvaluation: PriceEvaluation;
  locationEvaluation: LocationEvaluation;
  nearbyLandmarks: NearbyLandmark[];
  summary: string;
  lastUpdated: string;
  smartInsights?: string[];
}

export interface Unit {
  _id: string;
  propertyId: string;
  projectId: string;
  ownerType: string;
  ownerId: string;
  slug: string;
  unitNumber: string;
  purpose: string;
  location: UnitLocation;
  unitArea: number;
  bedrooms: number;
  bathrooms: number;
  floorNumber: number;
  furnished: boolean;
  maxGuests: number;
  totalReviews?: number;
  averageRating?: number;
  viewsCount?: number;
  isTrusted?: boolean;
  listingPrice: ListingPrice;
  isFeatured: boolean;
  gallery: UnitMedia[];
  documents: UnitMedia[];
  aiAnalysis: AIAnalysis;
  status: string;
  title: string;
  description: string;
  unitType: string;
  facilitiesAndServices: string[];
  nearbyLandmarks?: NearbyLandmark[];
  availabilities?: Array<{
    _id: string;
    startDate: string;
    endDate: string;
    status: string;
    reason?: string;
    id?: string;
  }>;
  project?: any;
  owner?: {
    type: string;
    name: string;
    role: string;
    contact: {
      phoneNumber: string;
      email: string;
    };
    stats?: {
      listedCount: number;
      soldCount: number;
    };
  };
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
    };
    summary: string;
    lastUpdated: string;
    smartInsights: string[];
  };
  finalPricing?: {
    _id: string;
    targetType: string;
    targetId: string;
    purpose: string;
    rentType: string;
    price: number;
    tiers: Array<{
      minDays: number;
      pricePerDay: number;
      label: string;
      _id: string;
    }>;
    currency: string;
    isActive: boolean;
    createdBy: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    updatedBy?: string;
    deletedAt?: string;
    deletedBy?: string;
  };
  basePricing?: {
    _id?: string;
    purpose?: string;
    rentType?: string;
    price?: number;
    tiers?: Array<{
      minDays: number;
      pricePerDay: number;
      label: string;
      _id?: string;
    }>;
    currency?: string;
  };
  seasonalPricing?: {
    _id?: string;
    seasonName?: string;
    startDate?: string;
    endDate?: string;
    price?: number;
    tiers?: Array<{
      minDays: number;
      pricePerDay: number;
      label: string;
      _id?: string;
    }>;
    currency?: string;
    rentType?: string;
  };
  rentAnalysis?: {
    priceEvaluation?: {
      status?: string;
      marketComparison?: string;
      isGoodDeal?: boolean;
    };
    locationEvaluation?: {
      rating?: number;
      pros?: string[];
      description?: string;
    };
    summary?: string;
    lastUpdated?: string;
    smartInsights?: string[];
  };
  createdAt?: string;
}

export interface UnitFilters {
  propertyId?: string;
  projectId?: string;
  title?: string;
  unitType?: string; // Can be comma-separated values
  purpose?: string;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  guests?: number;
  rentPeriod?: string; // Can be comma-separated values
  priceFrom?: number;
  priceTo?: number;
  isVerified?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface UnitsResponse {
  message: string;
  results: {
    data: ApiProperty[];
    pages: number;
    currentPage: string | number;
    totalItems: number;
    itemsPerPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}

type SortType = 'price_asc' | 'price_desc' | 'newest' | undefined | '';

const DEMO_UNITS: Unit[] = [
  {
    _id: 'unit-rent-001',
    propertyId: 'prop-001',
    projectId: 'proj-eastown',
    ownerType: 'broker',
    ownerId: 'owner-001',
    slug: 'luxury-apartment-eastown-cairo',
    unitNumber: 'A-1203',
    purpose: 'rent',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'New Cairo',
      address: 'Eastown Residence, Fifth Settlement',
      coordinates: { type: 'Point', coordinates: [31.4922, 30.0221] },
    },
    unitArea: 180,
    bedrooms: 3,
    bathrooms: 3,
    floorNumber: 12,
    furnished: true,
    maxGuests: 6,
    totalReviews: 94,
    averageRating: 4.8,
    viewsCount: 3712,
    isTrusted: true,
    listingPrice: { salePrice: 0, rentPrice: 42000, rentPeriod: 'monthly', currency: 'EGP' },
    isFeatured: true,
    gallery: [
      { public_id: 'rent-001-1', secure_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'living-room', _id: 'media-001-1' },
      { public_id: 'rent-001-2', secure_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'kitchen', _id: 'media-001-2' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'fair', marketComparison: '4% below area average', isGoodDeal: true },
      locationEvaluation: { rating: 4.7, pros: ['Near AUC', 'Quiet compound'], description: 'Prime location with high rental demand.' },
      nearbyLandmarks: [
        { name: 'The American University in Cairo', type: 'University', distance: '2.5 km' },
        { name: 'Point 90 Mall', type: 'Mall', distance: '1.8 km' },
      ],
      summary: 'High-demand family unit in a premium compound.',
      lastUpdated: '2026-02-10T10:00:00.000Z',
      smartInsights: ['Strong occupancy in Q1', 'Suitable for expat tenants'],
    },
    status: 'available',
    title: 'Luxury Furnished Apartment - Eastown',
    description: 'Spacious fully furnished apartment with premium finishing and open city view.',
    unitType: 'apartment',
    facilitiesAndServices: ['Central AC', 'Private Parking', 'Smart Home', '24/7 Security'],
    nearbyLandmarks: [
      { name: 'AUC', type: 'University', distance: '2.5 km' },
      { name: 'Point 90', type: 'Mall', distance: '1.8 km' },
    ],
    createdAt: '2026-01-20T08:30:00.000Z',
    finalPricing: {
      _id: 'fp-001',
      targetType: 'unit',
      targetId: 'unit-rent-001',
      purpose: 'rent',
      rentType: 'monthly',
      price: 42000,
      tiers: [
        { minDays: 30, pricePerDay: 1400, label: 'Monthly plan', _id: 'tier-001-1' },
      ],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2026-01-20T08:30:00.000Z',
      updatedAt: '2026-01-20T08:30:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-rent-002',
    propertyId: 'prop-002',
    projectId: 'proj-zed-west',
    ownerType: 'real_estate_developer',
    ownerId: 'owner-002',
    slug: 'modern-studio-zed-sheikh-zayed',
    unitNumber: 'S-509',
    purpose: 'rent',
    location: {
      country: 'Egypt',
      city: 'Giza',
      area: 'Sheikh Zayed',
      address: 'ZED Towers',
      coordinates: { type: 'Point', coordinates: [30.9768, 30.0144] },
    },
    unitArea: 78,
    bedrooms: 1,
    bathrooms: 1,
    floorNumber: 5,
    furnished: true,
    maxGuests: 2,
    totalReviews: 51,
    averageRating: 4.6,
    viewsCount: 1920,
    isTrusted: true,
    listingPrice: { salePrice: 0, rentPrice: 2100, rentPeriod: 'daily', currency: 'EGP' },
    isFeatured: false,
    gallery: [
      { public_id: 'rent-002-1', secure_url: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'studio', _id: 'media-002-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'competitive', marketComparison: 'Aligned with market median', isGoodDeal: true },
      locationEvaluation: { rating: 4.5, pros: ['Near Arkan Plaza'], description: 'Excellent for short-term stays.' },
      nearbyLandmarks: [{ name: 'Arkan Plaza', type: 'Mall', distance: '1.2 km' }],
      summary: 'Well-performing short-stay studio in a central zone.',
      lastUpdated: '2026-02-14T12:00:00.000Z',
    },
    status: 'available',
    title: 'Modern Studio - ZED Towers',
    description: 'Compact and elegant studio with hotel-like services and premium amenities.',
    unitType: 'studio',
    facilitiesAndServices: ['Gym', 'Housekeeping', 'High-Speed Internet'],
    nearbyLandmarks: [{ name: 'Arkan Plaza', type: 'Mall', distance: '1.2 km' }],
    createdAt: '2026-02-03T11:00:00.000Z',
    finalPricing: {
      _id: 'fp-002',
      targetType: 'unit',
      targetId: 'unit-rent-002',
      purpose: 'rent',
      rentType: 'daily',
      price: 2100,
      tiers: [
        { minDays: 1, pricePerDay: 2100, label: '1-6 days', _id: 'tier-002-1' },
        { minDays: 7, pricePerDay: 1850, label: '7+ days', _id: 'tier-002-2' },
      ],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2026-02-03T11:00:00.000Z',
      updatedAt: '2026-02-03T11:00:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-rent-003',
    propertyId: 'prop-003',
    projectId: 'proj-marassi',
    ownerType: 'owner',
    ownerId: 'owner-003',
    slug: 'beach-villa-marassi-north-coast',
    unitNumber: 'V-14',
    purpose: 'rent',
    location: {
      country: 'Egypt',
      city: 'Matrouh',
      area: 'North Coast',
      address: 'Marassi, Sidi Abdelrahman',
      coordinates: { type: 'Point', coordinates: [28.9484, 30.8844] },
    },
    unitArea: 350,
    bedrooms: 5,
    bathrooms: 4,
    floorNumber: 2,
    furnished: true,
    maxGuests: 10,
    totalReviews: 35,
    averageRating: 4.9,
    viewsCount: 4800,
    isTrusted: true,
    listingPrice: { salePrice: 0, rentPrice: 15000, rentPeriod: 'daily', currency: 'EGP' },
    isFeatured: true,
    gallery: [
      { public_id: 'rent-003-1', secure_url: 'https://images.unsplash.com/photo-1613977257592-487ecd136cc3?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'villa', _id: 'media-003-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'premium', marketComparison: '11% above area average', isGoodDeal: false },
      locationEvaluation: { rating: 4.9, pros: ['Sea view', 'Private beach access'], description: 'Ultra-premium vacation property.' },
      nearbyLandmarks: [{ name: 'Marassi Marina', type: 'Marina', distance: '0.9 km' }],
      summary: 'Strong seasonal demand with high nightly revenue.',
      lastUpdated: '2026-02-07T09:00:00.000Z',
    },
    status: 'available',
    title: 'Beachfront Villa - Marassi',
    description: 'Exclusive villa with private garden, pool, and direct beach access.',
    unitType: 'villa',
    facilitiesAndServices: ['Private Pool', 'Sea View Terrace', 'BBQ Area', 'Housekeeping'],
    nearbyLandmarks: [{ name: 'Marassi Marina', type: 'Marina', distance: '0.9 km' }],
    createdAt: '2025-12-15T15:00:00.000Z',
    finalPricing: {
      _id: 'fp-003',
      targetType: 'unit',
      targetId: 'unit-rent-003',
      purpose: 'rent',
      rentType: 'daily',
      price: 15000,
      tiers: [
        { minDays: 1, pricePerDay: 15000, label: 'Weekdays', _id: 'tier-003-1' },
        { minDays: 3, pricePerDay: 13500, label: '3+ days', _id: 'tier-003-2' },
      ],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2025-12-15T15:00:00.000Z',
      updatedAt: '2025-12-15T15:00:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-rent-004',
    propertyId: 'prop-004',
    projectId: 'proj-mivida',
    ownerType: 'broker',
    ownerId: 'owner-004',
    slug: 'duplex-mivida-new-cairo',
    unitNumber: 'D-302',
    purpose: 'sale_and_rent',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'New Cairo',
      address: 'Mivida Compound',
      coordinates: { type: 'Point', coordinates: [31.4595, 30.0042] },
    },
    unitArea: 240,
    bedrooms: 4,
    bathrooms: 3,
    floorNumber: 3,
    furnished: false,
    maxGuests: 7,
    totalReviews: 22,
    averageRating: 4.4,
    viewsCount: 1290,
    isTrusted: false,
    listingPrice: { salePrice: 8700000, rentPrice: 55000, rentPeriod: 'monthly', currency: 'EGP' },
    isFeatured: false,
    gallery: [
      { public_id: 'rent-004-1', secure_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'duplex', _id: 'media-004-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'fair', marketComparison: '2% above average', isGoodDeal: false },
      locationEvaluation: { rating: 4.3, pros: ['Family community'], description: 'Long-term value in mature compound.' },
      nearbyLandmarks: [{ name: 'Mivida Clubhouse', type: 'Club', distance: '0.5 km' }],
      summary: 'Flexible unit for rent or sale with strong family appeal.',
      lastUpdated: '2026-02-01T14:00:00.000Z',
    },
    status: 'available',
    title: 'Family Duplex - Mivida',
    description: 'Large duplex ideal for families, overlooking landscaped gardens.',
    unitType: 'duplex',
    facilitiesAndServices: ['Club Access', 'Underground Parking', 'Security'],
    nearbyLandmarks: [{ name: 'Mivida Clubhouse', type: 'Club', distance: '0.5 km' }],
    createdAt: '2026-01-05T09:00:00.000Z',
    salePricing: {
      _id: 'sp-004',
      basePrice: 8700000,
      pricePerMeter: 36250,
      currency: 'EGP',
      plans: [
        { name_ar: 'كاش', name_en: 'Cash', saleType: 'cash', discountPercent: 8, _id: 'sp-004-1' },
        { name_ar: 'تقسيط 7 سنين', name_en: 'Installment 7 Years', saleType: 'installment', downPaymentPercent: 20, years: 7, interestRate: 0.09, _id: 'sp-004-2' },
      ],
      negotiable: true,
      status: 'active',
    },
    finalPricing: {
      _id: 'fp-004',
      targetType: 'unit',
      targetId: 'unit-rent-004',
      purpose: 'rent',
      rentType: 'monthly',
      price: 55000,
      tiers: [{ minDays: 30, pricePerDay: 1833, label: 'Monthly', _id: 'tier-004-1' }],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2026-01-05T09:00:00.000Z',
      updatedAt: '2026-01-05T09:00:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-rent-005',
    propertyId: 'prop-005',
    projectId: 'proj-jefaira',
    ownerType: 'owner',
    ownerId: 'owner-005',
    slug: 'serviced-chalet-jefaira',
    unitNumber: 'C-220',
    purpose: 'rent',
    location: {
      country: 'Egypt',
      city: 'Matrouh',
      area: 'Ras El Hekma',
      address: 'Jefaira, North Coast',
      coordinates: { type: 'Point', coordinates: [27.9145, 31.0557] },
    },
    unitArea: 140,
    bedrooms: 2,
    bathrooms: 2,
    floorNumber: 2,
    furnished: true,
    maxGuests: 5,
    totalReviews: 18,
    averageRating: 4.5,
    viewsCount: 1410,
    isTrusted: true,
    listingPrice: { salePrice: 0, rentPrice: 7200, rentPeriod: 'daily', currency: 'EGP' },
    isFeatured: true,
    gallery: [
      { public_id: 'rent-005-1', secure_url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'chalet', _id: 'media-005-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'great', marketComparison: '6% below similar serviced chalets', isGoodDeal: true },
      locationEvaluation: { rating: 4.6, pros: ['Beach service', 'Family-friendly'], description: 'Excellent seasonal occupancy and repeat bookings.' },
      nearbyLandmarks: [{ name: 'Jefaira Beach Club', type: 'Beach Club', distance: '0.3 km' }],
      summary: 'Premium seasonal rental with strong review scores.',
      lastUpdated: '2026-01-30T10:00:00.000Z',
    },
    status: 'available',
    title: 'Serviced Chalet - Jefaira',
    description: 'Sea-facing chalet with hotel services and direct beach shuttle.',
    unitType: 'chalet',
    facilitiesAndServices: ['Beach Access', 'Kids Area', 'Housekeeping'],
    nearbyLandmarks: [{ name: 'Jefaira Beach Club', type: 'Beach Club', distance: '0.3 km' }],
    createdAt: '2026-02-10T12:00:00.000Z',
    finalPricing: {
      _id: 'fp-005',
      targetType: 'unit',
      targetId: 'unit-rent-005',
      purpose: 'rent',
      rentType: 'daily',
      price: 7200,
      tiers: [
        { minDays: 1, pricePerDay: 7200, label: 'Standard', _id: 'tier-005-1' },
        { minDays: 5, pricePerDay: 6500, label: '5+ days', _id: 'tier-005-2' },
      ],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2026-02-10T12:00:00.000Z',
      updatedAt: '2026-02-10T12:00:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-rent-006',
    propertyId: 'prop-006',
    projectId: 'proj-taj-city',
    ownerType: 'real_estate_developer',
    ownerId: 'owner-006',
    slug: 'business-apartment-taj-city',
    unitNumber: 'B-811',
    purpose: 'rent',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'Nasr City',
      address: 'Taj City Compound',
      coordinates: { type: 'Point', coordinates: [31.3802, 30.0732] },
    },
    unitArea: 120,
    bedrooms: 2,
    bathrooms: 2,
    floorNumber: 8,
    furnished: false,
    maxGuests: 4,
    totalReviews: 12,
    averageRating: 4.2,
    viewsCount: 960,
    isTrusted: true,
    listingPrice: { salePrice: 0, rentPrice: 32000, rentPeriod: 'monthly', currency: 'EGP' },
    isFeatured: false,
    gallery: [
      { public_id: 'rent-006-1', secure_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'apartment', _id: 'media-006-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'good', marketComparison: '3% below nearby compounds', isGoodDeal: true },
      locationEvaluation: { rating: 4.2, pros: ['Airport access'], description: 'Good choice for business tenants.' },
      nearbyLandmarks: [{ name: 'Cairo International Airport', type: 'Airport', distance: '9 km' }],
      summary: 'Balanced rent-to-value profile for long stays.',
      lastUpdated: '2026-01-18T13:00:00.000Z',
    },
    status: 'available',
    title: 'Business Apartment - Taj City',
    description: 'Modern unfurnished unit suitable for long-term leasing.',
    unitType: 'apartment',
    facilitiesAndServices: ['Clubhouse', 'Security', 'Parking'],
    nearbyLandmarks: [{ name: 'Cairo Airport', type: 'Airport', distance: '9 km' }],
    createdAt: '2025-11-25T13:00:00.000Z',
    finalPricing: {
      _id: 'fp-006',
      targetType: 'unit',
      targetId: 'unit-rent-006',
      purpose: 'rent',
      rentType: 'monthly',
      price: 32000,
      tiers: [{ minDays: 30, pricePerDay: 1067, label: 'Monthly', _id: 'tier-006-1' }],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2025-11-25T13:00:00.000Z',
      updatedAt: '2025-11-25T13:00:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-rent-007',
    propertyId: 'prop-007',
    projectId: 'proj-mountain-view',
    ownerType: 'broker',
    ownerId: 'owner-007',
    slug: 'garden-villa-mountain-view',
    unitNumber: 'V-31',
    purpose: 'rent',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'Mostakbal City',
      address: 'Mountain View iCity',
      coordinates: { type: 'Point', coordinates: [31.5742, 30.0326] },
    },
    unitArea: 285,
    bedrooms: 4,
    bathrooms: 4,
    floorNumber: 2,
    furnished: true,
    maxGuests: 8,
    totalReviews: 28,
    averageRating: 4.7,
    viewsCount: 2110,
    isTrusted: true,
    listingPrice: { salePrice: 0, rentPrice: 68000, rentPeriod: 'monthly', currency: 'EGP' },
    isFeatured: true,
    gallery: [
      { public_id: 'rent-007-1', secure_url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'villa-garden', _id: 'media-007-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'premium', marketComparison: 'High demand premium segment', isGoodDeal: true },
      locationEvaluation: { rating: 4.8, pros: ['Gated community', 'Green spaces'], description: 'Top-tier family living environment.' },
      nearbyLandmarks: [{ name: 'Madinaty Gate', type: 'Landmark', distance: '4.2 km' }],
      summary: 'Excellent villa option for premium long-term tenants.',
      lastUpdated: '2026-02-08T16:00:00.000Z',
    },
    status: 'available',
    title: 'Garden Villa - Mountain View iCity',
    description: 'Elegant villa with private garden and high privacy.',
    unitType: 'villa',
    facilitiesAndServices: ['Private Garden', 'Security', 'Club Access'],
    nearbyLandmarks: [{ name: 'Madinaty Gate', type: 'Landmark', distance: '4.2 km' }],
    createdAt: '2026-02-08T16:00:00.000Z',
    finalPricing: {
      _id: 'fp-007',
      targetType: 'unit',
      targetId: 'unit-rent-007',
      purpose: 'rent',
      rentType: 'monthly',
      price: 68000,
      tiers: [{ minDays: 30, pricePerDay: 2267, label: 'Monthly', _id: 'tier-007-1' }],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2026-02-08T16:00:00.000Z',
      updatedAt: '2026-02-08T16:00:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-rent-008',
    propertyId: 'prop-008',
    projectId: 'proj-hurghada-heights',
    ownerType: 'owner',
    ownerId: 'owner-008',
    slug: 'sea-view-apartment-hurghada',
    unitNumber: 'H-604',
    purpose: 'rent',
    location: {
      country: 'Egypt',
      city: 'Red Sea',
      area: 'Hurghada',
      address: 'Hurghada Heights',
      coordinates: { type: 'Point', coordinates: [33.8312, 27.2579] },
    },
    unitArea: 110,
    bedrooms: 2,
    bathrooms: 2,
    floorNumber: 6,
    furnished: true,
    maxGuests: 4,
    totalReviews: 44,
    averageRating: 4.7,
    viewsCount: 1750,
    isTrusted: false,
    listingPrice: { salePrice: 0, rentPrice: 3500, rentPeriod: 'daily', currency: 'EGP' },
    isFeatured: false,
    gallery: [
      { public_id: 'rent-008-1', secure_url: 'https://images.unsplash.com/photo-1464890100898-a385f744067f?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'sea-view', _id: 'media-008-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'good', marketComparison: '5% below direct competitors', isGoodDeal: true },
      locationEvaluation: { rating: 4.6, pros: ['Sea view', 'Tourist hub'], description: 'Great fit for short stays and remote workers.' },
      nearbyLandmarks: [{ name: 'Hurghada Marina', type: 'Marina', distance: '2.4 km' }],
      summary: 'Strong seasonal occupancy and high review sentiment.',
      lastUpdated: '2026-02-11T17:00:00.000Z',
    },
    status: 'available',
    title: 'Sea View Apartment - Hurghada',
    description: 'Relaxing sea-view apartment close to diving spots and marina.',
    unitType: 'apartment',
    facilitiesAndServices: ['Sea View', 'Pool', 'Reception'],
    nearbyLandmarks: [{ name: 'Hurghada Marina', type: 'Marina', distance: '2.4 km' }],
    createdAt: '2026-02-11T17:00:00.000Z',
    finalPricing: {
      _id: 'fp-008',
      targetType: 'unit',
      targetId: 'unit-rent-008',
      purpose: 'rent',
      rentType: 'daily',
      price: 3500,
      tiers: [
        { minDays: 1, pricePerDay: 3500, label: 'Standard', _id: 'tier-008-1' },
        { minDays: 7, pricePerDay: 3000, label: 'Weekly offer', _id: 'tier-008-2' },
      ],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2026-02-11T17:00:00.000Z',
      updatedAt: '2026-02-11T17:00:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-rent-009',
    propertyId: 'prop-009',
    projectId: 'proj-porto-sokhna',
    ownerType: 'broker',
    ownerId: 'owner-009',
    slug: 'weekend-studio-porto-sokhna',
    unitNumber: 'PS-110',
    purpose: 'rent',
    location: {
      country: 'Egypt',
      city: 'Suez',
      area: 'Ain Sokhna',
      address: 'Porto Sokhna',
      coordinates: { type: 'Point', coordinates: [32.3292, 29.4428] },
    },
    unitArea: 65,
    bedrooms: 1,
    bathrooms: 1,
    floorNumber: 1,
    furnished: true,
    maxGuests: 3,
    totalReviews: 26,
    averageRating: 4.3,
    viewsCount: 1210,
    isTrusted: true,
    listingPrice: { salePrice: 0, rentPrice: 1800, rentPeriod: 'daily', currency: 'EGP' },
    isFeatured: false,
    gallery: [
      { public_id: 'rent-009-1', secure_url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'weekend-studio', _id: 'media-009-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'great', marketComparison: 'Top 20% for value', isGoodDeal: true },
      locationEvaluation: { rating: 4.2, pros: ['Beach access'], description: 'Excellent for quick getaways.' },
      nearbyLandmarks: [{ name: 'Sokhna Cable Car', type: 'Attraction', distance: '0.8 km' }],
      summary: 'Affordable short-stay unit with consistent demand.',
      lastUpdated: '2026-02-12T08:00:00.000Z',
    },
    status: 'available',
    title: 'Weekend Studio - Porto Sokhna',
    description: 'Cozy studio near the beach with easy check-in and services.',
    unitType: 'studio',
    facilitiesAndServices: ['Beach Access', 'Cable Car Access', 'Pool'],
    nearbyLandmarks: [{ name: 'Sokhna Cable Car', type: 'Attraction', distance: '0.8 km' }],
    createdAt: '2026-02-12T08:00:00.000Z',
    finalPricing: {
      _id: 'fp-009',
      targetType: 'unit',
      targetId: 'unit-rent-009',
      purpose: 'rent',
      rentType: 'daily',
      price: 1800,
      tiers: [
        { minDays: 1, pricePerDay: 1800, label: 'Daily', _id: 'tier-009-1' },
        { minDays: 3, pricePerDay: 1600, label: '3+ days', _id: 'tier-009-2' },
      ],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2026-02-12T08:00:00.000Z',
      updatedAt: '2026-02-12T08:00:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-rent-010',
    propertyId: 'prop-010',
    projectId: 'proj-zamalek-classic',
    ownerType: 'owner',
    ownerId: 'owner-010',
    slug: 'classic-apartment-zamalek',
    unitNumber: 'Z-402',
    purpose: 'rent',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'Zamalek',
      address: '26th July Street',
      coordinates: { type: 'Point', coordinates: [31.2244, 30.0618] },
    },
    unitArea: 165,
    bedrooms: 3,
    bathrooms: 2,
    floorNumber: 4,
    furnished: false,
    maxGuests: 5,
    totalReviews: 9,
    averageRating: 4.1,
    viewsCount: 780,
    isTrusted: true,
    listingPrice: { salePrice: 0, rentPrice: 47000, rentPeriod: 'monthly', currency: 'EGP' },
    isFeatured: false,
    gallery: [
      { public_id: 'rent-010-1', secure_url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'classic-apartment', _id: 'media-010-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'fair', marketComparison: 'Historic district premium', isGoodDeal: true },
      locationEvaluation: { rating: 4.4, pros: ['Central location'], description: 'Strong long-term appeal for professionals.' },
      nearbyLandmarks: [{ name: 'Gezira Club', type: 'Club', distance: '1.1 km' }],
      summary: 'Classic city unit with stable demand and strong accessibility.',
      lastUpdated: '2026-01-28T11:30:00.000Z',
    },
    status: 'available',
    title: 'Classic Apartment - Zamalek',
    description: 'Large classic apartment in one of Cairo’s most prestigious districts.',
    unitType: 'apartment',
    facilitiesAndServices: ['Elevator', 'Security', 'Storage Room'],
    nearbyLandmarks: [{ name: 'Gezira Club', type: 'Club', distance: '1.1 km' }],
    createdAt: '2026-01-28T11:30:00.000Z',
    finalPricing: {
      _id: 'fp-010',
      targetType: 'unit',
      targetId: 'unit-rent-010',
      purpose: 'rent',
      rentType: 'monthly',
      price: 47000,
      tiers: [{ minDays: 30, pricePerDay: 1567, label: 'Monthly', _id: 'tier-010-1' }],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2026-01-28T11:30:00.000Z',
      updatedAt: '2026-01-28T11:30:00.000Z',
      __v: 0,
    },
  },
  {
    _id: 'unit-sale-011',
    propertyId: 'prop-011',
    projectId: 'proj-il-bosco',
    ownerType: 'real_estate_developer',
    ownerId: 'owner-011',
    slug: 'smart-apartment-il-bosco',
    unitNumber: 'IB-904',
    purpose: 'sale',
    location: {
      country: 'Egypt',
      city: 'Cairo',
      area: 'New Capital',
      address: 'IL Bosco City',
      coordinates: { type: 'Point', coordinates: [31.7395, 30.0152] },
    },
    unitArea: 155,
    bedrooms: 3,
    bathrooms: 2,
    floorNumber: 9,
    furnished: false,
    maxGuests: 0,
    totalReviews: 19,
    averageRating: 4.5,
    viewsCount: 2140,
    isTrusted: true,
    listingPrice: { salePrice: 6250000, rentPrice: 0, rentPeriod: 'total', currency: 'EGP' },
    isFeatured: true,
    gallery: [
      { public_id: 'sale-011-1', secure_url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'smart-apartment', _id: 'media-011-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'strong', marketComparison: '5% below direct competitors', isGoodDeal: true },
      locationEvaluation: { rating: 4.6, pros: ['Rapid growth zone'], description: 'Excellent entry point in New Capital market.' },
      nearbyLandmarks: [{ name: 'Green River', type: 'Landmark', distance: '2.1 km' }],
      summary: 'Solid capital appreciation potential with competitive entry pricing.',
      lastUpdated: '2026-02-18T10:00:00.000Z',
      smartInsights: ['New metro access planned', 'Strong developer track record'],
    },
    status: 'available',
    title: 'Smart Apartment - IL Bosco',
    description: 'Modern apartment with efficient layout and strong investment value.',
    unitType: 'apartment',
    facilitiesAndServices: ['Smart Home', 'Security', 'Clubhouse'],
    nearbyLandmarks: [{ name: 'Green River', type: 'Landmark', distance: '2.1 km' }],
    createdAt: '2026-02-18T10:00:00.000Z',
    salePricing: {
      _id: 'sp-011',
      basePrice: 6250000,
      pricePerMeter: 40322,
      currency: 'EGP',
      plans: [
        { name_ar: 'كاش', name_en: 'Cash', saleType: 'cash', discountPercent: 9, _id: 'sp-011-1' },
        { name_ar: 'تقسيط 8 سنوات', name_en: 'Installment 8 Years', saleType: 'installment', downPaymentPercent: 15, years: 8, interestRate: 0.1, _id: 'sp-011-2' },
      ],
      negotiable: true,
      status: 'active',
    },
  },
  {
    _id: 'unit-sale-012',
    propertyId: 'prop-012',
    projectId: 'proj-zed-west',
    ownerType: 'broker',
    ownerId: 'owner-012',
    slug: 'luxury-penthouse-zed',
    unitNumber: 'PH-1802',
    purpose: 'sale',
    location: {
      country: 'Egypt',
      city: 'Giza',
      area: 'Sheikh Zayed',
      address: 'ZED West Towers',
      coordinates: { type: 'Point', coordinates: [30.9731, 30.0151] },
    },
    unitArea: 320,
    bedrooms: 4,
    bathrooms: 4,
    floorNumber: 18,
    furnished: true,
    maxGuests: 0,
    totalReviews: 11,
    averageRating: 4.8,
    viewsCount: 2980,
    isTrusted: true,
    listingPrice: { salePrice: 21500000, rentPrice: 0, rentPeriod: 'total', currency: 'EGP' },
    isFeatured: true,
    gallery: [
      { public_id: 'sale-012-1', secure_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'penthouse', _id: 'media-012-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'premium', marketComparison: 'Top-tier segment pricing', isGoodDeal: true },
      locationEvaluation: { rating: 4.9, pros: ['Prime skyline views'], description: 'Prestige product with high resale liquidity.' },
      nearbyLandmarks: [{ name: 'Arkan Plaza', type: 'Mall', distance: '1.4 km' }],
      summary: 'Luxury penthouse with premium demand and strong brand appeal.',
      lastUpdated: '2026-02-09T17:00:00.000Z',
    },
    status: 'available',
    title: 'Luxury Penthouse - ZED West',
    description: 'Panoramic penthouse with private roof terrace and concierge services.',
    unitType: 'penthouse',
    facilitiesAndServices: ['Concierge', 'Private Terrace', 'Valet Parking'],
    nearbyLandmarks: [{ name: 'Arkan Plaza', type: 'Mall', distance: '1.4 km' }],
    createdAt: '2026-02-09T17:00:00.000Z',
    salePricing: {
      _id: 'sp-012',
      basePrice: 21500000,
      pricePerMeter: 67188,
      currency: 'EGP',
      plans: [
        { name_ar: 'كاش', name_en: 'Cash', saleType: 'cash', discountPercent: 7, _id: 'sp-012-1' },
        { name_ar: 'تقسيط 6 سنوات', name_en: 'Installment 6 Years', saleType: 'installment', downPaymentPercent: 20, years: 6, interestRate: 0.08, _id: 'sp-012-2' },
      ],
      negotiable: false,
      status: 'active',
    },
  },
  {
    _id: 'unit-sale-013',
    propertyId: 'prop-013',
    projectId: 'proj-san-stefano',
    ownerType: 'owner',
    ownerId: 'owner-013',
    slug: 'seafront-apartment-san-stefano',
    unitNumber: 'SS-1103',
    purpose: 'sale_and_rent',
    location: {
      country: 'Egypt',
      city: 'Alexandria',
      area: 'San Stefano',
      address: 'Corniche Road',
      coordinates: { type: 'Point', coordinates: [29.9668, 31.2487] },
    },
    unitArea: 210,
    bedrooms: 3,
    bathrooms: 3,
    floorNumber: 11,
    furnished: false,
    maxGuests: 6,
    totalReviews: 14,
    averageRating: 4.6,
    viewsCount: 1880,
    isTrusted: true,
    listingPrice: { salePrice: 9800000, rentPrice: 52000, rentPeriod: 'monthly', currency: 'EGP' },
    isFeatured: false,
    gallery: [
      { public_id: 'sale-013-1', secure_url: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200', format: 'jpg', resource_type: 'image', original_filename: 'seafront-apartment', _id: 'media-013-1' },
    ],
    documents: [],
    aiAnalysis: {
      priceEvaluation: { status: 'good', marketComparison: 'Aligned with premium coastal stock', isGoodDeal: true },
      locationEvaluation: { rating: 4.7, pros: ['Direct sea view'], description: 'High desirability for both end-users and investors.' },
      nearbyLandmarks: [{ name: 'Stanley Bridge', type: 'Landmark', distance: '2.6 km' }],
      summary: 'Dual-purpose listing with strong flexibility and coastal demand.',
      lastUpdated: '2026-02-04T15:00:00.000Z',
    },
    status: 'available',
    title: 'Seafront Apartment - San Stefano',
    description: 'Large sea-facing apartment suitable for residence or investment.',
    unitType: 'apartment',
    facilitiesAndServices: ['Sea View', 'Concierge', 'Parking'],
    nearbyLandmarks: [{ name: 'Stanley Bridge', type: 'Landmark', distance: '2.6 km' }],
    createdAt: '2026-02-04T15:00:00.000Z',
    finalPricing: {
      _id: 'fp-013',
      targetType: 'unit',
      targetId: 'unit-sale-013',
      purpose: 'rent',
      rentType: 'monthly',
      price: 52000,
      tiers: [{ minDays: 30, pricePerDay: 1733, label: 'Monthly', _id: 'tier-013-1' }],
      currency: 'EGP',
      isActive: true,
      createdBy: 'system',
      isDeleted: false,
      createdAt: '2026-02-04T15:00:00.000Z',
      updatedAt: '2026-02-04T15:00:00.000Z',
      __v: 0,
    },
    salePricing: {
      _id: 'sp-013',
      basePrice: 9800000,
      pricePerMeter: 46667,
      currency: 'EGP',
      plans: [
        { name_ar: 'كاش', name_en: 'Cash', saleType: 'cash', discountPercent: 5, _id: 'sp-013-1' },
        { name_ar: 'تقسيط 7 سنوات', name_en: 'Installment 7 Years', saleType: 'installment', downPaymentPercent: 20, years: 7, interestRate: 0.09, _id: 'sp-013-2' },
      ],
      negotiable: true,
      status: 'active',
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private languageService: LanguageService) { }

  getUnits(filters: UnitFilters = {}): Observable<UnitsResponse> {
    const currentLanguage = this.languageService.getCurrentLanguage();
    const filteredUnits = this.applyFilters(DEMO_UNITS, filters);
    const sortedUnits = this.applySort(filteredUnits, filters.sort as SortType);

    const page = Math.max(1, Number(filters.page || 1));
    const limit = Math.max(1, Number(filters.limit || 10));
    const totalItems = sortedUnits.length;
    const pages = Math.max(1, Math.ceil(totalItems / limit));
    const start = (page - 1) * limit;
    const end = start + limit;

    const data = sortedUnits.slice(start, end).map((unit) => this.toApiProperty(unit, currentLanguage));

    return of({
      message: 'Units loaded from local fake data',
      results: {
        data,
        pages,
        currentPage: page,
        totalItems,
        itemsPerPage: limit,
        nextPage: page < pages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
    }).pipe(delay(250));
  }

  getUnitById(id: string): Observable<any> {
    const unit = this.findUnit(id);
    if (!unit) {
      return throwError(() => new Error('Unit not found'));
    }

    return of({ unit }).pipe(delay(180));
  }

  getUnitByIdForSale(id: string): Observable<any> {
    const unit = this.findUnit(id);
    if (!unit) {
      return throwError(() => new Error('Unit not found'));
    }

    return of({ unit }).pipe(delay(180));
  }

  private findUnit(id: string): Unit | undefined {
    return DEMO_UNITS.find((unit) => unit._id === id || unit.slug === id || unit.propertyId === id);
  }

  private applyFilters(units: Unit[], filters: UnitFilters): Unit[] {
    return units.filter((unit) => {
      const displayPrice = this.getDisplayPrice(unit);
      const rentPeriod = (unit.finalPricing?.rentType || unit.listingPrice.rentPeriod || '').toLowerCase();

      if (filters.purpose) {
        const purpose = filters.purpose.toLowerCase();
        const unitPurpose = (unit.purpose || '').toLowerCase();
        if (purpose === 'rent' && !['rent', 'sale_and_rent'].includes(unitPurpose)) {
          return false;
        }
        if (purpose === 'sale' && !['sale', 'sale_and_rent'].includes(unitPurpose)) {
          return false;
        }
        if (purpose !== 'rent' && unitPurpose !== purpose) {
          if (!(purpose === 'sale' && unitPurpose === 'sale_and_rent')) {
            return false;
          }
        }
      }

      if (filters.purpose?.toLowerCase() === 'sale') {
        const hasSalePrice = Number(unit.salePricing?.basePrice || unit.listingPrice?.salePrice || 0) > 0;
        if (!hasSalePrice) {
          return false;
        }
      }

      if (filters.title && !unit.title.toLowerCase().includes(filters.title.toLowerCase().trim())) {
        return false;
      }

      if (filters.unitType) {
        const requested = filters.unitType
          .split(',')
          .map((item) => item.trim().toLowerCase())
          .filter(Boolean);
        if (requested.length && !requested.includes(unit.unitType.toLowerCase())) {
          return false;
        }
      }

      if (typeof filters.bedrooms === 'number' && unit.bedrooms < filters.bedrooms) {
        return false;
      }

      if (typeof filters.bathrooms === 'number' && unit.bathrooms < filters.bathrooms) {
        return false;
      }

      if (typeof filters.furnished === 'boolean' && unit.furnished !== filters.furnished) {
        return false;
      }

      if (typeof filters.isVerified === 'boolean') {
        if (!!unit.isTrusted !== filters.isVerified) {
          return false;
        }
      }

      if (typeof filters.priceFrom === 'number' && displayPrice < filters.priceFrom) {
        return false;
      }

      if (typeof filters.priceTo === 'number' && displayPrice > filters.priceTo) {
        return false;
      }

      if (filters.rentPeriod) {
        const requestedPeriods = filters.rentPeriod
          .split(',')
          .map((item) => item.trim().toLowerCase())
          .filter(Boolean);
        if (requestedPeriods.length && !requestedPeriods.includes(rentPeriod)) {
          return false;
        }
      }

      return true;
    });
  }

  private applySort(units: Unit[], sort: SortType): Unit[] {
    const cloned = [...units];

    if (sort === 'price_asc') {
      return cloned.sort((a, b) => this.getDisplayPrice(a) - this.getDisplayPrice(b));
    }

    if (sort === 'price_desc') {
      return cloned.sort((a, b) => this.getDisplayPrice(b) - this.getDisplayPrice(a));
    }

    if (sort === 'newest') {
      return cloned.sort((a, b) => {
        const first = new Date(a.createdAt || 0).getTime();
        const second = new Date(b.createdAt || 0).getTime();
        return second - first;
      });
    }

    return cloned;
  }

  private getDisplayPrice(unit: Unit): number {
    return Number(
      unit.finalPricing?.price ||
      unit.salePricing?.basePrice ||
      unit.listingPrice?.salePrice ||
      unit.listingPrice?.rentPrice ||
      unit.basePricing?.price ||
      0,
    );
  }

  private toApiProperty(unit: Unit, currentLanguage: string): ApiProperty {
    const isArabic = currentLanguage === 'ar';

    return {
      _id: unit._id,
      slug: unit.slug,
      status: 'active',
      ownerType: unit.ownerType as ApiProperty['ownerType'],
      ownerId: unit.ownerId,
      projectId: unit.projectId,
      targetId: unit._id,
      targetType: 'unit',
      location: {
        country: unit.location.country,
        city: unit.location.city,
        area: unit.location.area,
        address: unit.location.address,
        coordinates: {
          type: unit.location.coordinates.type,
          coordinates: [
            Number(unit.location.coordinates.coordinates[0]),
            Number(unit.location.coordinates.coordinates[1]),
          ] as [number, number],
        },
      },
      isFeatured: unit.isFeatured,
      isTrusted: !!unit.isTrusted,
      gallery: unit.gallery,
      thumbnail: unit.gallery?.[0]
        ? { secure_url: unit.gallery[0].secure_url }
        : undefined,
      documents: unit.documents,
      floorsCount: unit.floorNumber,
      name: unit.title,
      title: isArabic ? this.getArabicTitle(unit.title) : unit.title,
      description: unit.description,
      type: unit.unitType,
      facilitiesAndServices: unit.facilitiesAndServices,
      area: unit.unitArea,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      furnished: unit.furnished,
      displayPrice: this.getDisplayPrice(unit),
      currency: unit.finalPricing?.currency || unit.listingPrice.currency || 'EGP',
      priceType: this.mapRentPeriodToPriceType(unit.finalPricing?.rentType || unit.listingPrice.rentPeriod),
      purpose: unit.purpose as ApiProperty['purpose'],
      rating: unit.averageRating,
      createdAt: unit.createdAt,
    };
  }

  private mapRentPeriodToPriceType(period: string | undefined): ApiProperty['priceType'] {
    const normalized = (period || '').toLowerCase();
    if (normalized === 'daily') return 'daily';
    if (normalized === 'monthly') return 'monthly';
    return 'total';
  }

  private getArabicTitle(title: string): string {
    const translations: Record<string, string> = {
      'Luxury Furnished Apartment - Eastown': 'شقة فاخرة مفروشة - إيستاون',
      'Modern Studio - ZED Towers': 'استوديو عصري - أبراج زِد',
      'Beachfront Villa - Marassi': 'فيلا على البحر - مراسي',
      'Family Duplex - Mivida': 'دوبلكس عائلي - ميفيدا',
      'Serviced Chalet - Jefaira': 'شاليه فندقي - جيفيرا',
      'Business Apartment - Taj City': 'شقة للأعمال - تاج سيتي',
      'Garden Villa - Mountain View iCity': 'فيلا بحديقة - ماونتن فيو آي سيتي',
      'Sea View Apartment - Hurghada': 'شقة بإطلالة بحرية - الغردقة',
      'Weekend Studio - Porto Sokhna': 'استوديو عطلات - بورتو السخنة',
      'Classic Apartment - Zamalek': 'شقة كلاسيكية - الزمالك',
      'Smart Apartment - IL Bosco': 'شقة ذكية - إل بوسكو',
      'Luxury Penthouse - ZED West': 'بنتهاوس فاخر - زد ويست',
      'Seafront Apartment - San Stefano': 'شقة بحرية - سان ستيفانو',
    };

    return translations[title] || title;
  }
}
