export interface Property {
  id: number;
  slug: string;
  type: string;
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  price: number;
  priceType: 'monthly' | 'daily' | 'sale';
  image: string;
  isManaged: boolean;
  isVerified: boolean;
  rating?: number;
  reviews?: number;
  description: string;
  locationDetails: {
    area: string;
    latitude: number;
    longitude: number;
  };
  images: {
    hero: string;
    gallery: string[];
  };
  badges: {
    managed: boolean;
    verified: boolean;
  };
  stats: {
    bedrooms: number;
    bathrooms: number;
    area_sqm: number;
    rating: number;
    review_count: number;
  };
  details: {
    floor: number;
    furnished: boolean;
    year_built: number;
  };
  amenities: string[];
  pricing: {
    currency: string;
    pricing_table: {
      id: string;
      duration_label: string;
      days: number;
      price_per_day: number;
      discount_percent: number;
      total: number;
      savings: number;
      is_popular: boolean;
      selected: boolean;
    }[];
    sidebar_display_price: {
      amount: number;
      currency: string;
      period_label: string;
      note: string;
    };
    monthly_offer: {
      amount: number;
      currency: string;
      period: string;
    };
    free_cancellation_hours: number;
  };
  availability: {
    summary: {
      available_count: number;
    };
    next_available_date: string;
    days_until_next_available: number;
    current_period: {
      from: string;
      to: string;
      remaining_days: number;
      price_per_month: number;
      status: string;
    };
    legend: {
      available: string;
      occupied: string;
      pending: string;
    };
  };
  smart_analysis: {
    fair_price_below_market_percent: number;
    location_rating_out_of_10: number;
    highlights: string[];
  };
  location_details: {
    map_provider: string;
    latitude: number;
    longitude: number;
    nearby_places: {
      name: string;
      type: string;
      distance_km: number;
    }[];
  };
  owner: {
    name: string;
    role: string;
    verified: boolean;
    properties_listed: number;
    response_rate_percent: number;
    contact_options: {
      show_number: boolean;
      contact_form: boolean;
    };
  };
  safety_tips: string[];
  meta: {
    created_at: string;
    updated_at: string;
  };
}

export interface FullPropertyData extends Property {
  // FullPropertyData is the same as Property in this implementation
  // This alias is maintained for backward compatibility
}
