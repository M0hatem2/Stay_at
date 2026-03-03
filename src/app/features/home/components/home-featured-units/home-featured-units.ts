import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UnitsCard, PropertyCardData } from '../../../../shared/components/units-card/units-card';
import { AddToFav } from '../../../../shared/components/add-to-fav/add-to-fav';
import { ApiProperty } from '../../../../core/models/api-property.model';
import { ApiService } from '../../../../core/services/api.service';
import { Subscription } from 'rxjs';

interface FeaturedUnitsResponse {
  message: string;
  results: {
    data: ApiProperty[];
    pages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}

@Component({
  selector: 'app-home-featured-units',
  templateUrl: './home-featured-units.html',
  styleUrl: './home-featured-units.scss',
  imports: [CommonModule, UnitsCard, AddToFav],
})
export class HomeFeaturedUnits implements OnInit, OnDestroy {
  properties: ApiProperty[] = [];
  isLoading = false;
  errorMessage = '';
  private subscription: Subscription | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadFeaturedUnits();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadFeaturedUnits(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.subscription = this.apiService
      .get<FeaturedUnitsResponse>('/public/search/units-and-properties?isFeatured=true')
      .subscribe({
        next: (response) => {
          console.log('✨ Featured Units Response:', response);
          this.properties = response.results.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Error loading featured units:', error);
          this.errorMessage = 'حدث خطأ أثناء تحميل الوحدات المميزة';
          this.isLoading = false;
        },
      });
  }

  onPropertyClick(property: PropertyCardData): void {
    console.log('🔍 Property clicked:', property);

    if ('targetId' in property && 'targetType' in property) {
      const apiProperty = property as ApiProperty;
      const targetId = apiProperty.targetId;
      const targetType = apiProperty.targetType;

      if (targetType === 'property' || targetType === 'project') {
        this.router.navigate(['/property', targetId], {
          state: { property: property },
        });
      } else if (targetType === 'unit') {
        const priceType = apiProperty.priceType;
        const purpose = apiProperty.purpose;

        if (purpose === 'sale_and_rent') {
          if (priceType === 'daily' || priceType === 'monthly') {
            this.router.navigate(['/rent', targetId], {
              state: { property: property },
            });
          } else if (priceType === 'total') {
            this.router.navigate(['/buy', targetId], {
              state: { property: property },
            });
          }
        } else if (purpose === 'rent') {
          this.router.navigate(['/rent', targetId], {
            state: { property: property },
          });
        } else if (purpose === 'sale') {
          this.router.navigate(['/buy', targetId], {
            state: { property: property },
          });
        }
      }
    } else {
      const id = '_id' in property ? property._id : 'id' in property ? property.id : '';
      this.router.navigate(['/property', id], {
        state: { property: property },
      });
    }
  }

  viewAllProperties(): void {
    this.router.navigate(['/properties']);
  }
}
