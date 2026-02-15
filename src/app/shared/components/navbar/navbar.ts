import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RegisterPopComponent } from '../../../features/auth/components/register-pop/register-pop';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';
 
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RegisterPopComponent, RouterLinkActive],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  showMobileMenu = false;
  showRegisterPopup = false;
  currentLanguage: string = 'ar';

  constructor(
    private host: ElementRef,
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService
   ) {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
   }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get dashboardRoute(): string {
    const role = this.authService.getRole();
    switch (role) {
      case 'system_admin':
        return '/dashboard/owner';
      case 'broker':
        return '/dashboard/broker';
      case 'developer':
        return '/dashboard/developer';
      case 'seeker':
        return '/dashboard/seeker';
      case 'owner':
        return '/dashboard/owner';
      default:
        return '/home';
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearTokens();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        this.authService.clearTokens();
        this.router.navigate(['/']);
      },
    });
  }

  toggleMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMenu(): void {
    this.showMobileMenu = false;
  }

  get ariaExpanded(): string {
    return this.showMobileMenu ? 'true' : 'false';
  }

  openRegisterPopup(): void {
    this.showRegisterPopup = true;
  }

  closeRegisterPopup(): void {
    this.showRegisterPopup = false;
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  goToSignIn(): void {
    this.router.navigate(['/auth/sign-in']);
  }

  goToSignUp(): void {
    this.router.navigate(['/auth/sign-up']);
  }

  goToRegisterPop(): void {
    this.router.navigate(['/auth/register-pop']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!this.host.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  // removed ['$event'] because we don't need the event object here
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  toggleLanguage(): void {
    const newLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
    console.log('🔄 Navbar - toggleLanguage() from', this.currentLanguage, 'to', newLanguage);
    this.languageService.setLanguage(newLanguage);
  }

  get languageLabel(): string {
    return this.currentLanguage === 'ar' ? 'English' : 'عربي';
  }

  
}
