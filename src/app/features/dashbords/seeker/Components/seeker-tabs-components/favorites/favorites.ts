import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiProperty } from '../../../../../../core/models/api-property.model';
import { PropertyCardData, UnitsCard } from '../../../../../../shared/components/units-card/units-card';
import {
  SeekerFavoriteItem,
  SeekerFavoritesService,
} from '../../../services/seeker-favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, UnitsCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites implements OnInit {
  favoriteProperties: ApiProperty[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private seekerFavoritesService: SeekerFavoritesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.seekerFavoritesService.getFavorites().subscribe({
      next: (response) => {
        this.favoriteProperties = (response.data || []).map((item) =>
          this.mapFavoriteToApiProperty(item),
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading seeker favorites:', error);
        this.errorMessage = 'Failed to load favorites';
        this.favoriteProperties = [];
        this.isLoading = false;
      },
    });
  }

  onPropertyClick(property: PropertyCardData): void {
    if ('targetId' in property && 'targetType' in property) {
      const apiProperty = property as ApiProperty;
      const targetId = apiProperty.targetId;
      const targetType = apiProperty.targetType;

      if ((targetType === 'property' || targetType === 'project') && targetId) {
        this.router.navigate(['/property', targetId], { state: { property } });
        return;
      }

      if (targetType === 'unit' && targetId) {
        const purpose = apiProperty.purpose;
        const priceType = apiProperty.priceType;

        if (purpose === 'sale_and_rent') {
          if (priceType === 'daily' || priceType === 'monthly') {
            this.router.navigate(['/rent', targetId], { state: { property } });
            return;
          }

          this.router.navigate(['/buy', targetId], { state: { property } });
          return;
        }

        if (purpose === 'rent') {
          this.router.navigate(['/rent', targetId], { state: { property } });
          return;
        }

        this.router.navigate(['/buy', targetId], { state: { property } });
        return;
      }
    }

    const id =
      '_id' in property && property._id
        ? property._id
        : 'id' in property && property.id != null
          ? String(property.id)
          : '';

    this.router.navigate(['/property', id], { state: { property } });
  }

  trackByPropertyId(_: number, property: ApiProperty): string {
    return property._id;
  }

  private mapFavoriteToApiProperty(item: SeekerFavoriteItem): ApiProperty {
    const targetType = this.mapTargetType(item.type);
    const purpose = this.mapPurpose(item.priceType);
    const priceType = this.mapCardPriceType(item.priceType);

    return {
      _id: item.itemId,
      targetId: item.itemId,
      targetType,
      slug: item.slug || item.itemId,
      type: item.type || 'Property',
      title: item.title,
      isFeatured: !!item.isFeatured,
      isTrusted: !!item.isTrusted,
      displayPrice: item.price,
      currency: item.currency || 'EGP',
      purpose,
      priceType,
      location: {
        country: 'Egypt',
        city: 'Egypt',
        area: item.location || 'Unknown',
        address: item.location || '',
        coordinates: {
          type: 'Point',
          coordinates: [0, 0],
        },
      },
      thumbnail: {
        secure_url: item.image,
      },
    };
  }

  private mapTargetType(type: string): 'unit' | 'project' | 'property' {
    const normalizedType = (type || '').trim().toLowerCase();

    if (normalizedType === 'unit') return 'unit';
    if (normalizedType === 'project') return 'project';

    return 'property';
  }

  private mapPurpose(priceType: string): 'sale' | 'rent' | 'sale_and_rent' {
    const normalizedPriceType = (priceType || '').trim().toLowerCase();

    if (normalizedPriceType === 'sale') return 'sale';
    if (normalizedPriceType === 'sale_and_rent') return 'sale_and_rent';

    return 'rent';
  }

  private mapCardPriceType(priceType: string): 'total' | 'monthly' | 'daily' {
    const normalizedPriceType = (priceType || '').trim().toLowerCase();

    if (normalizedPriceType === 'sale') return 'total';
    if (normalizedPriceType === 'daily') return 'daily';

    return 'monthly';
  }
}
