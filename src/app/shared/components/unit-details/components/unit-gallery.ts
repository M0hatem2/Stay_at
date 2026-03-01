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
          [src]="images[currentIndex] || images[0]"
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
        <button
          *ngIf="images.length > 1"
          (click)="previousImage()"
          class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <i class="fa-solid fa-chevron-left w-4 h-4"></i>
        </button>
        <button
          *ngIf="images.length > 1"
          (click)="nextImage()"
          class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <i class="fa-solid fa-chevron-right w-4 h-4"></i>
        </button>
        <div
          class="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-2 py-1 bg-black/70 text-white text-xs rounded-lg"
        >
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
      <div class="p-2 sm:p-4 grid grid-cols-4 gap-2 sm:gap-3 overflow-x-auto">
        <button
          *ngFor="let image of images; let i = index"
          (click)="selectImage(i)"
          class="relative h-16 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all hover:scale-105"
          [class.ring-2]="i === currentIndex"
          [class.ring-black]="i === currentIndex"
        >
          <img [src]="image" alt="Gallery image {{ i + 1 }}" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  `,
})
export class UnitGalleryComponent {
  @Input() images: string[] = [];
  @Input() title: string = '';
  @Input() currentIndex: number = 0;
  
  @Output() imageClick = new EventEmitter<void>();
  @Output() indexChange = new EventEmitter<number>();

  selectImage(index: number): void {
    this.currentIndex = index;
    this.indexChange.emit(index);
  }

  previousImage(): void {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.indexChange.emit(this.currentIndex);
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.indexChange.emit(this.currentIndex);
  }

  onImageClick(): void {
    this.imageClick.emit();
  }
}
