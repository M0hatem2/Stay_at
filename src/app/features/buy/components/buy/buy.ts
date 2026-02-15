import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 import { FullPropertyData, Property } from '../../../../core/models/property.model';
import { Router } from '@angular/router';
import { UnitsCard } from '../../../../shared/components/units-card/units-card';

@Component({
  selector: 'app-buy',
  imports: [CommonModule, FormsModule, UnitsCard],
  templateUrl: './buy.html',
  styleUrl: './buy.scss',
})
export class Buy implements OnInit {
  showFilters = false;
  sortOption: 'recommended' | 'price-low' | 'price-high' | 'newest' | 'area' = 'recommended';

  constructor(private router: Router) {}
  filters: {
    type: string;
    minBedrooms: number | null;
    minBathrooms: number | null;
    managed: boolean;
    verified: boolean;
    priceMin: number | null;
    priceMax: number | null;
    areaMin: number | null;
    areaMax: number | null;
  } = {
    type: '',
    minBedrooms: null,
    minBathrooms: null,
    managed: false,
    verified: false,
    priceMin: null,
    priceMax: null,
    areaMin: null,
    areaMax: null,
  };
  displayedProperties: Property[] = [];
  properties: FullPropertyData[] = [
    {
      id: 1,
      slug: 'luxury-furnished-apartment-fifth-settlement',
      type: 'شقة',
      title: 'شقة مفروشة فاخرة - التجمع الخامس',
      location: 'التجمع الخامس، القاهرة الجديدة',
      bedrooms: 3,
      bathrooms: 2,
      area: '180م²',
      price: 12,
      priceType: 'monthly',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      isManaged: true,
      isVerified: true,
      rating: 4.8,
      reviews: 24,
      description:
        'Luxury apartment in a prime location with all amenities and services. Super luxury finishing, wonderful view, close to all services and transportation. The apartment is fully furnished with modern furniture and appliances.',
      locationDetails: {
        area: 'Fifth Settlement, New Cairo',
        latitude: 30.0444,
        longitude: 31.2357,
      },
      images: {
        hero: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
        ],
      },
      badges: {
        managed: true,
        verified: true,
      },
      stats: {
        bedrooms: 3,
        bathrooms: 2,
        area_sqm: 180,
        rating: 4.8,
        review_count: 24,
      },
      details: {
        floor: 5,
        furnished: true,
        year_built: 2021,
      },
      amenities: [
        'Central AC',
        'Fully Equipped Kitchen',
        'Swimming Pool',
        'Gym',
        '24/7 Security',
        'Parking',
        'Private Garden',
        'Spacious Balcony',
      ],
      pricing: {
        currency: 'EGP',
        pricing_table: [
          {
            id: 'p_1day',
            duration_label: '1 Day',
            days: 1,
            price_per_day: 450,
            discount_percent: 0,
            total: 450,
            savings: 0,
            is_popular: false,
            selected: false,
          },
          {
            id: 'p_3days',
            duration_label: '3 Days',
            days: 3,
            price_per_day: 428,
            discount_percent: 5,
            total: 1283,
            savings: 67,
            is_popular: false,
            selected: false,
          },
          {
            id: 'p_1week',
            duration_label: '1 Week',
            days: 7,
            price_per_day: 405,
            discount_percent: 10,
            total: 2835,
            savings: 315,
            is_popular: false,
            selected: false,
          },
          {
            id: 'p_2weeks',
            duration_label: '2 Weeks',
            days: 14,
            price_per_day: 383,
            discount_percent: 15,
            total: 5355,
            savings: 945,
            is_popular: false,
            selected: false,
          },
          {
            id: 'p_1month',
            duration_label: '1 Month',
            days: 30,
            price_per_day: 360,
            discount_percent: 20,
            total: 12000,
            savings: 1500,
            is_popular: true,
            selected: true,
          },
          {
            id: 'p_3months',
            duration_label: '3 Months',
            days: 90,
            price_per_day: 338,
            discount_percent: 25,
            total: 34200,
            savings: 6300,
            is_popular: false,
            selected: false,
          },
          {
            id: 'p_6months',
            duration_label: '6 Months',
            days: 180,
            price_per_day: 315,
            discount_percent: 30,
            total: 64800,
            savings: 16200,
            is_popular: false,
            selected: false,
          },
          {
            id: 'p_1year',
            duration_label: '1 Year',
            days: 365,
            price_per_day: 293,
            discount_percent: 35,
            total: 130000,
            savings: 34250,
            is_popular: false,
            selected: false,
          },
        ],
        sidebar_display_price: {
          amount: 12,
          currency: 'EGP',
          period_label: 'Monthly',
          note: 'small-card sidebar (as shown in UI)',
        },
        monthly_offer: {
          amount: 12000,
          currency: 'EGP',
          period: 'month',
        },
        free_cancellation_hours: 24,
      },
      availability: {
        summary: {
          available_count: 1,
        },
        next_available_date: '2025-06-01',
        days_until_next_available: -195,
        current_period: {
          from: '2025-06-01',
          to: '2025-12-31',
          remaining_days: 18,
          price_per_month: 12000,
          status: 'available',
        },
        legend: {
          available: 'green',
          occupied: 'red',
          pending: 'yellow',
        },
      },
      smart_analysis: {
        fair_price_below_market_percent: 8,
        location_rating_out_of_10: 9,
        highlights: ['Fair Price', 'Excellent Location'],
      },
      location_details: {
        map_provider: 'leafletjs',
        latitude: 30.0444,
        longitude: 31.2357,
        nearby_places: [
          {
            name: 'Cairo Festival City',
            type: 'Mall',
            distance_km: 2,
          },
          {
            name: 'American University',
            type: 'University',
            distance_km: 3.5,
          },
          {
            name: 'El Salam Hospital',
            type: 'Hospital',
            distance_km: 1.5,
          },
        ],
      },
      owner: {
        name: 'Ahmed Mohamed',
        role: 'Owner',
        verified: true,
        properties_listed: 12,
        response_rate_percent: 95,
        contact_options: {
          show_number: true,
          contact_form: true,
        },
      },
      safety_tips: [
        "Don't pay before viewing",
        'Verify official documents',
        'Use secure payment methods',
      ],
      meta: {
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-06-01T12:00:00Z',
      },
    },
    {
      id: 2,
      slug: 'modern-studio-sheikh-zayed',
      type: 'استوديو',
      title: 'استوديو عصري - الشيخ زايد',
      location: 'الشيخ زايد، الجيزة',
      bedrooms: 1,
      bathrooms: 1,
      area: '65م²',
      price: 8,
      priceType: 'monthly',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      isManaged: false,
      isVerified: true,
      rating: 4.6,
      reviews: 15,
      description:
        'Modern studio apartment with contemporary design and all essential amenities. Perfect for young professionals or students.',
      locationDetails: {
        area: 'Sheikh Zayed, Giza',
        latitude: 30.0123,
        longitude: 31.1234,
      },
      images: {
        hero: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
        ],
      },
      badges: {
        managed: false,
        verified: true,
      },
      stats: {
        bedrooms: 1,
        bathrooms: 1,
        area_sqm: 65,
        rating: 4.6,
        review_count: 15,
      },
      details: {
        floor: 3,
        furnished: true,
        year_built: 2019,
      },
      amenities: ['Central AC', 'Fully Equipped Kitchen', '24/7 Security', 'Parking'],
      pricing: {
        currency: 'EGP',
        pricing_table: [
          {
            id: 'p_1day',
            duration_label: '1 Day',
            days: 1,
            price_per_day: 350,
            discount_percent: 0,
            total: 350,
            savings: 0,
            is_popular: false,
            selected: false,
          },
          {
            id: 'p_1month',
            duration_label: '1 Month',
            days: 30,
            price_per_day: 280,
            discount_percent: 20,
            total: 8400,
            savings: 1600,
            is_popular: true,
            selected: true,
          },
        ],
        sidebar_display_price: {
          amount: 8,
          currency: 'EGP',
          period_label: 'Monthly',
          note: 'small-card sidebar',
        },
        monthly_offer: {
          amount: 8400,
          currency: 'EGP',
          period: 'month',
        },
        free_cancellation_hours: 24,
      },
      availability: {
        summary: {
          available_count: 1,
        },
        next_available_date: '2025-06-15',
        days_until_next_available: -180,
        current_period: {
          from: '2025-06-15',
          to: '2025-12-31',
          remaining_days: 15,
          price_per_month: 8400,
          status: 'available',
        },
        legend: {
          available: 'green',
          occupied: 'red',
          pending: 'yellow',
        },
      },
      smart_analysis: {
        fair_price_below_market_percent: 12,
        location_rating_out_of_10: 7,
        highlights: ['Fair Price'],
      },
      location_details: {
        map_provider: 'leafletjs',
        latitude: 30.0123,
        longitude: 31.1234,
        nearby_places: [
          {
            name: 'Sheikh Zayed Mall',
            type: 'Mall',
            distance_km: 1.5,
          },
        ],
      },
      owner: {
        name: 'Mohamed Ali',
        role: 'Owner',
        verified: true,
        properties_listed: 8,
        response_rate_percent: 90,
        contact_options: {
          show_number: true,
          contact_form: true,
        },
      },
      safety_tips: [
        "Don't pay before viewing",
        'Verify official documents',
        'Use secure payment methods',
      ],
      meta: {
        created_at: '2025-02-01T00:00:00Z',
        updated_at: '2025-06-01T12:00:00Z',
      },
    },
    {
      id: 3,
      slug: 'beach-chalet-north-coast',
      type: 'شاليه',
      title: 'شاليه على البحر - الساحل الشمالي',
      location: 'الساحل الشمالي، مطروح',
      bedrooms: 2,
      bathrooms: 2,
      area: '120م²',
      price: 3,
      priceType: 'daily',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      isManaged: true,
      isVerified: true,
      rating: 4.9,
      reviews: 42,
      description:
        'Beautiful beach chalet with direct sea view. Perfect for weekend getaways and vacations.',
      locationDetails: {
        area: 'North Coast, Matrouh',
        latitude: 31.3456,
        longitude: 28.789,
      },
      images: {
        hero: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
        ],
      },
      badges: {
        managed: true,
        verified: true,
      },
      stats: {
        bedrooms: 2,
        bathrooms: 2,
        area_sqm: 120,
        rating: 4.9,
        review_count: 42,
      },
      details: {
        floor: 1,
        furnished: true,
        year_built: 2020,
      },
      amenities: [
        'Central AC',
        'Fully Equipped Kitchen',
        'Private Beach Access',
        'Swimming Pool',
        '24/7 Security',
      ],
      pricing: {
        currency: 'EGP',
        pricing_table: [
          {
            id: 'p_1day',
            duration_label: '1 Day',
            days: 1,
            price_per_day: 2500,
            discount_percent: 0,
            total: 2500,
            savings: 0,
            is_popular: false,
            selected: false,
          },
          {
            id: 'p_1week',
            duration_label: '1 Week',
            days: 7,
            price_per_day: 2200,
            discount_percent: 12,
            total: 15400,
            savings: 1400,
            is_popular: true,
            selected: true,
          },
        ],
        sidebar_display_price: {
          amount: 3,
          currency: 'EGP',
          period_label: 'Daily',
          note: 'small-card sidebar',
        },
        monthly_offer: {
          amount: 15400,
          currency: 'EGP',
          period: 'week',
        },
        free_cancellation_hours: 24,
      },
      availability: {
        summary: {
          available_count: 2,
        },
        next_available_date: '2025-06-20',
        days_until_next_available: -175,
        current_period: {
          from: '2025-06-20',
          to: '2025-09-30',
          remaining_days: 30,
          price_per_month: 15400,
          status: 'available',
        },
        legend: {
          available: 'green',
          occupied: 'red',
          pending: 'yellow',
        },
      },
      smart_analysis: {
        fair_price_below_market_percent: 5,
        location_rating_out_of_10: 10,
        highlights: ['Excellent Location'],
      },
      location_details: {
        map_provider: 'leafletjs',
        latitude: 31.3456,
        longitude: 28.789,
        nearby_places: [
          {
            name: 'Marina Beach',
            type: 'Beach',
            distance_km: 0.5,
          },
        ],
      },
      owner: {
        name: 'Yasser Hassan',
        role: 'Owner',
        verified: true,
        properties_listed: 5,
        response_rate_percent: 98,
        contact_options: {
          show_number: true,
          contact_form: true,
        },
      },
      safety_tips: [
        "Don't pay before viewing",
        'Verify official documents',
        'Use secure payment methods',
      ],
      meta: {
        created_at: '2025-03-01T00:00:00Z',
        updated_at: '2025-06-01T12:00:00Z',
      },
    },
  ];
  ngOnInit(): void {
    this.applyFiltersAndSort();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onSortChange(value: string): void {
    this.sortOption = value as any;
    this.applyFiltersAndSort();
  }

  clearFilters(): void {
    this.filters = {
      type: '',
      minBedrooms: null,
      minBathrooms: null,
      managed: false,
      verified: false,
      priceMin: null,
      priceMax: null,
      areaMin: null,
      areaMax: null,
    };
    this.applyFiltersAndSort();
  }

  private parseArea(area: string): number {
    const m = area.match(/\d+/g);
    return m ? parseInt(m.join(''), 10) : 0;
  }

  applyFiltersAndSort(): void {
    const filtered = this.properties.filter((p) => {
      if (this.filters.type && !p.type.includes(this.filters.type)) return false;
      if (this.filters.minBedrooms != null && p.bedrooms < this.filters.minBedrooms) return false;
      if (this.filters.minBathrooms != null && p.bathrooms < this.filters.minBathrooms)
        return false;
      if (this.filters.managed && !p.isManaged) return false;
      if (this.filters.verified && !p.isVerified) return false;
      if (this.filters.priceMin != null && p.price < this.filters.priceMin) return false;
      if (this.filters.priceMax != null && p.price > this.filters.priceMax) return false;
      const areaNum = this.parseArea(p.area);
      if (this.filters.areaMin != null && areaNum < this.filters.areaMin) return false;
      if (this.filters.areaMax != null && areaNum > this.filters.areaMax) return false;
      return true;
    });

    const sorted = filtered.sort((a, b) => {
      if (this.sortOption === 'price-low') return a.price - b.price;
      if (this.sortOption === 'price-high') return b.price - a.price;
      if (this.sortOption === 'newest') return b.id - a.id;
      if (this.sortOption === 'area') return this.parseArea(b.area) - this.parseArea(a.area);
      const aScore = (a.isVerified ? 2 : 0) + (a.isManaged ? 1 : 0) + (a.rating || 0);
      const bScore = (b.isVerified ? 2 : 0) + (b.isManaged ? 1 : 0) + (b.rating || 0);
      if (bScore !== aScore) return bScore - aScore;
      return a.price - b.price;
    });

    this.displayedProperties = sorted;
  }

  onPropertyClick(property: FullPropertyData): void {
    const id = property.slug || String(property.id);
    this.router.navigate(['/buy', id], {
      state: { property },
    });
  }
}
