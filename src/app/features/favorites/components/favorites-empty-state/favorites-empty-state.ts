import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-empty-state.html',
  styleUrl: './favorites-empty-state.scss',
})
export class FavoritesEmptyStateComponent {
  @Output() browseProperties = new EventEmitter<void>();

  onBrowseProperties() {
    this.browseProperties.emit();
  }
}
