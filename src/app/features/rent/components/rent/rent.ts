import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faGrip, faMap, faSliders } from '@fortawesome/free-solid-svg-icons';
import { UnitsCard, PropertyCardData } from '../../../../shared/components/units-card/units-card';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { UnitService, UnitFilters } from '../../services/unit.service';
import { LanguageService } from '../../../../core/services/language.service';
import { ApiProperty } from '../../../../core/models/api-property.model';

@Component({
  selector: 'app-rent',
  imports: [CommonModule, FormsModule, FontAwesomeModule, UnitsCard, RouterModule],
  templateUrl: './rent.html',
  styleUrl: './rent.scss',
})
export class Rent implements OnInit, OnDestroy {
  faChevronDown = faChevronDown;
  faGrip = faGrip;
  faMap = faMap;
  faSliders = faSliders;

  showFilters = false;
  isLoading = false;
  errorMessage = '';

  units: ApiProperty[] = [];
  totalResults = 0;
  currentPage = 1;
  itemsPerPage = 10;

  // Filters
  filters: UnitFilters = {
    purpose: 'rent',
    page: 1,
    limit: 10,
  };

  // Filter form values
  filterForm = {
    priceFrom: null as number | null,
    priceTo: null as number | null,
    unitType: [] as string[],
    bedrooms: null as number | null,
    bathrooms: null as number | null,
    furnished: null as boolean | null,
    isVerified: null as boolean | null,
    rentPeriod: [] as string[],
  };

  private languageSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private unitService: UnitService,
    private languageService: LanguageService,
  ) {}

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

    this.unitService.getUnits(this.filters).subscribe({
      next: (response) => {
        console.log('🏠 Units Response:', response);
        console.log('🏠 Units Data Sample:', response.results.data[0]);

        // البيانات تأتي بشكل ApiProperty مباشرة من الـ API
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

  applyFilters(newFilters: Partial<UnitFilters>): void {
    this.filters = { ...this.filters, ...newFilters, page: 1 };
    this.loadUnits();
  }

  onApplyFilters(): void {
    const newFilters: Partial<UnitFilters> = {
      page: 1,
    };

    if (this.filterForm.priceFrom) {
      newFilters.priceFrom = this.filterForm.priceFrom;
    }
    if (this.filterForm.priceTo) {
      newFilters.priceTo = this.filterForm.priceTo;
    }
    if (this.filterForm.bedrooms) {
      newFilters.bedrooms = this.filterForm.bedrooms;
    }
    if (this.filterForm.bathrooms) {
      newFilters.bathrooms = this.filterForm.bathrooms;
    }
    if (this.filterForm.furnished !== null) {
      newFilters.furnished = this.filterForm.furnished;
    }
    if (this.filterForm.isVerified !== null) {
      newFilters.isVerified = this.filterForm.isVerified;
    }
    // إضافة فلتر نوع الوحدة
    if (this.filterForm.unitType.length > 0) {
      newFilters.unitType = this.filterForm.unitType.join(',');
    }
    // إضافة فلتر فترة الإيجار
    if (this.filterForm.rentPeriod.length > 0) {
      newFilters.rentPeriod = this.filterForm.rentPeriod.join(',');
    }

    this.applyFilters(newFilters);
  }

  onResetFilters(): void {
    this.filterForm = {
      priceFrom: null,
      priceTo: null,
      unitType: [],
      bedrooms: null,
      bathrooms: null,
      furnished: null,
      isVerified: null,
      rentPeriod: [],
    };

    this.filters = {
      purpose: 'rent',
      page: 1,
      limit: 10,
    };

    this.loadUnits();
  }

  onUnitTypeChange(unitType: string, checked: boolean): void {
    if (checked) {
      if (!this.filterForm.unitType.includes(unitType)) {
        this.filterForm.unitType.push(unitType);
      }
    } else {
      this.filterForm.unitType = this.filterForm.unitType.filter((type) => type !== unitType);
    }
  }

  onRentPeriodChange(period: string, checked: boolean): void {
    if (checked) {
      if (!this.filterForm.rentPeriod.includes(period)) {
        this.filterForm.rentPeriod.push(period);
      }
    } else {
      this.filterForm.rentPeriod = this.filterForm.rentPeriod.filter((p) => p !== period);
    }
  }

  onUnitTypeCheckboxChange(event: Event, unitType: string): void {
    const target = event.target as HTMLInputElement;
    this.onUnitTypeChange(unitType, target.checked);
  }

  onRentPeriodCheckboxChange(event: Event, period: string): void {
    const target = event.target as HTMLInputElement;
    this.onRentPeriodChange(period, target.checked);
  }

  onBedroomsChange(bedrooms: number): void {
    this.filterForm.bedrooms = this.filterForm.bedrooms === bedrooms ? null : bedrooms;
  }

  onBathroomsChange(bathrooms: number): void {
    this.filterForm.bathrooms = this.filterForm.bathrooms === bathrooms ? null : bathrooms;
  }

  loadMore(): void {
    if (this.currentPage * this.itemsPerPage < this.totalResults && !this.isLoading) {
      this.filters.page = (this.filters.page || 1) + 1;
      this.loadUnits(true); // true = append results
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  viewPropertyDetails(property: PropertyCardData) {
    // Check if this is an ApiProperty with targetType and targetId
    if ('targetType' in property && 'targetId' in property) {
      const apiProp = property as ApiProperty;

      if (apiProp.targetType === 'unit' && apiProp.targetId) {
        // Check the purpose and priceType to determine the correct route
        const purpose = apiProp.purpose || 'rent';
        const priceType = apiProp.priceType || 'daily';

        // If purpose is sale_and_rent, check priceType
        if (purpose === 'sale_and_rent') {
          // If priceType is daily or monthly, it's for rent
          if (priceType === 'daily' || priceType === 'monthly') {
            this.router.navigate(['/rent', apiProp.targetId]);
            return;
          }
          // Otherwise (total), it's for sale
          this.router.navigate(['/rent', apiProp.targetId]);
          return;
        }

        // If purpose is rent, go to rent
        if (purpose === 'rent') {
          this.router.navigate(['/rent', apiProp.targetId]);
          return;
        }

        // If purpose is sale, go to buy
        if (purpose === 'sale') {
          this.router.navigate(['/buy', apiProp.targetId]);
          return;
        }

        // Default to rent
        this.router.navigate(['/rent', apiProp.targetId]);
        return;
      } else if (apiProp.targetType === 'project' && apiProp.targetId) {
        // Navigate to project details
        this.router.navigate(['/projects', apiProp.targetId]);
        return;
      }
    }

    // Fallback to _id or slug
    const id =
      '_id' in property
        ? property._id
        : 'slug' in property && property.slug
          ? property.slug
          : 'id' in property && property.id != null
            ? String(property.id)
            : 'details';

    this.router.navigate(['/rent', id]);
  }
}
