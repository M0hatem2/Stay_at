import { Component, Input } from '@angular/core';
import { AccountSectionCardComponent } from './account-section-card';
import { AccountReviewCardComponent } from './account-review-card';
import { AccountReview } from './accounts-information.models';

@Component({
  selector: 'app-account-reviews-section',
  standalone: true,
  imports: [AccountSectionCardComponent, AccountReviewCardComponent],
  template: `
    <app-account-section-card title="Guest Reviews" iconClass="fas fa-comments">
      <div class="space-y-6">
        @for (review of reviews; track review.name + review.timeAgo) {
          <app-account-review-card [review]="review"></app-account-review-card>
        }
      </div>
    </app-account-section-card>
  `,
})
export class AccountReviewsSectionComponent {
  @Input() reviews: AccountReview[] = [];
}
