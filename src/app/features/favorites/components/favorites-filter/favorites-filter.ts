import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FilterType = 'all' | 'units' | 'projects';
export type SortType = 'recent' | 'price-low' | 'price-high';

@Component({
  selector: 'app-favorites-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-filter.html',
  styleUrl: './favorites-filter.scss',
})
export class FavoritesFilterComponent {
  @Input() totalFavorites: number = 0;
  @Input() totalUnits: number = 0;
  @Input() totalProjects: number = 0;
  @Input() activeFilter: FilterType = 'all';
  @Input() sortBy: SortType = 'recent';

  @Output() filterChange = new EventEmitter<FilterType>();
  @Output() sortChange = new EventEmitter<SortType>();

  onFilterChange(filter: FilterType) {
    this.filterChange.emit(filter);
  }

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.sortChange.emit(target.value as SortType);
  }
}
