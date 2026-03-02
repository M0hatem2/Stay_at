import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetails } from '../../../core/models/property-details.model';
import { Property } from '../../../core/models/property.model';
import { ApiProperty } from '../../../core/models/api-property.model';
import { AddToFav } from '../add-to-fav/add-to-fav';

export type PropertyCardData = PropertyDetails | Property | ApiProperty;

@Component({
  selector: 'app-units-card',
  imports: [CommonModule, AddToFav],
  templateUrl: './units-card.html',
  styleUrl: './units-card.scss',
})
export class UnitsCard {
  @Input() property!: PropertyCardData;
  @Output() propertyClick = new EventEmitter<PropertyCardData>();

  private isApiProperty(prop: PropertyCardData): prop is ApiProperty {
    return '_id' in prop && ('gallery' in prop || 'thumbnail' in prop || 'targetId' in prop);
  }

  private isProperty(prop: PropertyCardData): prop is Property {
    return 'id' in prop || 'title' in prop;
  }

  private isPropertyDetails(prop: PropertyCardData): prop is PropertyDetails {
    return 'specs' in prop || 'main_image' in prop;
  }

  get image(): string {
    // ===== API Property =====
    if (this.isApiProperty(this.property)) {
      // thumbnail (الأولوية)
      const thumbnail = this.property.thumbnail?.secure_url;
      if (thumbnail) return thumbnail;

      // gallery fallback
      const galleryImage = this.property.gallery?.[0]?.secure_url;
      if (galleryImage) return galleryImage;
    }

    // ===== Property Details =====
    if (this.isPropertyDetails(this.property)) {
      return this.property.main_image || '';
    }

    // ===== Simple Property =====
    if (this.isProperty(this.property)) {
      return this.property.image || '';
    }

    // ===== fallback =====
    return '';
  }

  get isManaged(): boolean {
    if (this.isProperty(this.property)) {
      return this.property.isManaged || false;
    }
    return false;
  }

  get verified(): boolean {
    // دعم isTrusted من API الجديد
    if ('isTrusted' in this.property && typeof this.property.isTrusted === 'boolean') {
      return this.property.isTrusted;
    }
    if (this.isPropertyDetails(this.property)) {
      return this.property.verified || false;
    }
    if (this.isProperty(this.property)) {
      return this.property.isVerified || false;
    }
    return false;
  }

  get propertyType(): string {
    if (this.isApiProperty(this.property)) {
      return this.property.type || '';
    }
    if (this.isPropertyDetails(this.property)) {
      return this.property.specs?.property_type || '';
    }
    if (this.isProperty(this.property)) {
      return this.property.type || '';
    }
    return '';
  }

  get title(): string {
    if (this.isApiProperty(this.property)) {
      // دعم title من API الجديد
      if ('title' in this.property && this.property.title) {
        return this.property.title;
      }
      // دعم name القديم
      return this.property.name || '';
    }
    if (this.isProperty(this.property)) {
      return this.property.title || '';
    }
    return '';
  }

  get location(): string {
    if (this.isApiProperty(this.property)) {
      const loc = this.property.location;
      return `${loc.area}, ${loc.city}`;
    }
    if (this.isPropertyDetails(this.property)) {
      const details = this.property.location;
      if (details && typeof details === 'object' && 'full' in details) {
        return details.full;
      }
    }
    if (this.isProperty(this.property)) {
      return this.property.location || '';
    }
    return '';
  }

  get bedrooms(): number {
    // دعم الحقول المباشرة من Unit API
    if ('bedrooms' in this.property && typeof this.property.bedrooms === 'number') {
      return this.property.bedrooms;
    }
    if (this.isPropertyDetails(this.property)) {
      return this.property.specs?.bedrooms || 0;
    }
    if (this.isProperty(this.property)) {
      return this.property.bedrooms || 0;
    }
    return 0;
  }

  get bathrooms(): number {
    // دعم الحقول المباشرة من Unit API
    if ('bathrooms' in this.property && typeof this.property.bathrooms === 'number') {
      return this.property.bathrooms;
    }
    if (this.isPropertyDetails(this.property)) {
      return this.property.specs?.bathrooms || 0;
    }
    if (this.isProperty(this.property)) {
      return this.property.bathrooms || 0;
    }
    return 0;
  }

  get floorsCount(): number {
    if (this.isApiProperty(this.property)) {
      return this.property.floorsCount || 0;
    }
    return 0;
  }

  get area(): string {
    // دعم الحقول المباشرة من Unit API
    if ('area' in this.property) {
      if (typeof this.property.area === 'number') {
        return `${this.property.area} sqm`;
      }
      if (typeof this.property.area === 'string') {
        return this.property.area;
      }
    }
    if (this.isPropertyDetails(this.property)) {
      if (this.property.specs?.area_sqm) {
        return `${this.property.specs.area_sqm} sqm`;
      }
    }
    if (this.isProperty(this.property)) {
      return this.property.area || '';
    }
    return '';
  }

  get price(): string {
    // دعم displayPrice من API الجديد
    if ('displayPrice' in this.property && typeof this.property.displayPrice === 'number') {
      const currency = 'currency' in this.property ? this.property.currency : 'EGP';
      return `${this.property.displayPrice.toLocaleString()} ${currency}`;
    }
    // دعم الحقول المباشرة من Unit API
    if ('price' in this.property && typeof this.property.price === 'string') {
      return this.property.price;
    }
    if (this.isPropertyDetails(this.property)) {
      if (this.property.price?.display) {
        return this.property.price.display;
      }
    }
    if (this.isProperty(this.property)) {
      return String(this.property.price);
    }
    return '';
  }

  get priceType(): 'total' | 'monthly' | 'daily' | undefined {
    // دعم الحقول المباشرة من Unit API
    if ('priceType' in this.property) {
      return this.property.priceType as 'total' | 'monthly' | 'daily' | undefined;
    }
    if (this.isProperty(this.property)) {
      return this.property.priceType;
    }
    return undefined;
  }

  get views(): number {
    if (this.isPropertyDetails(this.property)) {
      return this.property.views || 0;
    }
    return 0;
  }

  get rating(): number | undefined {
    // دعم rating من API الجديد
    if ('rating' in this.property && typeof this.property.rating === 'number') {
      return this.property.rating;
    }
    if (this.isProperty(this.property)) {
      return this.property.rating;
    }
    return undefined;
  }

  get reviews(): number | undefined {
    if (this.isProperty(this.property)) {
      return this.property.reviews;
    }
    return undefined;
  }

  get isFeatured(): boolean {
    if (this.isApiProperty(this.property)) {
      return this.property.isFeatured || false;
    }
    return false;
  }

  get facilitiesAndServices(): string[] {
    if (this.isApiProperty(this.property)) {
      return this.property.facilitiesAndServices || [];
    }
    return [];
  }

  get furnished(): boolean {
    // دعم furnished من API الجديد
    if ('furnished' in this.property && typeof this.property.furnished === 'boolean') {
      return this.property.furnished;
    }
    return false;
  }

  get propertyId(): string {
    if (this.isApiProperty(this.property)) {
      return this.property._id || '';
    }
    if (this.isProperty(this.property)) {
      return String(this.property.id || '');
    }
    if (this.isPropertyDetails(this.property)) {
      return String(this.property.id || '');
    }
    return '';
  }

  onClick() {
    this.propertyClick.emit(this.property);
  }
}
