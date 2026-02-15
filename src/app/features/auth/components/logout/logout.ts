import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.html',
  styleUrls: ['./logout.scss'],
})
export class LogoutComponent implements OnInit {
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Auto-logout on component initialization
    this.performLogout();
  }

  performLogout(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const refreshToken = this.authService.getRefreshToken();

    if (refreshToken) {
      // Call logout API to invalidate server-side session
      this.authService.logout().subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.successMessage = 'Successfully logged out!';
          this.authService.clearTokens();

          // Redirect to home page after a short delay
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Logout failed:', error);
          this.errorMessage =
            'Logout completed locally. Please clear your browser cache if needed.';
          this.authService.clearTokens();

          // Redirect to home page even if API call fails
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
      });
    } else {
      // No refresh token, just clear local storage and redirect
      this.isLoading = false;
      this.authService.clearTokens();
      this.successMessage = 'Successfully logged out!';

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }
  }

  // Manual logout button (in case auto-logout fails)
  manualLogout(): void {
    this.authService.clearTokens();
    this.router.navigate(['/']);
  }

  // Stay signed in (for cases where logout was triggered accidentally)
  staySignedIn(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/auth/sign-in']);
    }
  }

  // Navigate to refresh token
  goToRefreshToken(): void {
    this.router.navigate(['/auth/refresh-token']);
  }
}
