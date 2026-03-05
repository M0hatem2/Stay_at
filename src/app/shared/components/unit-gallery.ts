import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div class="relative h-64 sm:h-80 lg:h-96 bg-gray-200">
        <img
          [src]="displayImages[currentIndex] || displayImages[0]"
          [alt]="title"
          class="w-full h-full object-cover cursor-pointer"
          (click)="onImageClick()"
        />
        <div class="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
          <div
            class="px-2 sm:px-3 py-1 sm:py-1.5 bg-black text-white text-xs sm:text-sm rounded-lg flex items-center gap-1"
          >
            <i class="fa-solid fa-shield-alt w-3 h-3 sm:w-4 sm:h-4"></i><span>Managed</span>
          </div>
          <div
            class="px-2 sm:px-3 py-1 sm:py-1.5 bg-green-600 text-white text-xs sm:text-sm rounded-lg flex items-center gap-1"
          >
            <i class="fa-solid fa-check-circle w-3 h-3 sm:w-4 sm:h-4"></i><span>Verified</span>
          </div>
        </div>
        <div class="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
          <button
            class="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
          >
            <i class="fa-regular fa-heart w-4 h-4 sm:w-5 sm:h-5"></i>
          </button>
          <button
            class="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
          >
            <i class="fa-solid fa-share-nodes w-4 h-4 sm:w-5 sm:h-5 text-gray-700"></i>
          </button>
        </div>
        @if (displayImages.length > 1) {
          <button
            (click)="previousImage()"
            class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <i class="fa-solid fa-chevron-left w-4 h-4"></i>
          </button>
          <button
            (click)="nextImage()"
            class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <i class="fa-solid fa-chevron-right w-4 h-4"></i>
          </button>
        }
        <div
          class="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-2 py-1 bg-black/70 text-white text-xs rounded-lg"
        >
          {{ currentIndex + 1 }} / {{ displayImages.length }}
        </div>
        @if (!images.length) {
          <div
            class="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 px-2 py-1 bg-white/90 text-gray-700 text-xs rounded-lg"
          >
            No gallery images provided
          </div>
        }
      </div>
      <div class="p-2 sm:p-4   gap-2 sm:gap-3 overflow-x-scroll flex">
        @for (image of displayImages; track $index) {
          <button
            (click)="selectImage($index)"
            class="relative h-16 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all hover:scale-105"
            [class.ring-2]="$index === currentIndex"
            [class.ring-black]="$index === currentIndex"
          >
            <img
              [src]="image"
              alt="Gallery image {{ $index + 1 }}"
              class="w-full h-full object-cover"
            />
          </button>
        }
      </div>
    </div>
  `,
})
export class UnitGalleryComponent {
  private readonly fallbackImage =
    'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=1200&h=800&fit=crop';

  @Input() images: string[] = [];
  @Input() title: string = '';
  @Input() currentIndex: number = 0;

  @Output() imageClick = new EventEmitter<void>();
  @Output() indexChange = new EventEmitter<number>();

  get displayImages(): string[] {
    const validImages = this.images.filter(Boolean);
    return validImages.length ? validImages : [this.fallbackImage];
  }

  selectImage(index: number): void {
    if (index < 0 || index >= this.displayImages.length) return;
    this.currentIndex = index;
    this.indexChange.emit(index);
  }

  previousImage(): void {
    const totalImages = this.displayImages.length;
    if (totalImages <= 1) return;
    this.currentIndex = this.currentIndex === 0 ? totalImages - 1 : this.currentIndex - 1;
    this.indexChange.emit(this.currentIndex);
  }

  nextImage(): void {
    const totalImages = this.displayImages.length;
    if (totalImages <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % totalImages;
    this.indexChange.emit(this.currentIndex);
  }

  onImageClick(): void {
    this.imageClick.emit();
  }
}
