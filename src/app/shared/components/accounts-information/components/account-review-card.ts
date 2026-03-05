import { Component, Input } from '@angular/core';
import { AccountReview } from './accounts-information.models';

@Component({
  selector: 'app-account-review-card',
  standalone: true,
  template: `
    <div class="pb-6 border-b border-gray-200 last:border-0">
      <div class="flex items-start gap-4">
        <img [src]="review.avatarUrl" [alt]="review.name" class="w-12 h-12 rounded-full object-cover" />
        <div class="flex-1">
          <div class="flex items-start justify-between mb-2">
            <div>
              <div class="text-gray-900">{{ review.name }}</div>
              <div class="text-sm text-gray-500">{{ review.timeAgo }}</div>
            </div>
            <div class="flex items-center gap-1">
              @for (star of ratingStars; track star) {
                <i
                  class="fas fa-star text-sm"
                  [class.text-yellow-400]="star <= review.rating"
                  [class.text-gray-300]="star > review.rating"
                ></i>
              }
            </div>
          </div>
          <p class="text-gray-600 mb-2 leading-relaxed">{{ review.comment }}</p>
          <div class="text-sm text-gray-500 flex items-center gap-1">
            <i class="fas fa-building"></i>
            {{ review.propertyName }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccountReviewCardComponent {
  @Input({ required: true }) review!: AccountReview;

  readonly ratingStars = [1, 2, 3, 4, 5];
}
