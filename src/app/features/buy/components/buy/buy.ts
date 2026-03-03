import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitsCard, PropertyCardData } from '../../../../shared/components/units-card/units-card';
import { UnitService, UnitFilters } from '../../../rent/services/unit.service';
import { ApiProperty } from '../../../../core/models/api-property.model';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-buy',
  imports: [CommonModule, FormsModule, UnitsCard],
  templateUrl: './buy.html',
  styleUrl: './buy.scss',
})
export class Buy implements OnInit, OnDestroy {
  showFilters = false;
  sortOption: 'recommended' | 'price-low' | 'price-high' | 'newest' | 'area' = 'recommended';
  isLoading = false;
  errorMessage = '';
  units: ApiProperty[] = [];
  totalResults = 0;
  currentPage = 1;
  itemsPerPage = 10;

  // API Filters
  apiFilters: UnitFilters = {
    purpose: 'sale',
    page: 1,
    limit: 10,
  };

  // UI Filters (for future implementation)
  filters: {
    type: string;
    minBedrooms: number | null;
    minBathrooms: number | null;
    managed: boolean;
    verified: boolean;
    priceMin: number | null;
    priceMax: number | null;
    areaMin: number | null;
    areaMax: number | null;
  } = {
    type: '',
    minBedrooms: null,
    minBathrooms: null,
    managed: false,
    verified: false,
    priceMin: null,
    priceMax: null,
    areaMin: null,
    areaMax: null,
  };

  private languageSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private unitService: UnitService,
    private languageService: LanguageService,
  ) {}

  get displayedProperties(): ApiProperty[] {
    return this.units;
  }

  ngOnInit(): void {
    this.loadUnits();

    // الاشتراك في تغييرات اللغة لإعادة تحميل البيانات
    this.languageSubscription = this.languageService.currentLanguage$
      .pipe(skip(1))
      .subscribe(() => {
        this.loadUnits();
      });
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }

  loadUnits(append: boolean = false): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.unitService.getUnits(this.apiFilters).subscribe({
      next: (response) => {
 
        if (append) {
          this.units = [...this.units, ...(response.results.data as unknown as ApiProperty[])];
        } else {
          this.units = response.results.data as unknown as ApiProperty[];
        }

        this.totalResults = response.results.totalItems;
        this.currentPage =
          typeof response.results.currentPage === 'string'
            ? parseInt(response.results.currentPage)
            : response.results.currentPage;
        this.itemsPerPage = response.results.itemsPerPage;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading units:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل الوحدات';
        this.isLoading = false;
      },
    });
  }

  loadMore(): void {
    if (this.currentPage * this.itemsPerPage < this.totalResults && !this.isLoading) {
      this.apiFilters.page = (this.apiFilters.page || 1) + 1;
      this.loadUnits(true);
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onSortChange(value: string): void {
    this.sortOption = value as any;
    // TODO: Implement API-based sorting
   }

  clearFilters(): void {
    this.filters = {
      type: '',
      minBedrooms: null,
      minBathrooms: null,
      managed: false,
      verified: false,
      priceMin: null,
      priceMax: null,
      areaMin: null,
      areaMax: null,
    };
    // Reset API filters
    this.apiFilters = {
      purpose: 'sale',
      page: 1,
      limit: 10,
    };
    this.loadUnits();
  }

  applyFiltersAndSort(): void {
    // TODO: Convert UI filters to API filters and reload
     this.loadUnits();
  }

  onPropertyClick(property: PropertyCardData): void {
    // Check if this is an ApiProperty with targetType and targetId
    if ('targetType' in property && 'targetId' in property) {
      const apiProp = property as ApiProperty;

      if (apiProp.targetType === 'unit' && apiProp.targetId) {
        // Check the purpose and priceType to determine the correct route
        const purpose = apiProp.purpose || 'sale';
        const priceType = apiProp.priceType || 'total';

        // If purpose is sale_and_rent, check priceType
        if (purpose === 'sale_and_rent') {
          // If priceType is daily or monthly, it's for rent
          if (priceType === 'daily' || priceType === 'monthly') {
            this.router.navigate(['/buy', apiProp.targetId]);
            return;
          }
          // Otherwise (total), it's for sale
          this.router.navigate(['/buy', apiProp.targetId]);
          return;
        }

        // If purpose is sale, go to buy
        if (purpose === 'sale') {
          this.router.navigate(['/buy', apiProp.targetId]);
          return;
        }

        // If purpose is rent, go to rent
        if (purpose === 'rent') {
          this.router.navigate(['/rent', apiProp.targetId]);
          return;
        }

        // Default to buy
        this.router.navigate(['/buy', apiProp.targetId]);
        return;
      } else if (apiProp.targetType === 'project' && apiProp.targetId) {
        // Navigate to project details
        this.router.navigate(['/projects', apiProp.targetId]);
        return;
      }
    }

    // Fallback for old data structure
    const id =
      'slug' in property && property.slug
        ? property.slug
        : '_id' in property
          ? property._id
          : 'id' in property
            ? String(property.id)
            : 'details';

    this.router.navigate(['/buy', id]);
  }
}
