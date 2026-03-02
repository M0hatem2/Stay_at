import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UnitsCard, PropertyCardData } from '../../../../shared/components/units-card/units-card';
import { ApiProperty, PaginationInfo } from '../../../../core/models/api-property.model';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { PropertyService } from '../../services/property.service';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-all-properties',
  imports: [CommonModule, UnitsCard],
  templateUrl: './all-properties.html',
  standalone: true,
  styleUrl: './all-properties.scss',
})
export class AllProperties implements OnInit, OnDestroy {
  /* ===============================
   UI State
  =============================== */
  isFilterSidebarOpen = true;
  viewMode: 'grid' | 'map' = 'grid';
  sortBy = 'recommended';
  showFilters = false;
  isLoading = false;
  errorMessage = '';
  searchQuery = '';

  /* ===============================
   Data
  =============================== */
  properties: ApiProperty[] = [];
  paginationInfo: PaginationInfo | null = null;
  totalResults = 0;
  currentPage = 1;
  itemsPerPage = 10;
  private languageSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    // Listen to query params for search
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
      this.loadProperties();
    });

    // الاشتراك في تغييرات اللغة لإعادة تحميل البيانات
    this.languageSubscription = this.languageService.currentLanguage$
      .pipe(skip(1))
      .subscribe(() => {
        this.loadProperties(this.currentPage);
      });
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  loadProperties(page: number = 1): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.currentPage = page;

    this.propertyService.getProperties(page, this.itemsPerPage, this.searchQuery).subscribe({
      next: (response) => {
        console.log('📦 Properties Response:', response);
        console.log('🔍 Search Query:', this.searchQuery);
        console.log('📊 Data:', response.results.data);

        this.properties = response.results.data as unknown as ApiProperty[];
        this.paginationInfo = {
          data: response.results.data as unknown as ApiProperty[],
          pages: response.results.pages,
          currentPage:
            typeof response.results.currentPage === 'string'
              ? parseInt(response.results.currentPage)
              : response.results.currentPage,
          totalItems: response.results.totalItems,
          itemsPerPage: response.results.itemsPerPage,
          nextPage: response.results.nextPage,
          previousPage: response.results.previousPage,
        };
        this.totalResults = response.results.totalItems;
        this.isLoading = false;

        console.log('✅ Properties loaded:', this.properties.length);
      },
      error: (error) => {
        console.error('❌ Error loading properties:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل العقارات';
        this.isLoading = false;
      },
    });
  }

  loadMore(): void {
    if (this.paginationInfo?.nextPage) {
      this.loadProperties(this.paginationInfo.nextPage);
    }
  }

  toggleFilterSidebar(): void {
    this.isFilterSidebarOpen = !this.isFilterSidebarOpen;
  }

  changeView(mode: 'grid' | 'map'): void {
    this.viewMode = mode;
  }

  changeSort(value: string): void {
    this.sortBy = value;
    console.log('Sorting by:', value);
  }

  applyFilters(): void {
    console.log('Filters applied');
    this.loadProperties(1);
  }

  resetFilters(): void {
    console.log('Filters reset');
    this.loadProperties(1);
  }

  viewPropertyDetails(property: ApiProperty): void {
    console.log('Property details:', property);
  }

  onPropertyClick(property: PropertyCardData): void {
    console.log('🔍 Property clicked:', property);

    // Check if this is a search result with targetId and targetType
    if ('targetId' in property && 'targetType' in property) {
      const apiProperty = property as ApiProperty;
      const targetId = apiProperty.targetId;
      const targetType = apiProperty.targetType;

      console.log('📍 Target ID:', targetId);
      console.log('📍 Target Type:', targetType);

      // Navigate based on targetType
      if (targetType === 'property' || targetType === 'project') {
        // Navigate to property details
        this.router.navigate(['/property', targetId], {
          state: { property: property },
        });
      } else if (targetType === 'unit') {
        // Check priceType to determine if it's rent or sale
        const priceType = apiProperty.priceType;
        const purpose = apiProperty.purpose;

        console.log('💰 Price Type:', priceType);
        console.log('🎯 Purpose:', purpose);

        // Determine route based on purpose and priceType
        if (purpose === 'sale_and_rent') {
          // Check priceType to decide
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
      // Fallback to old behavior
      const id = '_id' in property ? property._id : property.id;
      this.router.navigate(['/property', id], {
        state: { property: property },
      });
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
