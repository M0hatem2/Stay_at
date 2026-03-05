import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccountAchievementsSectionComponent } from './components/account-achievements-section';
import { AccountContactCardComponent } from './components/account-contact-card';
import { AccountGallerySectionComponent } from './components/account-gallery-section';
import { AccountProfileCardComponent } from './components/account-profile-card';
import { AccountReviewsSectionComponent } from './components/account-reviews-section';
import { AccountTrustSafetyCardComponent } from './components/account-trust-safety-card';
import {
  AccountBadgeItem,
  AccountProfile,
  AccountReview,
  AccountStat,
  GalleryCategory,
} from './components/accounts-information.models';

@Component({
  selector: 'app-accounts-information',
  standalone: true,
  imports: [
    AccountProfileCardComponent,
    AccountAchievementsSectionComponent,
    AccountGallerySectionComponent,
    AccountReviewsSectionComponent,
    AccountContactCardComponent,
    AccountTrustSafetyCardComponent,
  ],
  templateUrl: './accounts-information.html',
  styleUrl: './accounts-information.scss',
})
export class AccountsInformation implements OnInit, OnDestroy {
  isLoading = false;
  errorMessage = '';

  contactPhoneNumber = '';
  contactEmail = '';
  responseTime = 'Within 1 hour';

  private routeSub?: Subscription;

  readonly defaultProfile: AccountProfile = {
    name: 'Ahmed Mohamed El-Sayed',
    role: 'Certified Property Owner',
    location: 'Cairo, Egypt',
    memberSince: 'January 2020',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Professional property owner with over 5 years of experience in managing residential and commercial properties. I focus on transparency, fast communication, and reliable service for every guest.',
    rating: 4.9,
    reviewsCount: 127,
  };

  readonly defaultStats: AccountStat[] = [
    {
      label: 'Properties',
      value: '24',
      containerClass: 'bg-gradient-to-br from-[#C4A962]/10 to-[#D4B972]/10 border-[#C4A962]/20',
    },
    {
      label: 'Bookings',
      value: '342',
      containerClass: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
    },
    {
      label: 'Response Rate',
      value: '98%',
      containerClass: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200',
    },
    {
      label: 'Years of Experience',
      value: '5',
      containerClass: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200',
    },
  ];

  readonly defaultAchievements: AccountBadgeItem[] = [
    {
      title: 'Top Owner',
      description: 'Rated 5 stars by guests',
      iconClass: 'fas fa-award',
    },
    {
      title: 'Verified',
      description: 'All documents reviewed and approved',
      iconClass: 'fas fa-circle-check',
    },
    {
      title: 'Safety Guaranteed',
      description: 'All listed properties are insured',
      iconClass: 'fas fa-shield-alt',
    },
    {
      title: 'High Satisfaction',
      description: '98% positive guest feedback',
      iconClass: 'fas fa-chart-line',
    },
  ];

  profile: AccountProfile = { ...this.defaultProfile };
  stats: AccountStat[] = [...this.defaultStats];
  achievements: AccountBadgeItem[] = [...this.defaultAchievements];

  galleryCategories: GalleryCategory[] = [
    {
      title: 'Exterior Photos',
      iconClass: 'fas fa-building',
      photos: [
        {
          src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
          alt: 'Exterior view 1',
        },
        {
          src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
          alt: 'Exterior view 2',
        },
        {
          src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop',
          alt: 'Exterior view 3',
        },
      ],
    },
    {
      title: 'Interior Photos',
      iconClass: 'fas fa-couch',
      photos: [
        {
          src: 'https://images.unsplash.com/photo-1616594039964-3f8f7f8479b8?w=1200&h=800&fit=crop',
          alt: 'Living room',
        },
        {
          src: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&h=800&fit=crop',
          alt: 'Bedroom',
        },
        {
          src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&h=800&fit=crop',
          alt: 'Kitchen',
        },
      ],
    },
  ];

  reviews: AccountReview[] = [
    {
      name: 'Sara Mahmoud',
      timeAgo: '2 weeks ago',
      rating: 5,
      comment:
        'Best owner I have dealt with. Everything was exactly as described and communication was excellent.',
      propertyName: 'Furnished Apartment - Fifth Settlement',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    },
    {
      name: 'Ahmed Ramadan',
      timeAgo: '1 month ago',
      rating: 5,
      comment:
        'Excellent experience from booking to check-out. Very professional and helpful throughout the stay.',
      propertyName: 'Studio - Sheikh Zayed',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    },
    {
      name: 'Mona Khaled',
      timeAgo: '2 months ago',
      rating: 4,
      comment: 'Clean property, smooth process, and quick support whenever needed.',
      propertyName: 'Modern Apartment - New Cairo',
      avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    },
  ];

