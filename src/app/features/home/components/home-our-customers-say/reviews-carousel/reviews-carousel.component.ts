import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CustomerReview {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

@Component({
  selector: 'app-reviews-carousel',
  imports: [CommonModule],
  templateUrl: './reviews-carousel.component.html',
  styleUrl: './reviews-carousel.component.scss',
  standalone: true,
})
export class ReviewsCarouselComponent implements OnInit, OnDestroy, OnChanges {
  @Input() reviews: CustomerReview[] = [];
  @Input() currentReviewIndex: number = 0;
  @Input() autoPlayInterval: number = 5000; // 5 seconds

  private autoPlayTimer: any;
  isAnimating: boolean = false;

  ngOnInit(): void {
    this.ensureValidIndex();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reviews'] || changes['currentReviewIndex']) {
      this.ensureValidIndex();
    }
  }

  private ensureValidIndex(): void {
    if (!this.reviews || this.reviews.length === 0) {
      this.currentReviewIndex = 0;
    } else if (this.currentReviewIndex < 0 || this.currentReviewIndex >= this.reviews.length) {
      this.currentReviewIndex = 0;
    }
  }

  nextReview(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
    this.resetAutoPlay();

    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  previousReview(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentReviewIndex =
      this.currentReviewIndex === 0 ? this.reviews.length - 1 : this.currentReviewIndex - 1;
    this.resetAutoPlay();

    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  goToReview(index: number): void {
    if (this.isAnimating) return;
    this.currentReviewIndex = index;
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
    if (this.reviews && this.reviews.length > 1) {
      this.stopAutoPlay();
      this.autoPlayTimer = setInterval(() => {
        if (!this.isAnimating && this.reviews && this.reviews.length > 0) {
          this.nextReview();
        }
      }, this.autoPlayInterval);
    }
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    setTimeout(() => {
      this.startAutoPlay();
    }, 100);
  }

  get currentReview(): CustomerReview | null {
    if (
      !this.reviews ||
      this.reviews.length === 0 ||
      this.currentReviewIndex < 0 ||
      this.currentReviewIndex >= this.reviews.length
    ) {
      return null;
    }
    return this.reviews[this.currentReviewIndex];
  }

  get renderStars(): number[] {
    const rating = this.currentReview?.rating || 0;
    return Array(Math.max(0, Math.min(5, rating)))
      .fill(0)
      .map((_, i) => i);
  }

  get renderEmptyStars(): number[] {
    const rating = this.currentReview?.rating || 0;
    const emptyStars = Math.max(0, 5 - Math.max(0, Math.min(5, rating)));
    return Array(emptyStars)
      .fill(0)
      .map((_, i) => i);
  }
}
