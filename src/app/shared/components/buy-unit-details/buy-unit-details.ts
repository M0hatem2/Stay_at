import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MOCK_PROPERTY_DATA, PropertyDetails } from '../../../core/models/property-details.model';
import { Property } from '../../../core/models/property.model';
import { ApiProperty } from '../../../core/models/api-property.model';
import { PropertyCardData } from '../units-card/units-card';
import { Project } from '../../../core/models/project.model';
import { UnitService } from '../../../features/rent/services/unit.service';
import { Subscription } from 'rxjs';
import { UnitGalleryComponent } from '../unit-gallery';
import {
  PropertyDetailsComponent,
  DescriptionComponent,
  FeaturesComponent,
  CompoundFeaturesComponent,
  PaymentPlansComponent,
  InvestmentAnalysisComponent,
  DocumentsTaxesComponent,
  NearbyPlacesComponent,
  SimilarPropertiesComponent,
  SidebarComponent,
  ImageModalComponent,
} from './components';

type PaymentPlan = PropertyDetails['payment_plans'][number];

@Component({
  selector: 'app-buy-unit-details',
  imports: [
    CommonModule,
    UnitGalleryComponent,
    PropertyDetailsComponent,
    DescriptionComponent,
    FeaturesComponent,
    CompoundFeaturesComponent,
    PaymentPlansComponent,
    InvestmentAnalysisComponent,
    DocumentsTaxesComponent,
    NearbyPlacesComponent,
    SimilarPropertiesComponent,
    SidebarComponent,
    ImageModalComponent,
  ],
  templateUrl: './buy-unit-details.html',
  styleUrl: './buy-unit-details.scss',
})
export class BuyUnitDetails implements OnInit, OnDestroy {
  private readonly fallbackGalleryImage =
    'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=1200&h=800&fit=crop';

  propertyData: PropertyDetails = this.createBasePropertyData();
  unitData: any = null; // البيانات من الـ API
  isLoading = false;
  errorMessage = '';
  analysisSummary = 'Investment summary is not available yet.';
  analysisLastUpdated = '';
  ownerContact: { phoneNumber: string; email: string } = { phoneNumber: '', email: '' };

  // Image Gallery Properties
  selectedImageIndex: number = 0;
  isImageModalOpen: boolean = false;

  private routeSubscription: Subscription | undefined;
  private unitService = inject(UnitService);

