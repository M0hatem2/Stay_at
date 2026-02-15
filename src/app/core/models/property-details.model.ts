export interface PropertyDetails {
  id: string | null;
  title: string;
  verified: boolean;
  views: number;
  main_image: string;
  gallery: string[];
  location: {
    full: string;
    area: string;
    city: string;
  };
  specs: {
    property_type: string;
    bedrooms: number;
    bathrooms: number;
    area_sqm: number;
    floor: string;
    ownership: string;
    finishing: string;
    year_built: number;
    compound: string;
    delivery: string;
  };
  price: {
    display: string;
    per_sqm: string;
  };
  description: string;
  features: string[];
  compound_features: string[];
  payment_plans: {
    name: string;
    tag?: string;
    discount?: string;
    down_payment: string;
    monthly?: string;
    final_price: string;
    note: string;
    selected?: boolean;
    duration_months?: number;
  }[];
  selected_plan_summary: {
    name: string;
    down_payment: string;
    duration: string;
    monthly_installment: string;
    discount: string;
  };
  price_investment_analysis: {
    price_per_sqm: string;
    comparison_to_area_average: string;
    expected_rental_yield: string;
    expected_rental_annual_return: string;
    expected_appreciation: string;
    payback_period_years: number;
  };
  documents: {
    name: string;
    status: string;
  }[];
  taxes_and_fees: {
    items: {
      name: string;
      amount: string;
      note: string;
    }[];
    total: string;
  };
  nearby_places: {
    name: string;
    type: string;
    distance_km: number;
    travel_time: string;
  }[];
  similar_properties: {
    title: string;
    image: string;
    price: string;
    price_per_sqm: string;
    bedrooms: number;
    bathrooms: number;
    area_sqm: number;
  }[];
  sidebar: {
    payment_plan_label: string;
    price_display: string;
    per_sqm: string;
    down_payment: string;
    monthly: string;
    duration: string;
    actions: string[];
  };
  agent: {
    name: string;
    verified: boolean;
    title: string;
    rating: number;
    reviews_count: number;
    sold_count: number;
    listed_count: number;
    response_rate: string;
    response_time: string;
  };
  ai_insights: {
    title: string;
    detail: string;
  }[];
  meta: {
    source: string;
    extracted_at: string;
  };
}

