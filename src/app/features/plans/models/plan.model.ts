export type PlanType = 'owner' | 'broker' | 'developer';
export type Billing = 'monthly' | 'yearly';

export interface Feature {
  label: string;
  included: boolean;
}

export interface PlanCard {
  id: string;
  title: string;
  icon: 'star' | 'zap' | 'crown';
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  periodLabelMonthly: string;
  periodLabelYearly: string;
  isPopular?: boolean;
  features: Feature[];
}

export interface FAQ {
  q: string;
  a: string;
}
