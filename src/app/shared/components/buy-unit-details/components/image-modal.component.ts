import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        (click)="onClose()"
      >
        <div
          class="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
          (click)="$event.stopPropagation()"
        >
          <img
            [src]="galleryImages[selectedImageIndex]"
            alt=""
            class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />

          <!-- Navigation buttons -->
          @if (galleryImages.length > 1) {
            <button
              (click)="onPreviousImage()"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            >
              <i class="fa-solid fa-chevron-left w-6 h-6"></i>
            </button>
            <button
              (click)="onNextImage()"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            >
              <i class="fa-solid fa-chevron-right w-6 h-6"></i>
            </button>
          }

          <!-- Close button -->
          <button
            (click)="onClose()"
            class="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          >
            <i class="fa-solid fa-times w-5 h-5"></i>
          </button>

          <!-- Image indicator -->
          @if (galleryImages.length > 1) {
            <div
              class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm"
            >
              {{ selectedImageIndex + 1 }} / {{ galleryImages.length }}
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class ImageModalComponent {
  @Input() isOpen: boolean = false;
  @Input() galleryImages: string[] = [];
  @Input() selectedImageIndex: number = 0;

  @Output() close = new EventEmitter<void>();
  @Output() previousImage = new EventEmitter<void>();
  @Output() nextImage = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onPreviousImage() {
    this.previousImage.emit();
  }

  onNextImage() {
    this.nextImage.emit();
  }
}