export const MOCK_PROPERTY_DATA: PropertyDetails = {
  id: null,
  title: 'Apartment for Sale 200sqm in Moon Valley Compound - Fifth Settlement',
  verified: true,
  views: 1247,
  main_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
  ],
  location: {
    full: 'Fifth Settlement, New Cairo',
    area: 'Fifth Settlement',
    city: 'New Cairo',
  },
  specs: {
    property_type: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area_sqm: 200,
    floor: '8/15',
    ownership: 'Freehold',
    finishing: 'Super Lux',
    year_built: 2022,
    compound: 'Moon Valley',
    delivery: 'Ready to Move - Immediate',
  },
  price: {
    display: '3 EGP',
    per_sqm: '17 EGP/sqm',
  },
  description:
    'Luxury apartment for sale in one of the finest compounds in Fifth Settlement "Moon Valley". Features super lux finishing, panoramic view of green spaces and artificial lakes, modern design and spacious areas ideal for families. The compound is fully gated and surrounded by all services and recreational facilities offering an upscale integrated life. Strategic location close to AUC, Cairo Festival, and Ring Road. Excellent investment opportunity with comfortable installment plan up to 7 years interest-free.',
  features: [
    'Panoramic Garden View',
    'Super Lux Finishing',
    'Private Elevator',
    '2 Spacious Balconies',
    'Smart Home System',
    'Central AC',
    'Italian Equipped Kitchen',
    'Marble Flooring',
    'Luxury Finished Bathrooms',
    'Maid Room',
    'Separate Laundry Room',
    'Soundproof Windows',
  ],
  compound_features: [
    'Olympic Swimming Pools',
    '1000sqm Sports Club',
    'Lit Tennis Courts',
    'Football Field',
    'Kids Play Areas',
    'Cafes & Restaurants',
    'Spa & Jacuzzi',
    '3km Jogging Track',
    'Artificial Lakes',
    'BBQ Area',
    'Strict Security',
    'CCTV Cameras',
    'Electronic Gates',
    'Power Generators',
    'Fire System',
  ],
  payment_plans: [
    {
      name: 'Cash - Instant Discount',
      tag: 'Best Deal',
      discount: '10%',
      down_payment: '100%',
      final_price: '3 EGP',
      note: '10% discount (EGP 350,000) on total price for immediate payment',
    },
    {
      name: '5 Years Installment',
      discount: '5%',
      down_payment: '20%',
      monthly: '44,000',
      final_price: '3 EGP',
      note: 'EGP 700,000 down payment (20%), rest EGP 2,625,000 over 60 months',
    },
    {
      name: '7 Years Installment',
      selected: true,
      down_payment: '15%',
      monthly: '35,000',
      duration_months: 84,
      final_price: '3 EGP',
      note: 'EGP 525,000 down payment (15%), rest EGP 2,975,000 over 84 months',
    },
  ],
  selected_plan_summary: {
    name: '7 Years Installment',
    down_payment: '15%',
    duration: '7 years',
    monthly_installment: '35,000',
    discount: '0%',
  },
  price_investment_analysis: {
    price_per_sqm: '17 EGP/sqm',
    comparison_to_area_average: '-7.9% below area average',
    expected_rental_yield: '6.8%',
    expected_rental_annual_return: '238 EGP',
    expected_appreciation: '12%',
    payback_period_years: 14.7,
  },
  documents: [
    { name: 'Preliminary Sales Contract', status: 'Available' },
    { name: 'Building Permit', status: 'Certified' },
    { name: 'Completion Certificate', status: 'Certified' },
    { name: 'Approved Layout', status: 'Available' },
    { name: 'Title Deed', status: 'Ready to Transfer' },
  ],
  taxes_and_fees: {
    items: [
      { name: 'Registration Tax', amount: '52 EGP', note: 'Of property value' },
      { name: 'Real Estate Registry', amount: '3 EGP', note: 'Fixed fees' },
      { name: 'Admin Fees', amount: '7 EGP', note: 'Documentation & procedures' },
      { name: 'Annual Maintenance (Est.)', amount: '12 EGP', note: 'Compound yearly fees' },
    ],
    total: '74 EGP',
  },
  nearby_places: [
    { name: 'Cairo Festival City', type: 'Mall', distance_km: 2, travel_time: '5 min' },
    { name: 'American University', type: 'University', distance_km: 3.5, travel_time: '8 min' },
    {
      name: 'El Salam International Hospital',
      type: 'Hospital',
      distance_km: 1.5,
      travel_time: '4 min',
    },
    {
      name: 'Carrefour Fifth Settlement',
      type: 'Supermarket',
      distance_km: 1,
      travel_time: '3 min',
    },
    {
      name: 'Choueifat International School',
      type: 'School',
      distance_km: 2.5,
      travel_time: '6 min',
    },
  ],
  similar_properties: [
    {
      title: '180sqm Apartment Same Compound',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      price: '3 EGP',
      price_per_sqm: '17 EGP/sqm',
      bedrooms: 3,
      bathrooms: 2,
      area_sqm: 180,
    },
    {
      title: '220sqm Apartment - Higher Floor',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      price: '4 EGP',
      price_per_sqm: '18 EGP/sqm',
      bedrooms: 4,
      bathrooms: 3,
      area_sqm: 220,
    },
    {
      title: '250sqm Duplex with Garden',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      price: '4 EGP',
      price_per_sqm: '19 EGP/sqm',
      bedrooms: 4,
      bathrooms: 4,
      area_sqm: 250,
    },
  ],
  sidebar: {
    payment_plan_label: '7 Years Installment',
    price_display: '3 EGP',
    per_sqm: '17 EGP',
    down_payment: '15%',
    monthly: '35,000',
    duration: '7 years',
    actions: ['Change Plan', 'Make an Offer', 'Schedule Viewing'],
  },
  agent: {
    name: 'Ahmed Mohamed',
    verified: true,
    title: 'Certified Broker',
    rating: 4.9,
    reviews_count: 156,
    sold_count: 167,
    listed_count: 45,
    response_rate: '98%',
    response_time: 'Within 1 hour',
  },
  ai_insights: [
    { title: 'Great Price', detail: 'Price is 7.9% below area average' },
    { title: 'Strong Investment', detail: 'Expected rental yield 6.8% annually' },
    { title: 'Prime Location', detail: 'Close to all essential services' },
  ],
  meta: {
    source: 'extracted_from_html',
    extracted_at: '2025-12-14T00:00:00Z',
  },
};
