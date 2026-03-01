import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div
      *ngIf="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      (click)="onClose()"
      tabindex="0"
    >
      <div class="relative max-w-4xl max-h-full mx-4" (click)="$event.stopPropagation()">
        <img
          [src]="images[currentIndex]"
          [alt]="'Gallery image ' + (currentIndex + 1)"
          class="max-w-full max-h-[90vh] object-contain rounded-lg"
        />

        <!-- Close button -->
        <button
          (click)="onClose()"
          class="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <i class="fa-solid fa-times w-4 h-4 sm:w-5 sm:h-5"></i>
        </button>

        <!-- Navigation arrows -->
        <button
          *ngIf="images.length > 1"
          (click)="onPrevious()"
          class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <i class="fa-solid fa-chevron-left w-4 h-4 sm:w-6 sm:h-6"></i>
        </button>
        <button
          *ngIf="images.length > 1"
          (click)="onNext()"
          class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <i class="fa-solid fa-chevron-right w-4 h-4 sm:w-6 sm:h-6"></i>
        </button>

        <!-- Image counter -->
        <div
          class="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-2 bg-black/70 text-white text-xs sm:text-sm rounded-lg"
        >
          {{ currentIndex + 1 }} of {{ images.length }}
        </div>

        <!-- Navigation hint -->
        <div
          class="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 bg-black/50 text-white text-xs rounded-lg hidden sm:block"
        >
          Use ← → keys or click arrows
        </div>
      </div>
    </div>
  `,
})
export class ImageModalComponent {
  @Input() show: boolean = false;
  @Input() images: string[] = [];
  @Input() currentIndex: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() indexChange = new EventEmitter<number>();

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.show) {
      this.onClose();
    }
  }

  @HostListener('document:keydown.arrowLeft')
  onLeftKey() {
    if (this.show) {
      this.onPrevious();
    }
  }

  @HostListener('document:keydown.arrowRight')
  onRightKey() {
    if (this.show) {
      this.onNext();
    }
  }

  onClose() {
    this.close.emit();
  }

  onPrevious() {
    if (this.images.length > 1) {
      const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
      this.indexChange.emit(newIndex);
    }
  }

  onNext() {
    if (this.images.length > 1) {
      const newIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
      this.indexChange.emit(newIndex);
    }
  }
}
