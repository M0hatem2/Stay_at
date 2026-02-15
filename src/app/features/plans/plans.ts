import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlanType, Billing, PlanCard, FAQ } from './models/plan.model';
import { PaymentService } from './services/payment.service';
import { Pay } from './components/pay/pay';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, Pay],
  templateUrl: './plans.html',
  styleUrl: './plans.scss',
})
export class Plans implements OnInit {
  // UI state
  activeType = signal<PlanType>('owner');
  billing = signal<Billing>('monthly');
  showPaymentModal = signal<boolean>(false);

  // Demo data
  private data: Record<PlanType, PlanCard[]> = {
    owner: [
      {
        id: 'starter',
        title: 'Owner Starter',
        icon: 'star',
        priceMonthly: 499,
        priceYearly: 4990,
        currency: 'EGP',
        periodLabelMonthly: '/month',
        periodLabelYearly: '/year',
        features: [
          { label: '5 Listings', included: true },
          { label: 'Basic Analytics', included: true },
          { label: 'Viewing Requests', included: true },
          { label: 'AI Description Writing', included: true },
          { label: 'Smart Price Analysis', included: false },
          { label: 'Custom Branding', included: false },
        ],
      },
      {
        id: 'growth',
        title: 'Owner Growth',
        icon: 'zap',
        priceMonthly: 999,
        priceYearly: 9990,
        currency: 'EGP',
        periodLabelMonthly: '/month',
        periodLabelYearly: '/year',
        isPopular: true,
        features: [
          { label: '25 Listings', included: true },
          { label: 'Advanced Analytics', included: true },
          { label: 'Priority Support', included: true },
          { label: 'AI Description Writing', included: true },
          { label: 'Smart Price Analysis', included: true },
          { label: 'Custom Branding', included: false },
        ],
      },
      {
        id: 'premium',
        title: 'Owner Premium',
        icon: 'crown',
        priceMonthly: 1799,
        priceYearly: 17990,
        currency: 'EGP',
        periodLabelMonthly: '/month',
        periodLabelYearly: '/year',
        features: [
          { label: 'Unlimited Listings', included: true },
          { label: 'Advanced Analytics', included: true },
          { label: 'Dedicated Support', included: true },
          { label: 'Smart Price Analysis', included: true },
          { label: 'Custom Branding', included: true },
          { label: 'API Access', included: true },
        ],
      },
    ],
    broker: [
      {
        id: 'starter',
        title: 'Broker Starter',
        icon: 'star',
        priceMonthly: 699,
        priceYearly: 6990,
        currency: 'EGP',
        periodLabelMonthly: '/month',
        periodLabelYearly: '/year',
        features: [
          { label: 'CRM Lite', included: true },
          { label: 'Client Management', included: true },
          { label: 'Deal Tracking', included: true },
          { label: 'Custom Reports', included: false },
          { label: 'Team Seats', included: false },
          { label: 'API Access', included: false },
        ],
      },
      {
        id: 'growth',
        title: 'Broker Growth',
        icon: 'zap',
        priceMonthly: 1299,
        priceYearly: 12990,
        currency: 'EGP',
        periodLabelMonthly: '/month',
        periodLabelYearly: '/year',
        isPopular: true,
        features: [
          { label: 'Full CRM', included: true },
          { label: 'Client Classification', included: true },
          { label: 'Deal Tracking', included: true },
          { label: 'Custom Reports', included: true },
          { label: 'Team Seats', included: true },
          { label: 'API Access', included: false },
        ],
      },
      {
        id: 'premium',
        title: 'Broker Premium',
        icon: 'crown',
        priceMonthly: 2499,
        priceYearly: 24990,
        currency: 'EGP',
        periodLabelMonthly: '/month',
        periodLabelYearly: '/year',
        features: [
          { label: 'Unlimited Deals', included: true },
          { label: 'Advanced Reporting', included: true },
          { label: 'Priority Support', included: true },
          { label: 'Team Seats', included: true },
          { label: 'API Access', included: true },
          { label: 'Dedicated Manager', included: true },
        ],
      },
    ],
    developer: [
      {
        id: 'starter',
        title: 'Starter Plan',
        icon: 'star',
        priceMonthly: 899,
        priceYearly: 8990,
        currency: 'EGP',
        periodLabelMonthly: '/month',
        periodLabelYearly: '/year',
        features: [
          { label: '2 Projects', included: true },
          { label: '50 Units per project', included: true },
          { label: '30 Photos per unit', included: true },
          { label: 'Basic Analytics', included: true },
          { label: 'Standard Support', included: true },
          { label: 'AI Description Writing', included: true },
          { label: 'Smart Price Analysis', included: false },
          { label: 'Virtual Tours', included: false },
          { label: 'Custom Branding', included: false },
          { label: 'Lead Management', included: false },
        ],
      },
      {
        id: 'growth',
        title: 'Growth Plan',
        icon: 'zap',
        priceMonthly: 1899,
        priceYearly: 18990,
        currency: 'EGP',
        periodLabelMonthly: '/month',
        periodLabelYearly: '/year',
        isPopular: true,
        features: [
          { label: '5 Projects', included: true },
          { label: '200 Units per project', included: true },
          { label: 'Unlimited Photos', included: true },
          { label: 'Advanced Analytics', included: true },
          { label: 'Priority Support', included: true },
          { label: 'AI Description Writing', included: true },
          { label: 'Smart Price Analysis', included: true },
          { label: '1 Featured project', included: true },
          { label: 'Virtual Tours', included: true },
          { label: 'Video Support', included: true },
          { label: 'Lead Management', included: true },
          { label: 'Custom Branding', included: false },
          { label: 'API Access', included: false },
        ],
      },
      {
        id: 'premium',
        title: 'Premium Plan',
        icon: 'crown',
        priceMonthly: 3999,
        priceYearly: 39990,
        currency: 'EGP',
        periodLabelMonthly: '/month',
        periodLabelYearly: '/year',
        features: [
          { label: 'Unlimited Projects', included: true },
          { label: 'Unlimited units', included: true },
          { label: 'Unlimited Photos', included: true },
          { label: 'Advanced Analytics', included: true },
          { label: 'Priority Support', included: true },
          { label: 'AI Description Writing', included: true },
          { label: 'Smart Price Analysis', included: true },
          { label: 'All projects featured', included: true },
          { label: 'Virtual Tours', included: true },
          { label: 'Video Support', included: true },
          { label: 'Lead Management', included: true },
          { label: 'Custom Branding', included: true },
          { label: 'API Access', included: true },
          { label: 'Dedicated Account Manager', included: true },
          { label: 'Marketing Tools', included: true },
          { label: 'SEO Optimization', included: true },
        ],
      },
    ],
  };

