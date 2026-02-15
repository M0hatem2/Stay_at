import { Component, OnInit, OnDestroy } from '@angular/core';
 
import { BookTheApartment } from '../book-the-apartment/book-the-apartment';
import { ActivatedRoute, Router } from '@angular/router';
import { FullPropertyData } from '../../../core/models/property.model';
import { PropertyCardData } from '../units-card/units-card';
import { CommonModule, DatePipe } from '@angular/common';
 import { ApiProperty } from '../../../core/models/api-property.model';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { GoogleMap } from '../google-map/google-map';

interface CalendarDay {
  date: number;
  status: 'available' | 'occupied' | 'pending' | 'past';
  isCurrentMonth: boolean;
  fullDate: Date;
  isToday: boolean;
}
 
@Component({
  selector: 'app-unit-details',
  imports: [
    CommonModule,
    DatePipe,
     
    BookTheApartment,
    GoogleMap,
  ],
  templateUrl: './unit-details.html',
  styleUrl: './unit-details.scss',
})
export class UnitDetails implements OnInit, OnDestroy {
  property: FullPropertyData | undefined;
  apiProperty: ApiProperty | undefined;
  showBookingPopup = false;
  isLoading = false;
  errorMessage = '';
  private subscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;
  private languageSubscription: Subscription | undefined;
  private currentPropertyId: string | null = null;
  private loadedFromApiId: string | null = null;

  // Calendar properties
  currentDate = new Date();
  calendarMonth = new Date().getMonth();
  calendarYear = new Date().getFullYear();
  calendarDays: CalendarDay[] = [];
  availableCount = 0;
  occupiedCount = 0;
  pendingCount = 0;
  selectedDay: CalendarDay | null = null;
  showDayDetails = false;
  
  // Image gallery properties
  currentImageIndex = 0;
  showImageModal = false;
  
  // Sample booking data (replace with real data from API)
  private bookedDates = new Set<string>([
    '2026-02-10', '2026-02-11', '2026-02-15', '2026-02-25',
    '2026-03-05', '2026-03-15', '2026-03-20'
  ]);
  
  private pendingDates = new Set<string>([
    '2026-02-18', '2026-02-22', '2026-03-08', '2026-03-12'
  ]);

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

  openBookingPopup() {
    this.showBookingPopup = true;
  }

  closeBookingPopup() {
    this.showBookingPopup = false;
  }

  ngOnInit() {
    this.generateCalendar();
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
    return this.apiProperty?.name || this.property?.title || '';
  }

  get displayLocation(): string {
    if (this.apiProperty?.location) {
      return `${this.apiProperty.location.area}, ${this.apiProperty.location.city}`;
    }
    return this.property?.location || this.property?.locationDetails?.area || '';
  }

  get heroImage(): string {
    if (this.apiProperty?.gallery?.length) {
      return this.apiProperty.gallery[0]?.secure_url || '';
    }
    return this.property?.images?.hero || this.property?.image || '';
  }

