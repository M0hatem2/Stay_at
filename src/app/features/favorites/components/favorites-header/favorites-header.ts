import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-header.html',
  styleUrl: './favorites-header.scss',
})
export class FavoritesHeaderComponent {
  @Input() totalFavorites: number = 0;
  @Input() totalUnits: number = 0;
  @Input() totalProjects: number = 0;
}
