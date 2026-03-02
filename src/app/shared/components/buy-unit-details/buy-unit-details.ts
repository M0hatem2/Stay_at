import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentPlansSelector } from '../payment-plans-selector/payment-plans-selector';
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
  propertyData: PropertyDetails = this.cloneMock();
  unitData: any = null; // البيانات من الـ API
  isLoading = false;
  errorMessage = '';

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
        this.unitData = response;
        this.mapApiDataToPropertyData(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading unit details:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل تفاصيل الوحدة';
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

  private mapApiDataToPropertyData(data: any): void {
    const pd = this.propertyData;

    // Basic Info
    if (data.title) pd.title = data.title;
    if (data.description) pd.description = data.description;
    if (data.isTrusted != null) pd.verified = data.isTrusted;
    if (data.viewsCount != null) pd.views = data.viewsCount;

    // Gallery
    if (data.gallery?.length) {
      pd.gallery = data.gallery.map((img: any) => img.secure_url);
      pd.main_image = pd.gallery[0];
    }

    // Location
    if (data.location) {
      pd.location = {
        full: `${data.location.area}, ${data.location.city}`,
        area: data.location.area,
        city: data.location.city,
      };
    }

    // Specs
    if (data.unitType) pd.specs.property_type = data.unitType;
    if (data.bedrooms != null) pd.specs.bedrooms = data.bedrooms;
    if (data.bathrooms != null) pd.specs.bathrooms = data.bathrooms;
    if (data.unitArea != null) pd.specs.area_sqm = data.unitArea;
    if (data.floorNumber != null) pd.specs.floor = String(data.floorNumber);
    if (data.furnished != null) pd.specs.finishing = data.furnished ? 'Furnished' : 'Unfurnished';

    // Project/Compound
    if (data.project?.name) {
      pd.specs.compound = data.project.name;
      if (data.project.expectedDeliveryDate) {
        pd.specs.delivery = new Date(data.project.expectedDeliveryDate).getFullYear().toString();
      }
    }

    // Price
    if (data.salePricing) {
      const basePrice = data.salePricing.basePrice;
      const currency = data.salePricing.currency || 'EGP';
      pd.price.display = `${basePrice.toLocaleString()} ${currency}`;
      pd.sidebar.price_display = pd.price.display;

      if (data.salePricing.pricePerMeter) {
        pd.price.per_sqm = `${data.salePricing.pricePerMeter.toLocaleString()} ${currency}/sqm`;
        pd.sidebar.per_sqm = `${data.salePricing.pricePerMeter.toLocaleString()}`;
      }

      // Payment Plans
      if (data.salePricing.plans?.length) {
        pd.payment_plans = data.salePricing.plans.map((plan: any, index: number) => ({
          id: `plan_${index}`,
          name: plan.name_ar || plan.name_en,
          type: plan.saleType === 'cash' ? 'cash' : 'installment',
          down_payment: plan.downPaymentPercent
            ? `${plan.downPaymentPercent}%`
            : plan.saleType === 'cash'
              ? '100%'
              : '0%',
          years: plan.years || 0,
          monthly_payment: this.calculateMonthlyPayment(
            basePrice,
            plan.downPaymentPercent || 0,
            plan.years || 0,
            plan.interestRate || 0,
          ),
          total_price: basePrice,
          selected: index === 0,
        }));
      }
    }

    // Features
    if (data.facilitiesAndServices?.length) {
      pd.features = data.facilitiesAndServices;
    }

    // Compound Features (from project)
    if (data.project?.featuresAndServices?.length) {
      pd.compound_features = data.project.featuresAndServices;
    }

    // Nearby Places
    if (data.nearbyLandmarks?.length) {
      pd.nearby_places = data.nearbyLandmarks.map((landmark: any) => ({
        name: landmark.name,
        type: landmark.type,
        distance_km: parseFloat(landmark.distance) || 0,
        travel_time: '',
      }));
    }

    // Investment Analysis
    if (data.saleAnalysis) {
      pd.price_investment_analysis = {
        price_per_sqm: data.salePricing?.pricePerMeter
          ? `${data.salePricing.pricePerMeter.toLocaleString()} ${data.salePricing.currency || 'EGP'}/sqm`
          : '',
        comparison_to_area_average:
          data.saleAnalysis.priceAnalysis?.status || 'No comparison available',
        expected_rental_yield: data.saleAnalysis.investmentAnalysis?.rentalYield
          ? `${data.saleAnalysis.investmentAnalysis.rentalYield}%`
          : '0%',
        expected_rental_annual_return: data.saleAnalysis.investmentAnalysis?.annualRentIncome
          ? `${data.saleAnalysis.investmentAnalysis.annualRentIncome.toLocaleString()} ${data.salePricing?.currency || 'EGP'}`
          : '0 EGP',
        expected_appreciation: data.saleAnalysis.investmentAnalysis?.appreciationRate
          ? `${data.saleAnalysis.investmentAnalysis.appreciationRate}%`
          : '0%',
        payback_period_years: data.saleAnalysis.investmentAnalysis?.paybackPeriod || 0,
      };

      // AI Insights
      if (data.saleAnalysis.smartInsights?.length) {
        pd.ai_insights = data.saleAnalysis.smartInsights.map((insight: string) => ({
          title: 'Smart Insight',
          detail: insight,
        }));
      }
    }

    // Agent/Owner
    if (data.owner) {
      pd.agent = {
        name: data.owner.name,
        verified: true,
        title: data.owner.role,
        rating: 4.8,
        reviews_count: 0,
        sold_count: data.owner.stats?.soldCount || 0,
        listed_count: data.owner.stats?.listedCount || 0,
        response_rate: '95%',
        response_time: '2 hours',
      };
    }

    // Documents
    if (data.documents?.length) {
      pd.documents = data.documents.map((doc: any) => ({
        name: doc.original_filename || 'Document',
        status: 'Available',
      }));
    }
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

  ngOnDestroy(): void {
    if (this.isImageModalOpen) {
      document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
    this.routeSubscription?.unsubscribe();
  }

  get galleryImages(): string[] {
    const gallery = this.propertyData.gallery?.filter(Boolean) || [];
    if (gallery.length) return gallery;
    return this.propertyData.main_image ? [this.propertyData.main_image] : [];
  }

  get heroImage(): string {
    return this.propertyData.main_image || this.galleryImages[0] || '';
  }

  get agentInitial(): string {
    return this.propertyData.agent?.name?.trim()?.charAt(0)?.toUpperCase() || 'A';
  }

  get selectedPlan() {
    return this.propertyData.payment_plans.find((plan) => plan.selected) || null;
  }

  get displayTitle(): string {
    return this.propertyData.title || 'Property Image';
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
