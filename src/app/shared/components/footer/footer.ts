import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { FooterService, FooterData } from '../../services/footer.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit, OnDestroy {
  footerData: FooterData | null = null;
  isLoading = false;
  errorMessage = '';
  private languageSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private footerService: FooterService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadFooterData();
    
    // الاشتراك في تغييرات اللغة لإعادة تحميل البيانات
    this.languageSubscription = this.languageService.currentLanguage$
      .pipe(skip(1))
      .subscribe(() => {
        this.loadFooterData();
      });
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }

  loadFooterData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.footerService.getFooterData().subscribe({
      next: (response) => {
        console.log('🦶 Footer Response:', response);
        
        if (response.footer && response.footer.length > 0) {
          this.footerData = response.footer[0];
          console.log('🦶 Footer Data:', this.footerData);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading footer:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل بيانات الفوتر';
        this.isLoading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/auth/sign-up']);
  }

  goToRegisterPop() {
    this.router.navigate(['/auth/register-pop']);
  }

  getSocialIcon(iconName: string): string {
    const iconMap: { [key: string]: string } = {
      'facebook': 'fab fa-facebook-f',
      'twitter': 'fab fa-twitter',
      'instagram': 'fab fa-instagram',
      'linkedin': 'fab fa-linkedin-in',
      'youtube': 'fab fa-youtube',
      'tiktok': 'fab fa-tiktok',
      'whatsapp': 'fab fa-whatsapp',
      'telegram': 'fab fa-telegram-plane',
      'snapchat': 'fab fa-snapchat-ghost',
      'foo': 'fab fa-facebook-f' // fallback for 'foo' in API
    };
    
    return iconMap[iconName.toLowerCase()] || 'fas fa-link';
  }

  getQuickLinkIcon(linkTitle: string): string {
    const iconMap: { [key: string]: string } = {
      'home': 'fas fa-home',
      'rent': 'fas fa-key',
      'buy': 'fas fa-shopping-cart',
      'projects': 'fas fa-building',
      'about': 'fas fa-info-circle',
      'about us': 'fas fa-info-circle',
      'contact': 'fas fa-phone',
      'contact us': 'fas fa-phone',
      'services': 'fas fa-cogs',
      'properties': 'fas fa-home'
    };
    
    return iconMap[linkTitle.toLowerCase()] || 'fas fa-chevron-right';
  }

  getPolicyIcon(policyLabel: string): string {
    const iconMap: { [key: string]: string } = {
      'terms & conditions': 'fas fa-file-contract',
      'terms and conditions': 'fas fa-file-contract',
      'privacy policy': 'fas fa-shield-alt',
      'cookie policy': 'fas fa-cookie-bite',
      'refund policy': 'fas fa-undo-alt',
      'disclaimer': 'fas fa-exclamation-triangle'
    };
    
    return iconMap[policyLabel.toLowerCase()] || 'fas fa-file-alt';
  }
}