  trustChecks: string[] = [
    'Verified identity',
    'Valid property documents',
    'Real reviews from guests',
    '24/7 customer support',
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const role = params.get('role');
      const id = params.get('id');

      if (!role || !id) return;
      this.loadProfile(role, id);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private loadProfile(role: string, id: string): void {
    const endpoint = this.resolveEndpoint(role);

    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<any>(`${environment.api.baseUrl}/${endpoint}/${id}`).subscribe({
      next: (response) => {
        this.applyProfileResponse(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading account profile:', error);
        this.errorMessage = 'Unable to load the latest account data. Showing available details.';
        this.isLoading = false;
      },
    });
  }

  private resolveEndpoint(role: string): 'seeker' | 'developer' | 'owner' {
    const normalizedRole = role.toLowerCase();
    if (normalizedRole === 'seeker' || normalizedRole === 'property_seeker') return 'seeker';
    if (normalizedRole === 'developer' || normalizedRole === 'real_estate_developer') {
      return 'developer';
    }
    return 'owner';
  }

  private applyProfileResponse(response: any): void {
    const resProfile =
      response?.resProfile ||
      response?.developerProfile ||
      response?.ownerProfile ||
      response?.seekerProfile ||
      response?.profile ||
      response ||
      {};

    const firstName = (resProfile.firstName || '').trim();
    const lastName = (resProfile.lastName || '').trim();
    const fullName = `${firstName} ${lastName}`.trim();

    this.profile = {
      ...this.defaultProfile,
      name: fullName || resProfile.name || resProfile.companyName || this.defaultProfile.name,
      role: this.mapRoleLabel(resProfile.role),
      location: this.getLocationText(resProfile),
      memberSince: this.getMemberSince(resProfile),
      avatarUrl:
        resProfile.profileImage ||
        resProfile.avatar ||
        resProfile.photo ||
        this.defaultProfile.avatarUrl,
      bio:
        resProfile.bio ||
        resProfile.about ||
        resProfile.description ||
        resProfile.companyName ||
        this.defaultProfile.bio,
      rating: this.toNumber(resProfile.averageRating, this.defaultProfile.rating),
      reviewsCount: this.toNumber(resProfile.totalReviews, this.defaultProfile.reviewsCount),
    };

    this.contactPhoneNumber = resProfile.phoneNumber || this.contactPhoneNumber;
    this.contactEmail = resProfile.email || this.contactEmail;

    this.stats = this.buildStats(resProfile);
    this.achievements = this.buildAchievements(resProfile);
  }

  private mapRoleLabel(role: string | undefined): string {
    const normalized = (role || '').toLowerCase();
    if (normalized === 'real_estate_developer') return 'Real Estate Developer';
    if (normalized === 'property_owner') return 'Property Owner';
    if (normalized === 'property_seeker') return 'Property Seeker';
    return this.defaultProfile.role;
  }

  private getLocationText(profile: any): string {
    const area = profile.area || profile.city || '';
    const country = profile.country || 'Egypt';
    const location = [area, country].filter(Boolean).join(', ');
    return location || this.defaultProfile.location;
  }

  private getMemberSince(profile: any): string {
    if (profile.memberSince) return profile.memberSince;
    if (profile.establishedYear) return String(profile.establishedYear);
    if (profile.createdAt) {
      const date = new Date(profile.createdAt);
      if (!Number.isNaN(date.getTime())) return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }
    return this.defaultProfile.memberSince;
  }

  private buildStats(profile: any): AccountStat[] {
    const responseRate = this.toNumber(profile.responseRate, -1);
    const responseRateText =
      responseRate >= 0 ? `${Math.max(0, Math.min(100, responseRate))}%` : this.defaultStats[2].value;

    return [
      {
        ...this.defaultStats[0],
        value: this.toOptionalNumberText(
          profile.numberOfCompletedProjects || profile.propertiesCount || profile.listedCount,
          this.defaultStats[0].value,
        ),
      },
      {
        ...this.defaultStats[1],
        value: this.toOptionalNumberText(
          profile.totalReviews || profile.bookingsCount || profile.completedDeals,
          this.defaultStats[1].value,
        ),
      },
      {
        ...this.defaultStats[2],
        value: responseRateText,
      },
      {
        ...this.defaultStats[3],
        value: this.toOptionalNumberText(
          profile.establishedYear || profile.experienceYears,
          this.defaultStats[3].value,
        ),
      },
    ];
  }

  private buildAchievements(profile: any): AccountBadgeItem[] {
    const dynamicItems: AccountBadgeItem[] = [];

    if (profile.companyName) {
      dynamicItems.push({
        title: 'Company',
        description: profile.companyName,
        iconClass: 'fas fa-building',
      });
    }

    if (profile.commercialRegisterNumber) {
      dynamicItems.push({
        title: 'Commercial Registration',
        description: `No. ${profile.commercialRegisterNumber}`,
        iconClass: 'fas fa-file-signature',
      });
    }

    if (Array.isArray(profile.certificatesAndLicenses) && profile.certificatesAndLicenses.length) {
      dynamicItems.push({
        title: 'Certificates & Licenses',
        description: `${profile.certificatesAndLicenses.length} records`,
        iconClass: 'fas fa-certificate',
      });
    }

    if (Array.isArray(profile.achievementsAndAwards) && profile.achievementsAndAwards.length) {
      dynamicItems.push({
        title: 'Achievements & Awards',
        description: `${profile.achievementsAndAwards.length} records`,
        iconClass: 'fas fa-trophy',
      });
    }

    if (profile.isTrusted === true) {
      dynamicItems.push({
        title: 'Trusted Account',
        description: 'Verified by platform checks',
        iconClass: 'fas fa-shield-alt',
      });
    }

    const merged = [...dynamicItems, ...this.defaultAchievements];
    const uniqueByTitle = merged.filter(
      (item, index, self) => self.findIndex((candidate) => candidate.title === item.title) === index,
    );

    return uniqueByTitle.slice(0, 4);
  }

  private toNumber(value: any, fallback: number): number {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : fallback;
  }

  private toOptionalNumberText(value: any, fallback: string): string {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue.toString() : fallback;
  }
}
