import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FavoritesHeaderComponent,
  FavoritesFilterComponent,
  FavoritesEmptyStateComponent,
  FavoritesListComponent,
  FilterType,
  SortType,
  FavoriteItem,
} from './components';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    FavoritesHeaderComponent,
    FavoritesFilterComponent,
    FavoritesEmptyStateComponent,
    FavoritesListComponent,
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  // State
  favorites = signal<FavoriteItem[]>([]);
  loading = signal<boolean>(false);
  activeFilter = signal<FilterType>('all');
  sortBy = signal<SortType>('recent');

  // Computed values
  totalFavorites = signal<number>(0);
  totalUnits = signal<number>(0);
  totalProjects = signal<number>(0);

  constructor() {
    // Initialize with mock data or load from service
    this.loadFavorites();
  }

  private loadFavorites() {
    // Mock data for testing - replace with actual service call
    const mockFavorites: FavoriteItem[] = [
      {
        id: '1',
        type: 'unit',
        title: 'Luxury Apartment in New Cairo',
        location: 'New Cairo, Cairo',
        price: 2500000,
        currency: 'EGP',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        dateAdded: new Date('2024-01-15'),
      },
      {
        id: '2',
        type: 'project',
        title: 'Green Valley Compound',
        location: 'Sheikh Zayed, Giza',
        price: 1800000,
        currency: 'EGP',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        dateAdded: new Date('2024-01-10'),
      },
      {
        id: '3',
        type: 'unit',
        title: 'Modern Villa with Garden',
        location: 'Maadi, Cairo',
        price: 4200000,
        currency: 'EGP',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
        bedrooms: 4,
        bathrooms: 3,
        area: 300,
        dateAdded: new Date('2024-01-05'),
      },
    ];

    this.favorites.set(mockFavorites);
    this.updateCounts();
  }

  private updateCounts() {
    const favs = this.favorites();
    this.totalFavorites.set(favs.length);
    this.totalUnits.set(favs.filter((f) => f.type === 'unit').length);
    this.totalProjects.set(favs.filter((f) => f.type === 'project').length);
  }

  onFilterChange(filter: FilterType) {
    this.activeFilter.set(filter);
  }

  onSortChange(sort: SortType) {
    this.sortBy.set(sort);
  }

  onRemoveFavorite(id: string) {
    const updatedFavorites = this.favorites().filter((f) => f.id !== id);
    this.favorites.set(updatedFavorites);
    this.updateCounts();
  }

  onViewDetails(item: FavoriteItem) {
    // Navigate to property details
   }

  onBrowseProperties() {
    // Navigate to properties page
   }

  get filteredFavorites(): FavoriteItem[] {
    let filtered = this.favorites();

    // Apply filter
    const filter = this.activeFilter();
    if (filter !== 'all') {
      filtered = filtered.filter((f) => f.type === (filter.slice(0, -1) as 'unit' | 'project'));
    }

    // Apply sort
    const sort = this.sortBy();
    filtered.sort((a, b) => {
      switch (sort) {
        case 'recent':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }
}
