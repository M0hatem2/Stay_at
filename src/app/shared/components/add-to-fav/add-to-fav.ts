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

    console.log('❤️ Favorite button clicked for item:', this.itemId);
    const isAuth = this.authService.isAuthenticated();
    console.log('🔍 Is authenticated?', isAuth);

    if (!isAuth) {
      console.log('⚠️ User not authenticated - showing login popup');
      this.showLoginPopup = true;
      return;
    }

    console.log('✅ User authenticated - toggling favorite');
    this.toggleFavorite();
  }

  private toggleFavorite(): void {
    if (this.isLoading) return;

    console.log('🔄 Toggling favorite for item:', this.itemId);
    this.isLoading = true;
    const endpoint = '/favorites';
    const body = { item: this.itemId };

    console.log('📤 Sending POST request to:', endpoint, 'with body:', body);

    this.apiService.post(endpoint, body).subscribe({
      next: (response) => {
        console.log('✅ Favorite toggled successfully:', response);
        this.isFavorite = !this.isFavorite;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error toggling favorite:', error);
        this.isLoading = false;
      },
    });
  }

  closeLoginPopup(): void {
    this.showLoginPopup = false;
  }
}
