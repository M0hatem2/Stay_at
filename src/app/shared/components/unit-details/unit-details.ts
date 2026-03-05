import { Component, OnInit, OnDestroy, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FullPropertyData } from '../../../core/models/property.model';
import { PropertyCardData } from '../units-card/units-card';
import { CommonModule } from '@angular/common';
import { ApiProperty } from '../../../core/models/api-property.model';
import { Subscription } from 'rxjs';
import { UnitService, Unit } from '../../../features/rent/services/unit.service';
import { PropertyService } from '../../../features/all-properties/services/property.service';
import { UnitGalleryComponent } from '../unit-gallery';
import { UnitInfoComponent } from './components/unit-info';
import { BookingSidebarComponent } from './components/booking-sidebar';
import { AiAnalysisComponent } from './components/ai-analysis';
import { LocationMapComponent } from './components/location-map';
import { DayDetailsModalComponent } from './components/day-details-modal';
import { ImageModalComponent } from './components/image-modal';
import { PricingTableComponent } from './components/pricing-table';
import { AvailabilityCalendarComponent } from './components/availability-calendar/availability-calendar';
import { BookTheApartment } from '../book-the-apartment/book-the-apartment';

@Component({
  selector: 'app-unit-details',
  imports: [
    CommonModule,
    UnitGalleryComponent,
    UnitInfoComponent,
    BookingSidebarComponent,
    AiAnalysisComponent,
    LocationMapComponent,
    DayDetailsModalComponent,
    ImageModalComponent,
    PricingTableComponent,
    AvailabilityCalendarComponent,
    BookTheApartment,
  ],
  templateUrl: './unit-details.html',
  styleUrl: './unit-details.scss',
})
export class UnitDetails implements OnInit, OnDestroy {
  property: FullPropertyData | undefined;
  apiProperty: ApiProperty | undefined;
  unitData: Unit | undefined;
  showBookingPopup = false;
  isLoading = false;
  errorMessage = '';
  private subscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;
  private languageSubscription: Subscription | undefined;
  private currentPropertyId: string | null = null;
  private loadedFromApiId: string | null = null;

  private unitService = inject(UnitService);
  private propertyService = inject(PropertyService);

  // Selected day for modal
  selectedDay: any | null = null;
  showDayDetails = false;

  // Selected date range from calendar
  selectedDateRange: { startDate: Date; endDate: Date } | null = null;

  // Selected pricing
  selectedPrice: number | null = null;
  selectedPricePeriod: string = '';

