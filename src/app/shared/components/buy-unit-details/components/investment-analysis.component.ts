import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment-analysis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg"
    >
      <div class="flex items-center gap-2 mb-6">
        <i class="fa-solid fa-arrow-trend-up w-6 h-6"></i>
        <h2>Price & Investment Analysis</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div class="text-white/80 text-sm mb-2">Price per sqm</div>
          <div class="text-2xl mb-2">17 EGP/sqm</div>
          <div class="flex items-center gap-2 text-sm">
            <i class="fa-solid fa-arrow-trend-down w-4 h-4 text-green-400"></i>
            <span class="text-green-400">-7.9% below area average</span>
          </div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div class="text-white/80 text-sm mb-2">Expected Rental Yield</div>
          <div class="text-2xl mb-2">6.8%</div>
          <div class="text-sm text-white/80">Annual return: 238 EGP</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div class="text-white/80 text-sm mb-2">Expected Appreciation</div>
          <div class="text-2xl mb-2">12%</div>
          <div class="text-sm text-white/80">Annually in the area</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div class="text-white/80 text-sm mb-2">Payback Period</div>
          <div class="text-2xl mb-2">14.7 years</div>
          <div class="text-sm text-white/80">From rental income</div>
        </div>
      </div>
    </div>
  `,
})
export class InvestmentAnalysisComponent {}