  faqs: FAQ[] = [
    { q: 'Can I change my plan?', a: 'Yes, you can upgrade or downgrade at any time.' },
    { q: 'Are there additional fees?', a: 'No, all features are included in the price.' },
    { q: 'Is there a free trial?', a: 'Yes, we offer a 14-day free trial.' },
    { q: 'How do I pay?', a: 'We accept all electronic payment methods.' },
  ];

  plans = computed(() => this.data[this.activeType()]);
  isYearly = computed(() => this.billing() === 'yearly');

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // Check if type is specified in query params
    this.route.queryParams.subscribe((params) => {
      const type = params['type'];
      if (type && (type === 'owner' || type === 'broker' || type === 'developer')) {
        this.activeType.set(type as PlanType);
      }
    });
  }

  setType(type: PlanType) {
    this.activeType.set(type);
  }

  toggleBilling() {
    this.billing.set(this.billing() === 'monthly' ? 'yearly' : 'monthly');
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  getPrice(plan: PlanCard): number {
    return this.isYearly() ? plan.priceYearly : plan.priceMonthly;
  }

  getPeriodLabel(plan: PlanCard): string {
    return this.isYearly() ? plan.periodLabelYearly : plan.periodLabelMonthly;
  }

  choosePlan(planId: string) {
    const selectedPlan = this.plans().find((p) => p.id === planId);
    if (selectedPlan) {
      this.paymentService.setPaymentData({
        plan: selectedPlan,
        planType: this.activeType(),
        billing: this.billing(),
      });

      // Open payment modal
      this.showPaymentModal.set(true);
    }
  }

  closePaymentModal() {
    this.showPaymentModal.set(false);
    this.paymentService.clearPaymentData();
  }

  contactSales() {
    console.log('Contact sales clicked');
    // Navigate to contact page or open modal
    // this.router.navigate(['/contact']);
  }
}
