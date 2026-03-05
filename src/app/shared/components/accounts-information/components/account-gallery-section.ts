import { Component, Input } from '@angular/core';
import { AccountSectionCardComponent } from './account-section-card';
import { GalleryCategory } from './accounts-information.models';

@Component({
  selector: 'app-account-gallery-section',
  standalone: true,
  imports: [AccountSectionCardComponent],
  template: `
    <app-account-section-card title="Photo Gallery" iconClass="fas fa-images">
      <div class="space-y-6">
        @for (category of categories; track category.title) {
          <div>
            <h3 class="text-gray-700 mb-3 flex items-center gap-2">
              <i [class]="category.iconClass + ' text-[#C4A962]'"></i>
              {{ category.title }}
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              @for (photo of category.photos; track photo.src) {
                <button class="relative h-40 rounded-xl overflow-hidden group" type="button">
                  <img
                    [src]="photo.src"
                    [alt]="photo.alt"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center"
                  >
                    <i
                      class="fas fa-camera text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    ></i>
                  </div>
                </button>
              }
            </div>
          </div>
        }
      </div>
    </app-account-section-card>
  `,
})
export class AccountGallerySectionComponent {
  @Input() categories: GalleryCategory[] = [];
}
