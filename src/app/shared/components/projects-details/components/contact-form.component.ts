import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="bg-gradient-to-br from-[#de5806] to-[#470e03] rounded-2xl p-8 text-white shadow-2xl border-2 border-[#de5806]/30"
    >
      <h3 class="mb-6 text-white text-center">Request Information</h3>
      <form class="space-y-4" (ngSubmit)="onSubmit()">
        <input
          type="text"
          [(ngModel)]="formData.name"
          name="name"
          placeholder="Name"
          class="w-full px-4 py-3 rounded-lg text-gray-900 border-2 border-white/20 focus:border-white focus:ring-2 focus:ring-white/50 transition-all"
        />
        <input
          type="tel"
          [(ngModel)]="formData.phone"
          name="phone"
          placeholder="Phone Number"
          class="w-full px-4 py-3 rounded-lg text-gray-900 border-2 border-white/20 focus:border-white focus:ring-2 focus:ring-white/50 transition-all"
        />
        <input
          type="email"
          [(ngModel)]="formData.email"
          name="email"
          placeholder="Email Address"
          class="w-full px-4 py-3 rounded-lg text-gray-900 border-2 border-white/20 focus:border-white focus:ring-2 focus:ring-white/50 transition-all"
        />
        <select
          [(ngModel)]="formData.unitType"
          name="unitType"
          class="w-full px-4 py-3 rounded-lg text-gray-900 border-2 border-white/20 focus:border-white focus:ring-2 focus:ring-white/50 transition-all"
        >
          <option value="">Unit Type of Interest</option>
          @for (unit of unitTypes; track unit) {
            <option [value]="unit">{{ unit }}</option>
          }
        </select>
        <button
          type="submit"
          class="w-full px-6 py-4 bg-white text-[#de5806] rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Send Request
        </button>
      </form>
    </div>
  `,
})
export class ContactFormComponent {
  @Input() unitTypes: string[] = [
    '2 Bedroom Apartment',
    '3 Bedroom Apartment',
    'Duplex',
    'Penthouse',
  ];

  formData = {
    name: '',
    phone: '',
    email: '',
    unitType: '',
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
  }
}
