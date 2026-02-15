import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-refresh-token',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refresh-token.html',
  styleUrls: ['./refresh-token.scss'],
})
export class RefreshTokenComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is authenticated before attempting to refresh
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return;
    }
  }

  refreshAccessToken(): void {
    const refreshToken = this.authService.getRefreshToken();

    if (!refreshToken) {
      this.errorMessage = 'No refresh token available. Please sign in again.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.refreshToken(refreshToken).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        if (response.accessToken) {
          this.authService.setAccessToken(response.accessToken);
          this.successMessage = 'Access token refreshed successfully!';

          // Redirect to dashboard after successful refresh
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        } else {
          this.errorMessage = 'Invalid response from server.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Token refresh failed:', error);

        // Clear tokens and redirect to sign in
        this.authService.clearTokens();
        this.errorMessage = 'Session expired. Please sign in again.';

        setTimeout(() => {
          this.router.navigate(['/auth/sign-in']);
        }, 3000);
      },
    });
  }

  // Navigate to sign in
  goToSignIn(): void {
    this.router.navigate(['/auth/sign-in']);
  }

  // Navigate to dashboard
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  // Navigate to logout
  goToLogout(): void {
    this.router.navigate(['/auth/logout']);
  }
}
