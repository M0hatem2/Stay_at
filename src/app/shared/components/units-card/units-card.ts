import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetails } from '../../../core/models/property-details.model';
import { Property } from '../../../core/models/property.model';
import { ApiProperty } from '../../../core/models/api-property.model';

export type PropertyCardData = PropertyDetails | Property | ApiProperty;

@Component({
  selector: 'app-units-card',
  imports: [CommonModule],
  templateUrl: './units-card.html',
  styleUrl: './units-card.scss',
})
export class UnitsCard {
  @Input() property!: PropertyCardData;
  @Output() propertyClick = new EventEmitter<PropertyCardData>();

  private isApiProperty(prop: PropertyCardData): prop is ApiProperty {
    return '_id' in prop && 'gallery' in prop;
  }

  get image(): string {
    if (this.isApiProperty(this.property)) {
      return this.property.gallery?.[0]?.secure_url || '';
    }
    return (this.property as PropertyDetails).main_image || (this.property as Property).image;
  }

  get isManaged(): boolean {
    return (this.property as Property).isManaged || false;
  }

  get verified(): boolean {
    return (
      (this.property as PropertyDetails).verified || (this.property as Property).isVerified || false
    );
  }

  get propertyType(): string {
    if (this.isApiProperty(this.property)) {
      return this.property.type || '';
    }
    return (
      (this.property as PropertyDetails).specs?.property_type ||
      (this.property as Property).type ||
      ''
    );
  }

  get title(): string {
    if (this.isApiProperty(this.property)) {
      return this.property.name || '';
    }
    return (this.property as Property).title || '';
  }

  get location(): string {
    if (this.isApiProperty(this.property)) {
      const loc = this.property.location;
      return `${loc.area}, ${loc.city}`;
    }
    const details = (this.property as PropertyDetails).location;
    if (details && typeof details === 'object' && 'full' in details) {
      return details.full;
    }
    return (this.property as Property).location || '';
  }

  get bedrooms(): number {
    return (
      (this.property as PropertyDetails).specs?.bedrooms ||
      (this.property as Property).bedrooms ||
      0
    );
  }

  get bathrooms(): number {
    return (
      (this.property as PropertyDetails).specs?.bathrooms ||
      (this.property as Property).bathrooms ||
      0
    );
  }

  get floorsCount(): number {
    if (this.isApiProperty(this.property)) {
      return this.property.floorsCount || 0;
    }
    return 0;
  }

  get area(): string {
    const details = this.property as PropertyDetails;
    if (details.specs?.area_sqm) {
      return `${details.specs.area_sqm} sqm`;
    }
    return (this.property as Property).area || '';
  }

  get price(): string {
    const details = this.property as PropertyDetails;
    if (details.price?.display) {
      return details.price.display;
    }
    return String((this.property as Property).price);
  }

  get priceType(): 'monthly' | 'daily' | 'sale' | undefined {
    return (this.property as Property).priceType;
  }

  get views(): number {
    return (this.property as PropertyDetails).views || 0;
  }

  get rating(): number | undefined {
    return (this.property as Property).rating;
  }

  get reviews(): number | undefined {
    return (this.property as Property).reviews;
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

  onClick() {
    this.propertyClick.emit(this.property);
  }
}
