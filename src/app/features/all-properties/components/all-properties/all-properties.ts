import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  /* ===============================
   Data
  =============================== */
  properties: ApiProperty[] = [];
  paginationInfo: PaginationInfo | null = null;
  totalResults = 0;
  currentPage = 1;
  itemsPerPage = 10;
  private languageSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadProperties();
    
    // الاشتراك في تغييرات اللغة لإعادة تحميل البيانات
    this.languageSubscription = this.languageService.currentLanguage$
      .pipe(skip(1))
      .subscribe(() => {
        this.loadProperties(this.currentPage);
      });
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }

  loadProperties(page: number = 1): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.currentPage = page;

    this.propertyService.getProperties(page, this.itemsPerPage).subscribe({
      next: (response) => {
        console.log('📦 Properties Response:', response);
        console.log('🏠 Properties Data Sample:', response.properties.data[0]);
        console.log('🏷️ Property Name:', response.properties.data[0]?.name);
        console.log('📝 Property Description:', response.properties.data[0]?.description);
        console.log('🏢 Property Type:', response.properties.data[0]?.type);
        
        this.properties = response.properties.data as unknown as ApiProperty[];
        this.paginationInfo = {
          data: response.properties.data as unknown as ApiProperty[],
          pages: response.properties.pages,
          currentPage: response.properties.currentPage,
          totalItems: response.properties.totalItems,
          itemsPerPage: response.properties.itemsPerPage,
          nextPage: response.properties.nextPage,
          previousPage: response.properties.previousPage
        };
        this.totalResults = response.properties.totalItems;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading properties:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل العقارات';
        this.isLoading = false;
      }
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
    // التوجه إلى صفحة تفاصيل العقار مع تمرير بيانات العقار
    const id = '_id' in property ? property._id : property.id;
    this.router.navigate(['/property', id], {
      state: { property: property },
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
