import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { NotLoggedInComponent } from '../not-logged-in/not-logged-in';

@Component({
  selector: 'app-add-to-fav',
  imports: [CommonModule, NotLoggedInComponent],
  templateUrl: './add-to-fav.html',
  styleUrl: './add-to-fav.scss',
})
export class AddToFav {
  @Input() itemId!: string;

  showLoginPopup = false;
  isFavorite = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
  ) {}

  onFavoriteClick(event: Event): void {
    event.stopPropagation();

    if (!this.authService.isAuthenticated()) {
      this.showLoginPopup = true;
      return;
    }

    this.toggleFavorite();
  }

  private toggleFavorite(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    const endpoint = '/favorites';
    const body = { item: this.itemId };

    this.apiService.post(endpoint, body).subscribe({
      next: (response) => {
        this.isFavorite = !this.isFavorite;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error toggling favorite:', error);
        this.isLoading = false;
      },
    });
  }

  closeLoginPopup(): void {
    this.showLoginPopup = false;
  }
}
