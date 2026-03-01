import { Component, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { PlanType, Billing, PlanCard, FAQ } from './models/plan.model';
import { PaymentService } from './services/payment.service';
import { Pay } from './components/pay/pay';
import { PlansApiService, Plan } from './services/plans-api.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, Pay],
  templateUrl: './plans.html',
  styleUrl: './plans.scss',
})
export class Plans implements OnInit, OnDestroy {
  // UI state
  activeType = signal<PlanType>('owner');
  billing = signal<Billing>('monthly');
  showPaymentModal = signal<boolean>(false);

  // API data
  private apiPlans = signal<Plan[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Subscription
  private languageSubscription?: Subscription;

  faqs: FAQ[] = [
    { q: 'Can I change my plan?', a: 'Yes, you can upgrade or downgrade at any time.' },
    { q: 'Are there additional fees?', a: 'No, all features are included in the price.' },
    { q: 'Is there a free trial?', a: 'Yes, we offer a 14-day free trial.' },
    { q: 'How do I pay?', a: 'We accept all electronic payment methods.' },
  ];

  plans = computed(() => {
    const apiPlansData = this.apiPlans();
    if (apiPlansData.length > 0) {
      return this.mapApiPlansToCards(apiPlansData);
    }
    return [];
  });

  isYearly = computed(() => this.billing() === 'yearly');

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private plansApiService: PlansApiService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    // Check if type is specified in query params
    this.route.queryParams.subscribe((params) => {
      const type = params['type'];
      if (type && (type === 'owner' || type === 'broker' || type === 'developer')) {
        this.activeType.set(type as PlanType);
      }
    });

    // Load plans from API
    this.loadPlans();

    // Subscribe to language changes and reload data
    this.languageSubscription = this.languageService.currentLanguage$
      .pipe(skip(1))
      .subscribe(() => {
        console.log('Language changed, reloading plans...');
        this.loadPlans();
      });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private loadPlans() {
    this.isLoading.set(true);
    this.error.set(null);

    this.plansApiService.getAllPlans().subscribe({
      next: (response) => {
        this.apiPlans.set(response.plans);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading plans:', err);
        this.error.set('Failed to load plans. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }

  private mapApiPlansToCards(apiPlans: Plan[]): PlanCard[] {
    const currentType = this.activeType();
    const categoryMap: Record<PlanType, string> = {
      owner: 'owners',
      broker: 'brokers',
      developer: 'developers',
    };

    const filteredPlans = apiPlans.filter(
      (plan) => plan.category === categoryMap[currentType] && plan.isActive,
    );

    return filteredPlans.map((plan) => ({
      id: plan._id,
      title: plan.title,
      icon: (plan.isPopular ? 'zap' : 'star') as 'star' | 'zap' | 'crown',
      priceMonthly: plan.basePrice,
      priceYearly: plan.yearlyPrice,
      currency: 'EGP',
      periodLabelMonthly: '/month',
      periodLabelYearly: '/year',
      isPopular: plan.isPopular,
      features: plan.features.map((f) => ({
        label: `${f.name}${f.value > 0 ? ': ' + f.value : ''}`,
        included: f.isEnabled,
      })),
    }));
  }

  setType(type: PlanType) {
    this.activeType.set(type);
    // Reload plans when type changes to filter by category
    if (this.apiPlans().length > 0) {
      // Trigger recomputation by updating signal
      this.apiPlans.set([...this.apiPlans()]);
    }
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
