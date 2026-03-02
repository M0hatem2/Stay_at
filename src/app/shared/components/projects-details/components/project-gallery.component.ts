import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h2 class="text-gray-900 mb-4">Photo Gallery</h2>
      <div class="grid grid-cols-3 gap-4">
        @for (image of galleryImages; track image) {
          <div class="aspect-square rounded-xl overflow-hidden relative group cursor-pointer">
            <img
              [src]="image"
              alt="Gallery image"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#de5806]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ProjectGalleryComponent {
  @Input() galleryImages: string[] = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  ];
}