  // Image gallery properties
  currentImageIndex = 0;
  showImageModal = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/auth/sign-up']);
  }

  goToRegisterPop() {
    this.router.navigate(['/auth/register-pop']);
  }

  onPriceSelected(event: { pricePerDay: number; totalPrice: number; days: number; label: string }) {
    this.selectedPrice = event.pricePerDay;
    this.selectedPricePeriod = event.label;
    console.log('Selected price:', event);
  }

  openBookingPopup() {
    this.showBookingPopup = true;
  }

  closeBookingPopup() {
    this.showBookingPopup = false;
  }

  ngOnInit() {
    // الحصول على ID من الـ route
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.currentPropertyId = id;
        // Check the current route to determine which endpoint to use
        const currentUrl = this.router.url;
        if (currentUrl.includes('/property/')) {
          this.loadPropertyDetails(id);
        } else {
          this.loadUnitDetails(id);
        }
      }
    });
  }

  private loadUnitDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiProperty = undefined;
    this.property = undefined;

    this.unitService.getUnitById(id).subscribe({
      next: (response: any) => {
        console.log('🏠 Unit Details Response:', response);

        // Handle response formats: {unit: ...}, {property: ...} or unit object directly
        if (response.unit) {
          this.unitData = this.normalizeUnitData(response.unit);
          console.log('Mapped Unit Data:', this.unitData);
        } else if (response._id) {
          this.unitData = this.normalizeUnitData(response);
          console.log('Mapped Unit Data:', this.unitData);
        } else if (response.property) {
          // Convert property format to unit format
          this.apiProperty = response.property;
          // Map property data to unitData structure for compatibility
          this.unitData = this.mapPropertyToUnit(response.property);
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading unit details:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل تفاصيل الوحدة';
        this.isLoading = false;
      },
    });
  }

  private normalizeUnitData(rawUnit: any): Unit {
    const normalizedNearbyLandmarks = this.normalizeNearbyLandmarks(rawUnit?.nearbyLandmarks);
    const normalizedAiAnalysis =
      rawUnit?.aiAnalysis ||
      this.mapRentAnalysisToAiAnalysis(rawUnit?.rentAnalysis, normalizedNearbyLandmarks);

    const resolvedPricing = rawUnit?.finalPricing || this.resolveRentPricing(rawUnit);
    const listingPrice = this.buildListingPrice(rawUnit, resolvedPricing);

    return {
      ...rawUnit,
      gallery: Array.isArray(rawUnit?.gallery) ? rawUnit.gallery : [],
      documents: Array.isArray(rawUnit?.documents) ? rawUnit.documents : [],
      facilitiesAndServices: Array.isArray(rawUnit?.facilitiesAndServices)
        ? rawUnit.facilitiesAndServices
        : [],
      nearbyLandmarks: normalizedNearbyLandmarks,
      aiAnalysis: normalizedAiAnalysis,
      finalPricing: resolvedPricing,
      listingPrice,
    } as Unit;
  }

  private resolveRentPricing(unit: any): Unit['finalPricing'] | undefined {
    const activeSeasonalPricing = this.getActiveSeasonalPricing(unit?.seasonalPricing);

    if (activeSeasonalPricing) {
      return this.buildFinalPricing(activeSeasonalPricing, unit, 'seasonal');
    }

    if (unit?.basePricing) {
      return this.buildFinalPricing(unit.basePricing, unit, 'base');
    }

    return undefined;
  }

  private getActiveSeasonalPricing(seasonalPricing: any): any | null {
    if (!seasonalPricing?.startDate || !seasonalPricing?.endDate) {
      return null;
    }

    const now = new Date();
    const startDate = new Date(seasonalPricing.startDate);
    const endDate = new Date(seasonalPricing.endDate);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return null;
    }

    return now >= startDate && now <= endDate ? seasonalPricing : null;
  }

  private buildFinalPricing(
    pricing: any,
    unit: any,
    source: 'seasonal' | 'base',
  ): Unit['finalPricing'] {
    const normalizedTiers = Array.isArray(pricing?.tiers)
      ? pricing.tiers.map((tier: any) => ({
          minDays: Number(tier?.minDays ?? 1),
          pricePerDay: Number(tier?.pricePerDay ?? pricing?.price ?? 0),
          label: tier?.label || `${tier?.minDays ?? 1} days or more`,
          _id: tier?._id || '',
        }))
      : [];

    return {
      _id: pricing?._id || `${source}-${unit?._id || this.currentPropertyId || 'unit'}`,
      targetType: 'unit',
      targetId: unit?._id || this.currentPropertyId || '',
      purpose: pricing?.purpose || 'rent',
      rentType: pricing?.rentType || unit?.basePricing?.rentType || 'daily',
      price: Number(pricing?.price ?? 0),
      tiers: normalizedTiers,
      currency: pricing?.currency || 'EGP',
      isActive: true,
      createdBy: '',
      isDeleted: false,
      createdAt: '',
      updatedAt: '',
      __v: 0,
    } as Unit['finalPricing'];
  }

  private buildListingPrice(
    unit: any,
    pricing: Unit['finalPricing'] | undefined,
  ): Unit['listingPrice'] {
    return {
      salePrice: Number(unit?.listingPrice?.salePrice ?? 0),
      rentPrice: Number(unit?.listingPrice?.rentPrice ?? pricing?.price ?? unit?.basePricing?.price ?? 0),
      rentPeriod:
        unit?.listingPrice?.rentPeriod || pricing?.rentType || unit?.basePricing?.rentType || 'daily',
      currency: unit?.listingPrice?.currency || pricing?.currency || unit?.basePricing?.currency || 'EGP',
    };
  }

  private mapRentAnalysisToAiAnalysis(
    rentAnalysis: any,
    nearbyLandmarks: any[] = [],
  ): Unit['aiAnalysis'] {
    return {
      priceEvaluation: {
        status: rentAnalysis?.priceEvaluation?.status || '',
        marketComparison:
          rentAnalysis?.priceEvaluation?.marketComparison || rentAnalysis?.priceEvaluation?.status || '',
        isGoodDeal: !!rentAnalysis?.priceEvaluation?.isGoodDeal,
      },
      locationEvaluation: {
        rating: Number(rentAnalysis?.locationEvaluation?.rating ?? 0),
        pros: Array.isArray(rentAnalysis?.locationEvaluation?.pros)
          ? rentAnalysis.locationEvaluation.pros
          : [],
        description: rentAnalysis?.locationEvaluation?.description || '',
      },
      nearbyLandmarks,
      summary: rentAnalysis?.summary || '',
      lastUpdated: rentAnalysis?.lastUpdated || '',
      smartInsights: Array.isArray(rentAnalysis?.smartInsights) ? rentAnalysis.smartInsights : [],
    } as Unit['aiAnalysis'];
  }

  private normalizeNearbyLandmarks(nearbyLandmarks: any): any[] {
    if (!Array.isArray(nearbyLandmarks)) {
      return [];
    }

    return nearbyLandmarks.map((landmark: any) => ({
      name: landmark?.name || '',
      type: landmark?.type || '',
      distance: landmark?.distance || '',
    }));
  }

  private loadPropertyDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.propertyService.getPropertyById(id).subscribe({
      next: (response: any) => {
        console.log('🏠 Property Details Response:', response);

        // Handle property response format - API returns property directly without wrapper
        if (response._id) {
          // Response is the property object itself
          this.apiProperty = response;
          this.unitData = this.mapPropertyToUnit(response);
        } else if (response.property) {
          // Response has property wrapper
          this.apiProperty = response.property;
          this.unitData = this.mapPropertyToUnit(response.property);
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading property details:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل تفاصيل العقار';
        this.isLoading = false;
      },
    });
  }

  private mapPropertyToUnit(property: any): Unit {
    console.log('🔄 Mapping Property to Unit:', property);

    // Calculate unit area from price per meter if available
    let calculatedArea = 0;
    if (property.salePricing?.basePrice && property.salePricing?.pricePerMeter) {
      calculatedArea = Math.round(
        property.salePricing.basePrice / property.salePricing.pricePerMeter,
      );
    }

    // Map property structure to unit structure
    return {
      _id: property._id,
      slug: property.slug,
      title: property.name,
      description: property.description,
      unitType: property.type,
      location: property.location,
      gallery: property.gallery || [],
      documents: property.documents || [],
      facilitiesAndServices: property.facilitiesAndServices || [],
      nearbyLandmarks: this.normalizeNearbyLandmarks(property.nearbyLandmarks),
      project: property.project,
      owner: property.owner,
      status: property.status,
      // Add other fields with defaults or from property
      propertyId: property._id,
      projectId: property.projectId,
      ownerType: property.ownerType,
      ownerId: property.ownerId,
      unitNumber: '',
      purpose: 'sale_and_rent',
      unitArea: calculatedArea,
      bedrooms: 0,
      bathrooms: 0,
      floorNumber: property.floorsCount || 0,
      furnished: false,
      maxGuests: 0,
      isFeatured: property.isFeatured || false,
      listingPrice: {
        salePrice: property.salePricing?.basePrice || 0,
        rentPrice: 0,
        rentPeriod: 'daily',
        currency: property.salePricing?.currency || 'EGP',
      },
      // Map saleAnalysis to aiAnalysis structure
      aiAnalysis: {
        priceEvaluation: {
          status: property.saleAnalysis?.priceAnalysis?.status || '',
          marketComparison: property.saleAnalysis?.priceAnalysis?.status || '',
          isGoodDeal: property.saleAnalysis?.priceAnalysis?.priceDiffPercent <= 0,
        },
        locationEvaluation: {
          rating: property.saleAnalysis?.investmentAnalysis?.investmentScore || 0,
          pros: [],
          description: property.saleAnalysis?.summary || '',
        },
        nearbyLandmarks: this.normalizeNearbyLandmarks(property.nearbyLandmarks),
        summary: property.saleAnalysis?.summary || '',
        lastUpdated: property.saleAnalysis?.lastUpdated || '',
        smartInsights: property.saleAnalysis?.smartInsights || [],
      },
      // Add salePricing for property details
      salePricing: property.salePricing,
      saleAnalysis: property.saleAnalysis,
    } as Unit;
  }

  private handlePropertyData(property: PropertyCardData): void {
    if ('_id' in property) {
      // ?????? ???????? ???????????????? ???? ApiProperty
      this.apiProperty = property as ApiProperty;
      this.property = undefined;
    } else {
      // ?????? ???????? ???????????????? ???? FullPropertyData
      this.property = property as FullPropertyData;
      this.apiProperty = undefined;
    }
  }

  private isLikelySlug(id: string): boolean {
    return id.includes('-');
  }

  get displayTitle(): string {
    return this.unitData?.title || this.apiProperty?.name || this.property?.title || '';
  }

  get displayLocation(): string {
    if (this.unitData?.location) {
      return `${this.unitData.location.area}, ${this.unitData.location.city}`;
    }
    if (this.apiProperty?.location) {
      return `${this.apiProperty.location.area}, ${this.apiProperty.location.city}`;
    }
    return this.property?.location || this.property?.locationDetails?.area || '';
  }

  get heroImage(): string {
    if (this.unitData?.gallery?.length) {
      return this.unitData.gallery[0]?.secure_url || '';
    }
    if (this.apiProperty?.gallery?.length) {
      return this.apiProperty.gallery[0]?.secure_url || '';
    }
    return this.property?.images?.hero || this.property?.image || '';
  }

  get galleryImages(): string[] {
    if (this.unitData?.gallery?.length) {
      return this.unitData.gallery.map((item) => item.secure_url).filter(Boolean);
    }
    if (this.apiProperty?.gallery?.length) {
      return this.apiProperty.gallery.map((item) => item.secure_url).filter(Boolean);
    }
    if (this.property?.images?.gallery?.length) {
      return this.property.images.gallery;
    }
    // Fallback gallery for demo
    return [];
  }

  get isManaged(): boolean {
    return this.property?.isManaged || this.property?.badges?.managed || false;
  }

  get isVerified(): boolean {
    return this.property?.isVerified || this.property?.badges?.verified || false;
  }

  get bedrooms(): number | null {
    return (
      this.unitData?.bedrooms ?? this.property?.bedrooms ?? this.property?.stats?.bedrooms ?? null
    );
  }

  get bathrooms(): number | null {
    return (
      this.unitData?.bathrooms ??
      this.property?.bathrooms ??
      this.property?.stats?.bathrooms ??
      null
    );
  }

  get area(): string | null {
    if (this.unitData?.unitArea !== undefined && this.unitData?.unitArea !== null) {
      return `${this.unitData.unitArea} sqm`;
    }
    if (this.property?.area) return this.property.area;
    if (this.property?.stats?.area_sqm) return `${this.property.stats.area_sqm} sqm`;
    return null;
  }

  get rating(): number | null {
    return this.unitData?.averageRating ?? this.property?.rating ?? this.property?.stats?.rating ?? null;
  }

  get reviews(): number | null {
    return this.unitData?.totalReviews ?? this.property?.reviews ?? this.property?.stats?.review_count ?? null;
  }

  get floor(): string | number | null {
    return this.unitData?.floorNumber ?? this.property?.details?.floor ?? null;
  }

  get furnished(): boolean | null {
    return this.unitData?.furnished ?? this.property?.details?.furnished ?? null;
  }

  get yearBuilt(): number | null {
    return this.property?.details?.year_built ?? null;
  }

  get descriptionText(): string {
    return (
      this.unitData?.description ||
      this.apiProperty?.description ||
      this.property?.description ||
      ''
    );
  }

  get amenities(): string[] {
    return (
      this.unitData?.facilitiesAndServices ||
      this.property?.amenities ||
      this.apiProperty?.facilitiesAndServices ||
      []
    );
  }

  get pricingTable() {
    // استخدام finalPricing من Unit API
    const pricing = this.effectivePricing;

    if (pricing?.tiers?.length) {
      return pricing.tiers.map(
        (tier: { minDays: number; pricePerDay: number; label: string }) => ({
          duration_label: tier.label,
          days: tier.minDays,
          price_per_day: tier.pricePerDay,
          total_price: tier.pricePerDay * tier.minDays,
          discount_percent: this.calculateDiscount(tier.pricePerDay),
          savings: this.calculateSavings(tier.pricePerDay, tier.minDays),
        }),
      );
    }
    return this.property?.pricing?.pricing_table || [];
  }

  get effectivePricing(): Unit['finalPricing'] | undefined {
    if (this.unitData?.finalPricing) {
      return this.unitData.finalPricing;
    }

    if (this.unitData?.basePricing) {
      return this.buildFinalPricing(this.unitData.basePricing, this.unitData, 'base');
    }

    return undefined;
  }

  private calculateDiscount(pricePerDay: number): number {
    if (!this.effectivePricing?.price) return 0;
    const basePrice = this.effectivePricing.price;
    return Math.round(((basePrice - pricePerDay) / basePrice) * 100);
  }

  private calculateSavings(pricePerDay: number, days: number): number {
    if (!this.effectivePricing?.price) return 0;
    const basePrice = this.effectivePricing.price;
    return (basePrice - pricePerDay) * days;
  }

  get pricingCurrency(): string {
    const currencyCandidates = [
      this.effectivePricing?.currency,
      this.unitData?.basePricing?.currency,
      this.unitData?.seasonalPricing?.currency,
      this.unitData?.listingPrice?.currency,
      this.unitData?.salePricing?.currency,
      this.property?.pricing?.currency,
    ];

    const validCurrency = currencyCandidates.find((currency) => {
      const normalized = String(currency || '')
        .trim()
        .toUpperCase();
      return /^[A-Z]{3}$/.test(normalized);
    });

    return validCurrency ? String(validCurrency).trim().toUpperCase() : 'EGP';
  }

  get priceDisplay(): string {
    // إذا تم اختيار سعر، استخدمه
    if (this.selectedPrice !== null) {
      return `${this.selectedPrice.toLocaleString('ar-EG')} ${this.pricingCurrency}`;
    }

    // Check for sale pricing first (for properties)
    if (this.unitData?.salePricing?.basePrice) {
      return `${this.unitData.salePricing.basePrice.toLocaleString('ar-EG')} ${this.pricingCurrency}`;
    }

    if (this.effectivePricing?.price) {
      return `${this.effectivePricing.price.toLocaleString('ar-EG')} ${this.pricingCurrency}`;
    }
    if (this.unitData?.basePricing?.price) {
      return `${this.unitData.basePricing.price.toLocaleString('ar-EG')} ${this.pricingCurrency}`;
    }
    if (this.unitData?.listingPrice?.rentPrice) {
      return `${this.unitData.listingPrice.rentPrice.toLocaleString('ar-EG')} ${this.pricingCurrency}`;
    }
    if (this.unitData?.listingPrice?.salePrice) {
      return `${this.unitData.listingPrice.salePrice.toLocaleString('ar-EG')} ${this.pricingCurrency}`;
    }
    if (this.property?.pricing?.sidebar_display_price) {
      const price = this.property.pricing.sidebar_display_price;
      return `${price.amount} ${price.currency}`;
    }
    if (this.property?.price != null) {
      return `${this.property.price} ${this.pricingCurrency}`;
    }
    return '';
  }

  get pricePeriodLabel(): string {
    // For sale properties, no rent period label
    if (this.unitData?.salePricing) {
      return '';
    }

    if (this.effectivePricing?.rentType) {
      return this.getRentPeriodLabel(this.effectivePricing.rentType);
    }
    if (this.unitData?.basePricing?.rentType) {
      return this.getRentPeriodLabel(this.unitData.basePricing.rentType);
    }
    if (this.unitData?.listingPrice?.rentPeriod) {
      return this.getRentPeriodLabel(this.unitData.listingPrice.rentPeriod);
    }
    if (this.property?.pricing?.sidebar_display_price?.period_label) {
      return this.property.pricing.sidebar_display_price.period_label;
    }
    if (this.property?.priceType) {
      return this.property.priceType === 'monthly'
        ? 'Monthly'
        : this.property.priceType === 'daily'
          ? 'Daily'
          : 'For Sale';
    }
    return '';
  }

  private getRentPeriodLabel(period: string): string {
    const normalizedPeriod = period.toLowerCase();

    if (normalizedPeriod === 'daily' || normalizedPeriod === 'day') {
      return 'Daily';
    }
    if (normalizedPeriod === 'weekly' || normalizedPeriod === 'week') {
      return 'Weekly';
    }
    if (normalizedPeriod === 'monthly' || normalizedPeriod === 'month') {
      return 'Monthly';
    }
    if (normalizedPeriod === 'yearly' || normalizedPeriod === 'year') {
      return 'Yearly';
    }

    return '';
  }

  get pricePerMeter(): string | null {
    if (this.unitData?.salePricing?.pricePerMeter) {
      return `${this.unitData.salePricing.pricePerMeter.toLocaleString('ar-EG')} ${this.pricingCurrency}/sqm`;
    }
    return null;
  }

  get freeCancellationHours(): number | null {
    return this.property?.pricing?.free_cancellation_hours ?? null;
  }

  get availabilitySummary() {
    return this.property?.availability?.summary;
  }

  get availabilityNextDate(): string | null {
    return this.property?.availability?.next_available_date ?? null;
  }

  get availabilityDaysUntil(): number | null {
    return this.property?.availability?.days_until_next_available ?? null;
  }

  get availabilityCurrentPeriod() {
    return this.property?.availability?.current_period;
  }

  get unitAvailabilityPeriods() {
    return Array.isArray(this.unitData?.availabilities) ? this.unitData.availabilities : null;
  }

  get bookingRentalType(): 'daily' | 'weekly' | 'monthly' | 'yearly' {
    const rentType =
      this.effectivePricing?.rentType ||
      this.unitData?.basePricing?.rentType ||
      this.unitData?.listingPrice?.rentPeriod ||
      'daily';
    const normalized = rentType.toLowerCase();

    if (normalized === 'day' || normalized === 'daily') return 'daily';
    if (normalized === 'week' || normalized === 'weekly') return 'weekly';
    if (normalized === 'month' || normalized === 'monthly') return 'monthly';
    if (normalized === 'year' || normalized === 'yearly') return 'yearly';
    return 'daily';
  }

  get smartAnalysis() {
    return this.unitData?.aiAnalysis || this.property?.smart_analysis;
  }

  get locationLat(): number | null {
    return (
      this.unitData?.location?.coordinates?.coordinates?.[1] ??
      this.property?.location_details?.latitude ??
      this.property?.locationDetails?.latitude ??
      this.apiProperty?.location?.coordinates?.coordinates?.[1] ??
      null
    );
  }

  get locationLng(): number | null {
    return (
      this.unitData?.location?.coordinates?.coordinates?.[0] ??
      this.property?.location_details?.longitude ??
      this.property?.locationDetails?.longitude ??
      this.apiProperty?.location?.coordinates?.coordinates?.[0] ??
      null
    );
  }

  get locationCoordinates(): string {
    const lat = this.locationLat;
    const lng = this.locationLng;
    if (lat !== null && lng !== null) {
      return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
    }
    return 'Lat: 30.0444, Lng: 31.2357';
  }

  get locationAddress(): string {
    return this.unitData?.location?.address || this.apiProperty?.location?.address || '';
  }

  get locationArea(): string {
    return this.unitData?.location?.area || this.apiProperty?.location?.area || '';
  }

  get locationCity(): string {
    return this.unitData?.location?.city || this.apiProperty?.location?.city || '';
  }

  get locationCountry(): string {
    return this.unitData?.location?.country || this.apiProperty?.location?.country || '';
  }

  get nearbyPlaces() {
    if (this.unitData?.aiAnalysis?.nearbyLandmarks?.length) {
      return this.unitData.aiAnalysis.nearbyLandmarks.map((landmark) => ({
        name: landmark.name,
        type: landmark.type,
        distance: landmark.distance,
      }));
    }
    if (this.unitData?.nearbyLandmarks?.length) {
      return this.normalizeNearbyLandmarks(this.unitData.nearbyLandmarks);
    }
    return this.property?.location_details?.nearby_places || [];
  }

  get ownerInfo() {
    if (!this.unitData?.owner) return null;

    return {
      id: this.unitData.ownerId || (this.unitData.owner as any)?._id || '',
      name: this.unitData.owner.name,
      type: this.unitData.owner.type,
      role: this.unitData.owner.role,
      phoneNumber: this.unitData.owner.contact?.phoneNumber || '',
      email: this.unitData.owner.contact?.email || '',
    };
  }

  get ownerName(): string {
    return this.unitData?.owner?.name || this.property?.owner?.name || 'Ahmed Mohamed';
  }

  get ownerType(): string {
    return this.unitData?.owner?.type || '';
  }

  get ownerRole(): string {
    return this.unitData?.owner?.role || '';
  }

  get ownerPhone(): string {
    return this.unitData?.owner?.contact?.phoneNumber || '';
  }

  get ownerEmail(): string {
    return this.unitData?.owner?.contact?.email || '';
  }

  get safetyTips(): string[] {
    return this.property?.safety_tips || [];
  }

  get defaultSafetyTips(): string[] {
    return ["Don't pay before viewing", 'Verify official documents', 'Use secure payment methods'];
  }

  // AI Analysis getters
  get hasPriceEvaluation(): boolean {
    return !!this.unitData?.aiAnalysis?.priceEvaluation;
  }

  get hasLocationEvaluation(): boolean {
    return !!this.unitData?.aiAnalysis?.locationEvaluation;
  }

  get hasAiSummary(): boolean {
    return !!this.unitData?.aiAnalysis?.summary;
  }

  // Calendar event handler
  onDateClick(day: any): void {
    this.selectedDay = day;
    this.showDayDetails = true;
    console.log('Date clicked:', day.fullDate, 'Status:', day.status);
  }

  onDateRangeSelected(range: { startDate: Date; endDate: Date }): void {
    console.log('📅 Date range selected:', range);

    // حفظ النطاق المحدد
    this.selectedDateRange = range;

    // حساب عدد الأيام
    const days = Math.ceil(
      (range.endDate.getTime() - range.startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    console.log('📊 Number of days:', days);

    // إذا كان هناك سعر محدد، احسب السعر الإجمالي
    if (this.selectedPrice) {
      const totalPrice = this.selectedPrice * days;
      console.log('💰 Total price:', totalPrice, this.pricingCurrency);
    }
  }

  closeDayDetails(): void {
    this.showDayDetails = false;
    this.selectedDay = null;
  }

  getDayStatusText(day: any): string {
    switch (day.status) {
      case 'available':
        return 'Available for booking';
      case 'occupied':
        return 'Already booked';
      case 'pending':
        return 'Pending confirmation';
      case 'past':
        return 'Past date';
      default:
        return 'Unknown status';
    }
  }

  // Image gallery methods
  selectImage(index: number): void {
    if (index >= 0 && index < this.galleryImages.length) {
      this.currentImageIndex = index;
    }
  }

  openImageModal(): void {
    this.showImageModal = true;
    // Focus the modal for keyboard navigation
    setTimeout(() => {
      const modal = document.querySelector('[tabindex="0"]') as HTMLElement;
      if (modal) {
        modal.focus();
      }
    }, 100);
  }

  closeImageModal(): void {
    this.showImageModal = false;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
  }

  previousImage(): void {
    this.currentImageIndex =
      this.currentImageIndex === 0 ? this.galleryImages.length - 1 : this.currentImageIndex - 1;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