  constructor(
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // الحصول على ID من الـ route
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadUnitDetails(id);
      } else {
        // Fallback to old navigation state method
        this.loadFromNavigationState();
      }
    });
  }

  private loadUnitDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.unitService.getUnitByIdForSale(id).subscribe({
      next: (response: any) => {
        console.log('🏠 Buy Unit Details Response:', response);
        const unitPayload = this.extractUnitPayload(response);
        this.unitData = unitPayload;
        this.mapApiDataToPropertyData(unitPayload, response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading unit details:', error);
        this.errorMessage = 'Failed to load unit details';
        this.isLoading = false;
        // Fallback to navigation state if API fails
        this.loadFromNavigationState();
      },
    });
  }

  private loadFromNavigationState(): void {
    const navigation = this.router.getCurrentNavigation();
    const navState = navigation?.extras.state as
      | { property?: PropertyCardData | Project }
      | undefined;

    if (navState?.property) {
      this.applyPropertyOverrides(navState.property);
      return;
    }

    if (typeof window !== 'undefined') {
      const histState = (window.history?.state as { property?: PropertyCardData | Project }) || {};
      if (histState?.property) {
        this.applyPropertyOverrides(histState.property);
      }
    }
  }

  private mapApiDataToPropertyData(data: any, rawResponse?: any): void {
    const pd = this.createBasePropertyData();
    const unit = data || {};
    const response = rawResponse || {};
    const currency = this.normalizeCurrency(unit?.salePricing?.currency);
    const ownerPayload =
      unit?.owner ||
      response?.owner ||
      response?.data?.owner ||
      response?.result?.owner ||
      response?.unit?.owner ||
      response?.property?.owner;

    this.analysisSummary = 'Investment summary is not available yet.';
    this.analysisLastUpdated = '';
    this.ownerContact = { phoneNumber: '', email: '' };

    pd.id = unit?._id || unit?.id || null;
    pd.title = this.safeText(unit?.title, pd.title);
    pd.description = this.safeText(unit?.description, pd.description);
    pd.verified = !!unit?.isTrusted;
    pd.views = this.asNumber(unit?.viewsCount) ?? 0;

    const gallery = this.mapGalleryUrls(unit?.gallery);
    if (gallery.length) {
      pd.gallery = gallery;
      pd.main_image = gallery[0];
    }

    const area = this.safeText(unit?.location?.area, '');
    const city = this.safeText(unit?.location?.city, '');
    const address = this.safeText(unit?.location?.address, '');
    const fullLocation = [area, city].filter(Boolean).join(', ');
    pd.location = {
      full: fullLocation || address || 'Location not specified',
      area,
      city,
    };

    pd.specs.property_type = this.toTitleCase(this.safeText(unit?.unitType, 'N/A'));
    pd.specs.bedrooms = this.asNumber(unit?.bedrooms) ?? 0;
    pd.specs.bathrooms = this.asNumber(unit?.bathrooms) ?? 0;
    pd.specs.area_sqm = this.asNumber(unit?.unitArea) ?? 0;
    pd.specs.floor = unit?.floorNumber != null ? String(unit.floorNumber) : 'N/A';
    pd.specs.finishing =
      typeof unit?.furnished === 'boolean' ? (unit.furnished ? 'Furnished' : 'Unfurnished') : 'N/A';
    pd.specs.ownership = this.formatOwnerType(unit?.ownerType);
    pd.specs.compound = this.safeText(unit?.project?.name, 'N/A');

    const deliveryYear = this.parseYear(unit?.project?.expectedDeliveryDate);
    pd.specs.delivery = deliveryYear ? String(deliveryYear) : 'N/A';
    pd.specs.year_built = this.parseYear(unit?.project?.startDate) || 0;

    const basePrice = this.asNumber(unit?.salePricing?.basePrice);
    if (basePrice && basePrice > 0) {
      pd.price.display = this.formatCurrency(basePrice, currency);
      pd.sidebar.price_display = pd.price.display;
    }

    const pricePerMeter = this.asNumber(unit?.salePricing?.pricePerMeter);
    if (pricePerMeter && pricePerMeter > 0) {
      pd.price.per_sqm = `${pricePerMeter.toLocaleString()} ${currency}/sqm`;
      pd.sidebar.per_sqm = `${pricePerMeter.toLocaleString()} ${currency}`;
    }

    if (basePrice && basePrice > 0 && Array.isArray(unit?.salePricing?.plans)) {
      pd.payment_plans = unit.salePricing.plans.map((plan: any, index: number) => {
        const isCash = String(plan?.saleType || '').toLowerCase() === 'cash';
        const downPaymentPercent =
          typeof plan?.downPaymentPercent === 'number'
            ? plan.downPaymentPercent
            : isCash
              ? 100
              : 0;
        const years = Number(plan?.years || 0);
        const downPaymentAmount = Math.round((basePrice * downPaymentPercent) / 100);
        const financedAmount = Math.max(basePrice - downPaymentAmount, 0);
        const durationMonths = years > 0 ? Math.round(years * 12) : 0;
        const monthlyInstallment =
          !isCash && years > 0
            ? this.calculateMonthlyPayment(basePrice, downPaymentPercent, years, plan?.interestRate || 0)
            : undefined;
        const finalPriceValue =
          this.asNumber(plan?.finalPrice) ?? this.asNumber(plan?.totalPrice) ?? basePrice;

        return {
          name: this.safeText(plan?.name_ar || plan?.name_en, `Plan ${index + 1}`),
          tag: index === 0 ? 'Best Deal' : undefined,
          discount:
            typeof plan?.discountPercent === 'number' ? `${plan.discountPercent.toFixed(0)}%` : undefined,
          down_payment: `${downPaymentPercent}%`,
          monthly: monthlyInstallment,
          final_price: this.formatCurrency(finalPriceValue, currency),
          note: isCash
            ? 'Immediate payment with full amount.'
            : `${downPaymentAmount.toLocaleString()} ${currency} down payment, then ${financedAmount.toLocaleString()} ${currency} over ${durationMonths} months`,
          duration_months: durationMonths || undefined,
          selected: index === 0,
        };
      });
    }

    const selectedPlan = pd.payment_plans.find((plan) => plan.selected) || pd.payment_plans[0];
    if (selectedPlan) {
      const summary = this.buildSelectedPlanSummary(selectedPlan);
      pd.selected_plan_summary = summary;
      pd.sidebar = {
        ...pd.sidebar,
        payment_plan_label: summary.name,
        down_payment: summary.down_payment,
        monthly: summary.monthly_installment,
        duration: summary.duration,
      };
    }

    pd.features = this.normalizeTextList(unit?.facilitiesAndServices);
    pd.compound_features = this.normalizeTextList(unit?.project?.featuresAndServices);

    if (Array.isArray(unit?.nearbyLandmarks)) {
      pd.nearby_places = unit.nearbyLandmarks.map((landmark: any) => ({
        name: this.safeText(landmark?.name, 'Nearby place'),
        type: this.safeText(landmark?.type, 'Landmark'),
        distance_km: this.parseDistanceKm(landmark?.distance),
        travel_time: this.safeText(landmark?.travel_time, 'N/A'),
      }));
    }

    const investment = unit?.saleAnalysis?.investmentAnalysis || {};
    const priceAnalysis = unit?.saleAnalysis?.priceAnalysis || {};
    pd.price_investment_analysis = {
      price_per_sqm:
        pricePerMeter && pricePerMeter > 0 ? `${pricePerMeter.toLocaleString()} ${currency}/sqm` : 'N/A',
      comparison_to_area_average: this.safeText(
        priceAnalysis?.status,
        'Market comparison is not available yet.',
      ),
      expected_rental_yield: this.formatPercentage(investment?.rentalYield),
      expected_rental_annual_return: this.formatCurrency(investment?.annualRentIncome, currency, 'N/A'),
      expected_appreciation: this.formatPercentage(investment?.appreciationRate),
      payback_period_years: this.asNumber(investment?.paybackPeriod) ?? 0,
    };

    this.analysisSummary = this.safeText(unit?.saleAnalysis?.summary, this.analysisSummary);
    this.analysisLastUpdated = this.safeText(unit?.saleAnalysis?.lastUpdated, '');

    if (Array.isArray(unit?.saleAnalysis?.smartInsights) && unit.saleAnalysis.smartInsights.length) {
      pd.ai_insights = unit.saleAnalysis.smartInsights.map((insight: string) => ({
        title: 'Smart Insight',
        detail: this.safeText(insight, 'Insight not available'),
      }));
    }

    if (Array.isArray(unit?.documents)) {
      pd.documents = unit.documents.map((doc: any, index: number) => ({
        name: this.buildDocumentName(doc, index),
        status: this.toTitleCase(this.safeText(doc?.format, 'Available')),
      }));
    }

    if (Array.isArray(unit?.taxesAndFees?.items)) {
      pd.taxes_and_fees.items = unit.taxesAndFees.items.map((item: any) => ({
        name: this.safeText(item?.name, 'Fee'),
        amount: this.safeText(item?.amount, 'N/A'),
        note: this.safeText(item?.note, 'Details not available'),
      }));
      pd.taxes_and_fees.total = this.safeText(unit?.taxesAndFees?.total, 'N/A');
    }

    if (Array.isArray(unit?.similarProperties)) {
      pd.similar_properties = unit.similarProperties.map((property: any) => ({
        title: this.safeText(property?.title, 'Similar property'),
        image: this.safeText(property?.image, ''),
        price: this.safeText(property?.price, 'N/A'),
        price_per_sqm: this.safeText(property?.price_per_sqm, 'N/A'),
        bedrooms: this.asNumber(property?.bedrooms) ?? 0,
        bathrooms: this.asNumber(property?.bathrooms) ?? 0,
        area_sqm: this.asNumber(property?.area_sqm) ?? 0,
      }));
    }

    if (ownerPayload) {
      pd.agent = {
        name: this.safeText(ownerPayload?.name, 'Owner not specified'),
        verified: true,
        title: this.toTitleCase(this.safeText(ownerPayload?.role, 'Property Owner')),
        rating: this.asNumber(unit?.averageRating) ?? 0,
        reviews_count: this.asNumber(unit?.totalReviews) ?? 0,
        sold_count: this.asNumber(ownerPayload?.stats?.soldCount) ?? 0,
        listed_count: this.asNumber(ownerPayload?.stats?.listedCount) ?? 0,
        response_rate: 'N/A',
        response_time: 'N/A',
      };

      this.ownerContact = {
        phoneNumber: this.safeText(ownerPayload?.contact?.phoneNumber, ''),
        email: this.safeText(ownerPayload?.contact?.email, ''),
      };
    }

    this.propertyData = pd;
  }

  private extractUnitPayload(response: any): any {
    const candidates = [
      response?.unit,
      response?.property,
      response?.data?.unit,
      response?.data?.property,
      response?.result?.unit,
      response?.result?.property,
      response?.data,
      response?.result,
      response,
    ];

    const matched = candidates.find((candidate) => this.isUnitLike(candidate));
    if (matched) return matched;

    return candidates.find((candidate) => !!candidate) || {};
  }

  private isUnitLike(value: any): boolean {
    if (!value || typeof value !== 'object') return false;
    return (
      '_id' in value ||
      'title' in value ||
      'location' in value ||
      'salePricing' in value ||
      'unitType' in value
    );
  }

  private calculateMonthlyPayment(
    totalPrice: number,
    downPaymentPercent: number,
    years: number,
    interestRate: number,
  ): string {
    if (years === 0) return '0 EGP';

    const downPayment = (totalPrice * downPaymentPercent) / 100;
    const loanAmount = totalPrice - downPayment;
    const months = years * 12;

    if (interestRate === 0) {
      return `${Math.round(loanAmount / months).toLocaleString()} EGP`;
    }

    const monthlyRate = interestRate / 12;
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return `${Math.round(monthlyPayment).toLocaleString()} EGP`;
  }

  private createBasePropertyData(): PropertyDetails {
    const base = this.cloneMock();
    return {
      ...base,
      id: null,
      title: 'Unit Details',
      verified: false,
      views: 0,
      main_image: '',
      gallery: [],
      location: {
        full: 'Location not specified',
        area: '',
        city: '',
      },
      specs: {
        ...base.specs,
        property_type: 'N/A',
        bedrooms: 0,
        bathrooms: 0,
        area_sqm: 0,
        floor: 'N/A',
        ownership: 'N/A',
        finishing: 'N/A',
        year_built: 0,
        compound: 'N/A',
        delivery: 'N/A',
      },
      price: {
        display: 'N/A',
        per_sqm: 'N/A',
      },
      description: 'Description is not available yet.',
      features: [],
      compound_features: [],
      payment_plans: [],
      selected_plan_summary: {
        name: 'Not selected yet',
        down_payment: '-',
        duration: '-',
        monthly_installment: '-',
        discount: '-',
      },
      price_investment_analysis: {
        price_per_sqm: 'N/A',
        comparison_to_area_average: 'Market comparison is not available yet.',
        expected_rental_yield: 'N/A',
        expected_rental_annual_return: 'N/A',
        expected_appreciation: 'N/A',
        payback_period_years: 0,
      },
      documents: [],
      taxes_and_fees: {
        items: [],
        total: 'N/A',
      },
      nearby_places: [],
      similar_properties: [],
      sidebar: {
        ...base.sidebar,
        payment_plan_label: 'Not selected yet',
        price_display: 'N/A',
        per_sqm: 'N/A',
        down_payment: '-',
        monthly: '-',
        duration: '-',
      },
      agent: {
        ...base.agent,
        name: 'Owner not specified',
        verified: false,
        title: 'Property Owner',
        rating: 0,
        reviews_count: 0,
        sold_count: 0,
        listed_count: 0,
        response_rate: 'N/A',
        response_time: 'N/A',
      },
      ai_insights: [],
      meta: {
        ...base.meta,
        source: 'api',
        extracted_at: new Date().toISOString(),
      },
    };
  }

  private safeText(value: unknown, fallback: string): string {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    return text ? text : fallback;
  }

  private asNumber(value: unknown): number | null {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
      const normalized = value.replace(/[^\d.-]/g, '');
      if (!normalized) return null;
      const parsed = Number(normalized);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  }

  private normalizeCurrency(value: unknown): string {
    const currency = this.safeText(value, 'EGP').toUpperCase();
    return /^[A-Z]{3}$/.test(currency) ? currency : 'EGP';
  }

  private formatCurrency(value: unknown, currency: string, fallback: string = 'N/A'): string {
    const amount = this.asNumber(value);
    if (amount === null) return fallback;
    return `${amount.toLocaleString()} ${currency}`;
  }

  private formatPercentage(value: unknown, fallback: string = 'N/A'): string {
    const percentage = this.asNumber(value);
    if (percentage === null) return fallback;
    return `${percentage}%`;
  }

  private parseYear(value: unknown): number | null {
    if (!value) return null;
    const date = new Date(String(value));
    const year = date.getFullYear();
    return Number.isFinite(year) ? year : null;
  }

  private formatOwnerType(value: unknown): string {
    return this.toTitleCase(this.safeText(value, 'N/A'));
  }

  private toTitleCase(value: string): string {
    if (!value) return 'N/A';
    return value
      .replace(/[_-]+/g, ' ')
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private normalizeTextList(list: unknown): string[] {
    if (!Array.isArray(list)) return [];
    return list
      .map((item) => this.safeText(item, ''))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  private mapGalleryUrls(gallery: unknown): string[] {
    if (!Array.isArray(gallery)) return [];
    return gallery
      .map((image: any) => this.safeText(image?.secure_url, ''))
      .map((url) => url.trim())
      .filter(Boolean);
  }

  private parseDistanceKm(value: unknown): number {
    if (typeof value === 'number' && Number.isFinite(value) && value >= 0) return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value.replace(/[^\d.]/g, ''));
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return 0;
  }

  private buildDocumentName(doc: any, index: number): string {
    const originalFilename = this.safeText(doc?.original_filename, '');
    if (originalFilename && originalFilename.toLowerCase() !== 'file') {
      return originalFilename;
    }

    const extension = this.safeText(doc?.format, '').toUpperCase();
    return extension ? `Document ${index + 1} (${extension})` : `Document ${index + 1}`;
  }

  ngOnDestroy(): void {
    if (this.isImageModalOpen) {
      document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
    this.routeSubscription?.unsubscribe();
  }

  get galleryImages(): string[] {
    const gallery = this.propertyData.gallery?.filter(Boolean) || [];
    if (gallery.length) return gallery;
    if (this.propertyData.main_image) return [this.propertyData.main_image];
    return [this.fallbackGalleryImage];
  }

  get heroImage(): string {
    return this.propertyData.main_image || this.galleryImages[0] || this.fallbackGalleryImage;
  }

  get agentInitial(): string {
    return this.propertyData.agent?.name?.trim()?.charAt(0)?.toUpperCase() || 'A';
  }

  get selectedPlan() {
    return this.propertyData.payment_plans.find((plan) => plan.selected) || null;
  }

  onPaymentPlanSelected(plan: PaymentPlan): void {
    this.propertyData.payment_plans = this.propertyData.payment_plans.map((currentPlan) => ({
      ...currentPlan,
      selected: currentPlan.name === plan.name,
    }));

    const summary = this.buildSelectedPlanSummary(plan);
    this.propertyData.selected_plan_summary = summary;
    this.propertyData.sidebar = {
      ...this.propertyData.sidebar,
      payment_plan_label: summary.name,
      down_payment: summary.down_payment,
      monthly: summary.monthly_installment,
      duration: summary.duration,
    };
  }

  scrollToPaymentPlans(): void {
    if (typeof document === 'undefined') return;
    document.getElementById('payment-plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  get displayTitle(): string {
    return this.propertyData.title || 'Unit Details';
  }

  get currentImageIndex(): number {
    return this.selectedImageIndex;
  }

  set currentImageIndex(value: number) {
    this.selectedImageIndex = value;
  }

  // Image Gallery Methods

  closeImageModal(): void {
    this.isImageModalOpen = false;
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  previousImage(): void {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    } else {
      this.selectedImageIndex = this.galleryImages.length - 1;
    }
  }

  nextImage(): void {
    if (this.selectedImageIndex < this.galleryImages.length - 1) {
      this.selectedImageIndex++;
    } else {
      this.selectedImageIndex = 0;
    }
  }

  openImageModal(): void {
    this.isImageModalOpen = true;
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (!this.isImageModalOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeImageModal();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }

  private cloneMock(): PropertyDetails {
    return JSON.parse(JSON.stringify(MOCK_PROPERTY_DATA)) as PropertyDetails;
  }

  private buildSelectedPlanSummary(plan: PaymentPlan): PropertyDetails['selected_plan_summary'] {
    return {
      name: plan.name || 'Payment Plan',
      down_payment: plan.down_payment || '-',
      duration: this.getPlanDuration(plan),
      monthly_installment: plan.monthly || 'N/A',
      discount: plan.discount || '0%',
    };
  }

  private getPlanDuration(plan: PaymentPlan): string {
    if (plan.duration_months && plan.duration_months > 0) {
      const years = plan.duration_months / 12;
      return Number.isInteger(years) ? `${years} years` : `${plan.duration_months} months`;
    }

    const yearsInName = plan.name.match(/(\d+)\s*years?/i);
    if (yearsInName?.[1]) {
      return `${yearsInName[1]} years`;
    }

    return plan.monthly ? this.propertyData.sidebar.duration || '-' : 'Immediate';
  }

  private applyPropertyOverrides(property: PropertyCardData | Project): void {
    const data = this.propertyData;
    const title = this.getTitle(property);
    if (title) data.title = title;

    const verified = this.getVerified(property);
    if (verified != null) data.verified = verified;

    const views = this.getViews(property);
    if (views != null) data.views = views;

    const description = this.getDescription(property);
    if (description) data.description = description;

    const hero = this.getHeroImageFromProperty(property);
    if (hero) data.main_image = hero;

    const gallery = this.getGalleryImagesFromProperty(property);
    if (gallery.length) data.gallery = gallery;

    const location = this.getLocation(property);
    if (location) data.location = { ...data.location, ...location };

    const propertyType = this.getPropertyType(property);
    if (propertyType) data.specs.property_type = propertyType;

    const bedrooms = this.getBedrooms(property);
    if (bedrooms != null) data.specs.bedrooms = bedrooms;

    const bathrooms = this.getBathrooms(property);
    if (bathrooms != null) data.specs.bathrooms = bathrooms;

    const areaSqm = this.getAreaSqm(property);
    if (areaSqm != null) data.specs.area_sqm = areaSqm;

    const floor = this.getFloor(property);
    if (floor != null) data.specs.floor = String(floor);

    const yearBuilt = this.getYearBuilt(property);
    if (yearBuilt != null) data.specs.year_built = yearBuilt;

    const compound = this.getCompoundName(property);
    if (compound) data.specs.compound = compound;

    const priceDisplay = this.getPriceDisplay(property);
    if (priceDisplay) {
      data.price.display = priceDisplay;
      data.sidebar.price_display = priceDisplay;
    }

    const perSqm = this.getPricePerSqm(property, areaSqm ?? data.specs.area_sqm);
    if (perSqm) {
      data.price.per_sqm = perSqm;
      data.sidebar.per_sqm = perSqm.replace(/\s*\/sqm$/i, '');
    }

    const features = this.getFeatures(property);
    if (features.length) data.features = features;

    const nearby = this.getNearbyPlaces(property);
    if (nearby.length) data.nearby_places = nearby;

    const agent = this.getAgentInfo(property);
    if (agent) data.agent = { ...data.agent, ...agent };

    if (this.isProject(property)) {
      data.specs.delivery = property.deliveryDate;
      data.specs.compound = property.name;
      data.specs.property_type = 'Project';
      data.sidebar.payment_plan_label = `Delivery ${property.deliveryDate}`;
      data.agent.name = property.developer;
      data.agent.title = 'Developer';
      data.agent.listed_count = property.totalUnits;
    }
  }

  private isApiProperty(property: PropertyCardData | Project): property is ApiProperty {
    return '_id' in property && 'gallery' in property;
  }

  private isPropertyDetails(property: PropertyCardData | Project): property is PropertyDetails {
    return 'specs' in property && 'payment_plans' in property;
  }

  private isProject(property: PropertyCardData | Project): property is Project {
    return 'developer' in property && 'unitTypes' in property && 'startingPrice' in property;
  }

  private getTitle(property: PropertyCardData | Project): string | null {
    if (this.isProject(property)) return property.name || null;
    if (this.isApiProperty(property)) return property.name || null;
    if (this.isPropertyDetails(property)) return property.title || null;
    return (property as Property).title || null;
  }

  private getVerified(property: PropertyCardData | Project): boolean | null {
    if (this.isProject(property)) return null;
    if (this.isPropertyDetails(property)) return property.verified;
    if ('isVerified' in property && typeof property.isVerified === 'boolean') {
      return property.isVerified;
    }
    if ('badges' in property && property.badges?.verified != null) {
      return property.badges.verified;
    }
    return null;
  }

  private getViews(property: PropertyCardData | Project): number | null {
    if (this.isProject(property)) return null;
    if (this.isPropertyDetails(property)) return property.views;
    return null;
  }

  private getDescription(property: PropertyCardData | Project): string | null {
    if (this.isProject(property)) {
      return `Project by ${property.developer}. Delivery ${property.deliveryDate}. Starting from ${property.startingPrice} EGP.`;
    }
    if (this.isApiProperty(property)) return property.description || null;
    if ('description' in property && typeof property.description === 'string') {
      return property.description;
    }
    return null;
  }

  private getHeroImageFromProperty(property: PropertyCardData | Project): string | null {
    if (this.isProject(property)) return property.imageUrl || null;
    if (this.isApiProperty(property)) {
      return property.gallery?.[0]?.secure_url || null;
    }
    if (this.isPropertyDetails(property)) {
      return property.main_image || property.gallery?.[0] || null;
    }
    const model = property as Property;
    return model.images?.hero || model.image || null;
  }

  private getGalleryImagesFromProperty(property: PropertyCardData | Project): string[] {
    if (this.isProject(property)) {
      return property.imageUrl ? [property.imageUrl] : [];
    }
    if (this.isApiProperty(property)) {
      return (property.gallery || []).map((item) => item.secure_url).filter(Boolean);
    }
    if (this.isPropertyDetails(property)) {
      return (property.gallery || []).filter(Boolean);
    }
    const model = property as Property;
    return (model.images?.gallery || []).filter(Boolean);
  }

  private getLocation(property: PropertyCardData | Project): PropertyDetails['location'] | null {
    if (this.isProject(property)) {
      const { area, city } = this.splitLocation(property.location || '');
      return {
        full: property.location || '',
        area: area || property.location || '',
        city,
      };
    }
    if (this.isPropertyDetails(property)) return property.location;
    if (this.isApiProperty(property)) {
      const area = property.location?.area || '';
      const city = property.location?.city || '';
      const full = [area, city].filter(Boolean).join(', ') || property.location?.address || '';
      return { full, area, city };
    }
    const model = property as Property;
    const full = model.location || '';
    const { area, city } = this.splitLocation(full);
    return {
      full,
      area: model.locationDetails?.area || area || full,
      city,
    };
  }

  private splitLocation(full: string): { area: string; city: string } {
    if (!full) return { area: '', city: '' };
    const parts = full
      .split(/,|\u060C/)
      .map((item) => item.trim())
      .filter(Boolean);
    return { area: parts[0] || '', city: parts[1] || '' };
  }

  private getPropertyType(property: PropertyCardData | Project): string | null {
    if (this.isProject(property)) return 'Project';
    if (this.isPropertyDetails(property)) return property.specs?.property_type || null;
    if (this.isApiProperty(property)) return property.type || null;
    return (property as Property).type || null;
  }

  private getBedrooms(property: PropertyCardData | Project): number | null {
    if (this.isProject(property)) return null;
    if (this.isPropertyDetails(property)) return property.specs?.bedrooms ?? null;
    const model = property as Property;
    return typeof model.bedrooms === 'number' ? model.bedrooms : null;
  }

  private getBathrooms(property: PropertyCardData | Project): number | null {
    if (this.isProject(property)) return null;
    if (this.isPropertyDetails(property)) return property.specs?.bathrooms ?? null;
    const model = property as Property;
    return typeof model.bathrooms === 'number' ? model.bathrooms : null;
  }

  private getAreaSqm(property: PropertyCardData | Project): number | null {
    if (this.isProject(property)) return null;
    if (this.isPropertyDetails(property)) return property.specs?.area_sqm ?? null;
    const model = property as Property;
    if (typeof model.stats?.area_sqm === 'number') return model.stats.area_sqm;
    return this.parseArea(model.area);
  }

  private parseArea(area: string | null | undefined): number | null {
    if (!area) return null;
    const m = area.match(/\d+/g);
    return m ? parseInt(m.join(''), 10) : null;
  }

  private getFloor(property: PropertyCardData | Project): string | number | null {
    if (this.isProject(property)) return null;
    if (this.isPropertyDetails(property)) return property.specs?.floor ?? null;
    const model = property as Property;
    return model.details?.floor ?? null;
  }

  private getYearBuilt(property: PropertyCardData | Project): number | null {
    if (this.isProject(property)) return null;
    if (this.isPropertyDetails(property)) return property.specs?.year_built ?? null;
    const model = property as Property;
    return model.details?.year_built ?? null;
  }

  private getCompoundName(property: PropertyCardData | Project): string | null {
    if (this.isProject(property)) return property.name || null;
    if (this.isPropertyDetails(property)) return property.specs?.compound || null;
    return null;
  }

  private getPriceDisplay(property: PropertyCardData | Project): string | null {
    if (this.isProject(property)) return `${property.startingPrice} EGP`;
    if (this.isPropertyDetails(property)) return property.price?.display || null;
    const model = property as Property;
    if (typeof model.price === 'number') {
      const currency =
        model.pricing?.currency || model.pricing?.sidebar_display_price?.currency || 'EGP';
      return `${model.price} ${currency}`;
    }
    return null;
  }

  private getPricePerSqm(
    property: PropertyCardData | Project,
    areaSqm: number | null,
  ): string | null {
    if (this.isProject(property)) return null;
    if (this.isPropertyDetails(property)) return property.price?.per_sqm || null;
    if (!areaSqm) return null;
    const model = property as Property;
    if (typeof model.price !== 'number') return null;
    const currency =
      model.pricing?.currency || model.pricing?.sidebar_display_price?.currency || 'EGP';
    const perSqm = Math.round((model.price / areaSqm) * 100) / 100;
    return `${perSqm} ${currency}/sqm`;
  }

  private getFeatures(property: PropertyCardData | Project): string[] {
    if (this.isProject(property)) return property.unitTypes || [];
    if (this.isPropertyDetails(property)) return property.features || [];
    if (this.isApiProperty(property)) return property.facilitiesAndServices || [];
    const model = property as Property;
    return model.amenities || [];
  }

  private getNearbyPlaces(property: PropertyCardData | Project): PropertyDetails['nearby_places'] {
    if (this.isProject(property)) return [];
    if (this.isPropertyDetails(property)) return property.nearby_places || [];
    const model = property as Property;
    if (model.location_details?.nearby_places?.length) {
      return model.location_details.nearby_places.map((place) => ({
        name: place.name,
        type: place.type,
        distance_km: place.distance_km,
        travel_time: '',
      }));
    }
    return [];
  }

  private getAgentInfo(
    property: PropertyCardData | Project,
  ): Partial<PropertyDetails['agent']> | null {
    if (this.isProject(property)) {
      return {
        name: property.developer,
        title: 'Developer',
        listed_count: property.totalUnits,
      };
    }
    if (this.isPropertyDetails(property)) return property.agent;
    const model = property as Property;
    if (!model.owner) return null;
    return {
      name: model.owner.name,
      verified: model.owner.verified,
      title: model.owner.role,
      rating: model.rating ?? this.propertyData.agent.rating,
      reviews_count: model.reviews ?? this.propertyData.agent.reviews_count,
      listed_count: model.owner.properties_listed ?? this.propertyData.agent.listed_count,
      response_rate: `${model.owner.response_rate_percent}%`,
    };
  }
}