  get galleryImages(): string[] {
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
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop'
    ];
  }

  get isManaged(): boolean {
    return this.property?.isManaged || this.property?.badges?.managed || false;
  }

  get isVerified(): boolean {
    return this.property?.isVerified || this.property?.badges?.verified || false;
  }

  get bedrooms(): number | null {
    return this.property?.bedrooms ?? this.property?.stats?.bedrooms ?? null;
  }

  get bathrooms(): number | null {
    return this.property?.bathrooms ?? this.property?.stats?.bathrooms ?? null;
  }

  get area(): string | null {
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
    return this.property?.details?.floor ?? null;
  }

  get furnished(): boolean | null {
    return this.property?.details?.furnished ?? null;
  }

  get yearBuilt(): number | null {
    return this.property?.details?.year_built ?? null;
  }

  get descriptionText(): string {
    return this.apiProperty?.description || this.property?.description || '';
  }

  get amenities(): string[] {
    return this.property?.amenities || this.apiProperty?.facilitiesAndServices || [];
  }

  get pricingTable() {
    return this.property?.pricing?.pricing_table || [];
  }

  get pricingCurrency(): string {
    return this.property?.pricing?.currency || 'EGP';
  }

  get priceDisplay(): string {
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
    return this.property?.smart_analysis;
  }

  get locationLat(): number | null {
    return (
      this.property?.location_details?.latitude ??
      this.property?.locationDetails?.latitude ??
      this.apiProperty?.location?.coordinates?.coordinates?.[1] ??
      null
    );
  }

  get locationLng(): number | null {
    return (
      this.property?.location_details?.longitude ??
      this.property?.locationDetails?.longitude ??
      this.apiProperty?.location?.coordinates?.coordinates?.[0] ??
      null
    );
  }

  get nearbyPlaces() {
    return this.property?.location_details?.nearby_places || [];
  }

  get ownerInfo() {
    return this.property?.owner;
  }

  get safetyTips(): string[] {
    return this.property?.safety_tips || [];
  }

  // Calendar methods
  generateCalendar(): void {
    const firstDay = new Date(this.calendarYear, this.calendarMonth, 1);
    const lastDay = new Date(this.calendarYear, this.calendarMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    this.availableCount = 0;
    this.occupiedCount = 0;
    this.pendingCount = 0;
    
    for (let i = 0; i < 42; i++) {
      const current = new Date(startDate);
      current.setDate(startDate.getDate() + i);
      
      const dateStr = this.formatDateForComparison(current);
      const isCurrentMonth = current.getMonth() === this.calendarMonth;
      const isPast = current < new Date(new Date().setHours(0, 0, 0, 0));
      
      let status: 'available' | 'occupied' | 'pending' | 'past';
      
      if (isPast) {
        status = 'past';
      } else if (this.bookedDates.has(dateStr)) {
        status = 'occupied';
        this.occupiedCount++;
      } else if (this.pendingDates.has(dateStr)) {
        status = 'pending';
        this.pendingCount++;
      } else {
        status = 'available';
        if (isCurrentMonth) this.availableCount++;
      }
      
      days.push({
        date: current.getDate(),
        status,
        isCurrentMonth,
        fullDate: new Date(current),
        isToday: this.isToday(current)
      });
    }
    
    this.calendarDays = days;
  }

  previousMonth(): void {
    if (this.calendarMonth === 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    } else {
      this.calendarMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.calendarMonth === 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    } else {
      this.calendarMonth++;
    }
    this.generateCalendar();
  }

  onDateClick(day: CalendarDay): void {
    this.selectedDay = day;
    this.showDayDetails = true;
    console.log('Date clicked:', day.fullDate, 'Status:', day.status);
  }

  closeDayDetails(): void {
    this.showDayDetails = false;
    this.selectedDay = null;
  }

  getDayStatusText(day: CalendarDay): string {
    switch (day.status) {
      case 'available': return 'Available for booking';
      case 'occupied': return 'Already booked';
      case 'pending': return 'Pending confirmation';
      case 'past': return 'Past date';
      default: return 'Unknown status';
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
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.galleryImages.length - 1 
      : this.currentImageIndex - 1;
  }

  getMonthName(): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[this.calendarMonth]} ${this.calendarYear}`;
  }

  getDayClasses(day: CalendarDay): string {
    let classes = 'aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all relative cursor-pointer hover:scale-105 hover:shadow-md min-h-[32px] sm:min-h-[40px]';
    
    // All days have the same basic styling
    if (day.isCurrentMonth) {
      classes += ' bg-white text-gray-700 border-gray-200 hover:bg-gray-50';
    } else {
      classes += ' bg-gray-50 text-gray-400 border-gray-200';
    }
    
    // Special styling for today
    if (day.isToday) {
      classes += ' ring-2 ring-[#de5806] ring-offset-2';
    }
    
    // Disable past dates
    if (day.status === 'past') {
      classes += ' cursor-not-allowed opacity-60';
    }
    
    return classes;
  }

  getStatusIcon(day: CalendarDay): string {
    // Don't show icons on the calendar anymore
    return '';
  }

  private formatDateForComparison(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
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
