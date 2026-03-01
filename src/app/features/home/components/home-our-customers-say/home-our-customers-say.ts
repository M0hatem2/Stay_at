import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsCarouselComponent } from './reviews-carousel/reviews-carousel.component';

interface CustomerReview {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

@Component({
  selector: 'app-home-our-customers-say',
  imports: [CommonModule, ReviewsCarouselComponent],
  standalone: true,
  templateUrl: './home-our-customers-say.html',
  styleUrl: './home-our-customers-say.scss',
})
export class HomeOurCustomersSay {
  currentReviewIndex: number = 0;

  reviews: CustomerReview[] = [
    {
      id: 1,
      name: 'Mona Hassan',
      role: 'Property Owner',
      rating: 5,
      comment:
        'I listed my property on HomoGo and found a reliable tenant in just 3 days. Professional service and excellent support.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Ahmed Mohamed',
      role: 'Tenant',
      rating: 5,
      comment:
        'Found my dream apartment through HomoGo. The process was smooth and the team was very helpful throughout.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Sara Ibrahim',
      role: 'Property Owner',
      rating: 5,
      comment:
        'Excellent platform with great customer service. I have used it multiple times and always satisfied.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop',
    },
    {
      id: 4,
      name: 'Omar Ali',
      role: 'Tenant',
      rating: 4,
      comment:
        'Great experience finding a rental property. The website is user-friendly and the listings are accurate.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    {
      id: 5,
      name: 'Fatima El-Sayed',
      role: 'Property Owner',
      rating: 5,
      comment:
        'HomoGo made it so easy to rent out my property. Got multiple inquiries within the first week!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    },
    {
      id: 6,
      name: 'Karim Hassan',
      role: 'Tenant',
      rating: 5,
      comment:
        'Professional service and great communication. Found exactly what I was looking for.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    },
  ];
}
