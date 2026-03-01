import { Component, OnInit, OnDestroy, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FullPropertyData } from '../../../core/models/property.model';
import { PropertyCardData } from '../units-card/units-card';
import { CommonModule } from '@angular/common';
import { ApiProperty } from '../../../core/models/api-property.model';
import { Subscription } from 'rxjs';
import { UnitService, Unit } from '../../../features/rent/services/unit.service';
import { PropertyService } from '../../../features/all-properties/services/property.service';
import { UnitGalleryComponent } from './components/unit-gallery';
import { UnitInfoComponent } from './components/unit-info';
import { BookingSidebarComponent } from './components/booking-sidebar';
import { AiAnalysisComponent } from './components/ai-analysis';
import { LocationMapComponent } from './components/location-map';
import { DayDetailsModalComponent } from './components/day-details-modal';
import { ImageModalComponent } from './components/image-modal';
import { PricingTableComponent } from './components/pricing-table';
import { AvailabilityCalendarComponent } from './components/availability-calendar/availability-calendar';

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

    this.unitService.getUnitById(id).subscribe({
      next: (response: any) => {
        console.log('🏠 Unit Details Response:', response);

        // Handle both response formats: {unit: ...} or {property: ...}
        if (response.unit) {
          this.unitData = response.unit;
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

  private loadPropertyDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.propertyService.getPropertyById(id).subscribe({
      next: (response: any) => {
        console.log('🏠 Property Details Response:', response);

        // Handle property response format
        if (response.property) {
          this.apiProperty = response.property;
          // Map property data to unitData structure for compatibility
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
      unitArea: 0,
      bedrooms: 0,
      bathrooms: 0,
      floorNumber: property.floorsCount || 0,
      furnished: false,
      maxGuests: 0,
      isFeatured: property.isFeatured || false,
      listingPrice: {
        salePrice: 0,
        rentPrice: 0,
        rentPeriod: 'daily',
        currency: 'EGP',
      },
      aiAnalysis: {
        priceEvaluation: {
          status: '',
          marketComparison: '',
          isGoodDeal: false,
        },
        locationEvaluation: {
          rating: 0,
          pros: [],
          description: '',
        },
        nearbyLandmarks: [],
        summary: '',
        lastUpdated: '',
      },
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
    return [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop',
    ];
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
    if (this.unitData?.unitArea) return `${this.unitData.unitArea} م²`;
    if (this.property?.area) return this.property.area;
    if (this.property?.stats?.area_sqm) return `${this.property.stats.area_sqm} sqm`;
    return null;
  }

  get rating(): number | null {
    return this.property?.rating ?? this.property?.stats?.rating ?? null;
  }

  get reviews(): number | null {
    return this.property?.reviews ?? this.property?.stats?.review_count ?? null;
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
    if (this.unitData?.finalPricing?.tiers) {
      return this.unitData.finalPricing.tiers.map(
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

  private calculateDiscount(pricePerDay: number): number {
    if (!this.unitData?.finalPricing?.price) return 0;
    const basePrice = this.unitData.finalPricing.price;
    return Math.round(((basePrice - pricePerDay) / basePrice) * 100);
  }

  private calculateSavings(pricePerDay: number, days: number): number {
    if (!this.unitData?.finalPricing?.price) return 0;
    const basePrice = this.unitData.finalPricing.price;
    return (basePrice - pricePerDay) * days;
  }

  get pricingCurrency(): string {
    return (
      this.unitData?.finalPricing?.currency ||
      this.unitData?.listingPrice?.currency ||
      this.property?.pricing?.currency ||
      'EGP'
    );
  }

  get priceDisplay(): string {
    // إذا تم اختيار سعر، استخدمه
    if (this.selectedPrice !== null) {
      return `${this.selectedPrice.toLocaleString('ar-EG')} ${this.pricingCurrency}`;
    }

    if (this.unitData?.finalPricing?.price) {
      return `${this.unitData.finalPricing.price.toLocaleString('ar-EG')} ${this.pricingCurrency}`;
    }
    if (this.unitData?.listingPrice?.rentPrice) {
      return `${this.unitData.listingPrice.rentPrice.toLocaleString('ar-EG')} ${this.pricingCurrency}`;
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
    if (this.unitData?.finalPricing?.rentType) {
      const rentType = this.unitData.finalPricing.rentType;
      return rentType === 'daily'
        ? 'يومياً'
        : rentType === 'monthly'
          ? 'شهرياً'
          : rentType === 'yearly'
            ? 'سنوياً'
            : '';
    }
    if (this.unitData?.listingPrice?.rentPeriod) {
      const period = this.unitData.listingPrice.rentPeriod;
      return period === 'day'
        ? 'يومياً'
        : period === 'week'
          ? 'أسبوعياً'
          : period === 'month'
            ? 'شهرياً'
            : period === 'year'
              ? 'سنوياً'
              : '';
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
    if (this.unitData?.aiAnalysis?.nearbyLandmarks) {
      return this.unitData.aiAnalysis.nearbyLandmarks.map((landmark) => ({
        name: landmark.name,
        type: landmark.type,
        distance: landmark.distance,
      }));
    }
    return this.property?.location_details?.nearby_places || [];
  }

  get ownerInfo() {
    if (!this.unitData?.owner) return null;

    return {
      name: this.unitData.owner.name,
      type: this.unitData.owner.type,
      role: this.unitData.owner.role,
      phoneNumber: this.unitData.owner.contact.phoneNumber,
      email: this.unitData.owner.contact.email,
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
