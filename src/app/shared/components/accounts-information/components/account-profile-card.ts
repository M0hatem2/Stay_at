import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccountProfile, AccountStat } from './accounts-information.models';
import { AccountStatCardComponent } from './account-stat-card';

@Component({
  selector: 'app-account-profile-card',
  standalone: true,
  imports: [CommonModule, AccountStatCardComponent],
  template: `
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="h-32 bg-gradient-to-r from-black to-gray-900 relative">
        <div
          class="absolute bottom-0 right-0 left-0 h-16 bg-gradient-to-t from-black/50 to-transparent"
        ></div>
      </div>

      <div class="px-8 pb-8">
        <div class="flex items-start gap-6 -mt-16 mb-6">
          <div class="relative">
            <div class="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
              <img [src]="profile.avatarUrl" [alt]="profile.name" class="w-full h-full object-cover" />
            </div>
            <div
              class="absolute -bottom-2 -right-2 w-10 h-10 bg-[#C4A962] rounded-full flex items-center justify-center border-4 border-white shadow-lg"
            >
              <i class="fas fa-check text-white"></i>
            </div>
          </div>

          <div class="flex-1 pt-16">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h1 class="text-gray-900 mb-1 flex items-center gap-2">
                  {{ profile.name }}
                  <i class="fas fa-circle-check text-green-600 text-lg"></i>
                </h1>
                <p class="text-gray-600 mb-2">{{ profile.role }}</p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ profile.location }}
                  </span>
                  <span class="flex items-center gap-1">
                    <i class="fas fa-calendar-alt"></i>
                    Member since {{ profile.memberSince }}
                  </span>
                </div>
              </div>

              <button class="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" type="button">
                <i class="fas fa-share-alt text-gray-700"></i>
              </button>
            </div>

            <div class="flex items-center gap-3 mt-4">
              <div class="flex items-center gap-1">
                @for (star of ratingStars; track star) {
                  <i
                    class="fas fa-star"
                    [class.text-yellow-400]="star <= roundedRating"
                    [class.text-gray-300]="star > roundedRating"
                  ></i>
                }
                <span class="text-2xl text-gray-900 ml-1">{{ profile.rating }}</span>
              </div>
              <span class="text-gray-600">({{ profile.reviewsCount }} reviews)</span>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-gray-900 mb-3">About Me</h3>
          <p class="text-gray-600 leading-relaxed">{{ profile.bio }}</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          @for (stat of stats; track stat.label) {
            <app-account-stat-card [stat]="stat"></app-account-stat-card>
          }
        </div>
      </div>
    </div>
  `,
})
export class AccountProfileCardComponent {
  @Input({ required: true }) profile!: AccountProfile;
  @Input() stats: AccountStat[] = [];

  readonly ratingStars = [1, 2, 3, 4, 5];

  get roundedRating(): number {
    return Math.round(this.profile?.rating ?? 0);
  }
}
