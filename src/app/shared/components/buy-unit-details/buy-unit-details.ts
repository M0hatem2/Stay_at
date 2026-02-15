import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentPlansSelector } from '../payment-plans-selector/payment-plans-selector';
import { MOCK_PROPERTY_DATA, PropertyDetails } from '../../../core/models/property-details.model';
import { Property } from '../../../core/models/property.model';
import { ApiProperty } from '../../../core/models/api-property.model';
import { PropertyCardData } from '../units-card/units-card';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-buy-unit-details',
  imports: [
    CommonModule,
  ],
  templateUrl: './buy-unit-details.html',
  styleUrl: './buy-unit-details.scss',
})
export class BuyUnitDetails implements OnInit, OnDestroy {
  propertyData: PropertyDetails = this.cloneMock();

  // Image Gallery Properties
  selectedImageIndex: number = 0;
  isImageModalOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const navState = navigation?.extras.state as
      | { property?: PropertyCardData | Project }
      | undefined;

    if (navState?.property) {
      this.applyPropertyOverrides(navState.property);
      return;
    }

    if (typeof window !== 'undefined') {
      const histState =
        (window.history?.state as { property?: PropertyCardData | Project }) || {};
      if (histState?.property) {
        this.applyPropertyOverrides(histState.property);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.isImageModalOpen) {
      document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
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

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  openImageModal(): void;
  openImageModal(index: number): void;
  openImageModal(index?: number): void {
    if (index !== undefined) {
      this.selectedImageIndex = index;
    }
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
    const parts = full.split(/,|\u060C/).map((item) => item.trim()).filter(Boolean);
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
