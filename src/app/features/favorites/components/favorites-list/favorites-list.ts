import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FavoriteItem {
  id: string;
  type: 'unit' | 'project';
  title: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  dateAdded: Date;
}

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.scss',
})
export class FavoritesListComponent {
  @Input() favorites: FavoriteItem[] = [];
  @Input() loading: boolean = false;

  @Output() removeFavorite = new EventEmitter<string>();
  @Output() viewDetails = new EventEmitter<FavoriteItem>();

  onRemoveFavorite(id: string) {
    this.removeFavorite.emit(id);
  }

  onViewDetails(item: FavoriteItem) {
    this.viewDetails.emit(item);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US').format(price);
  }
}
