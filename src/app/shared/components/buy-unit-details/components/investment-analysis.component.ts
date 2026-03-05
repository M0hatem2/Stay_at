import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetails } from '../../../../core/models/property-details.model';

type PriceInvestmentAnalysis = PropertyDetails['price_investment_analysis'];

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
          <div class="text-2xl mb-2">{{ valueOrDefault(analysis?.price_per_sqm) }}</div>
          <div class="flex items-start gap-2 text-sm">
            <i class="fa-solid fa-chart-simple w-4 h-4 text-green-400 mt-0.5"></i>
            <span class="text-white/85">{{ valueOrDefault(analysis?.comparison_to_area_average) }}</span>
          </div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div class="text-white/80 text-sm mb-2">Expected Rental Yield</div>
          <div class="text-2xl mb-2">{{ valueOrDefault(analysis?.expected_rental_yield) }}</div>
          <div class="text-sm text-white/80">
            Annual return: {{ valueOrDefault(analysis?.expected_rental_annual_return) }}
          </div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div class="text-white/80 text-sm mb-2">Expected Appreciation</div>
          <div class="text-2xl mb-2">{{ valueOrDefault(analysis?.expected_appreciation) }}</div>
          <div class="text-sm text-white/80">Annually in the area</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div class="text-white/80 text-sm mb-2">Payback Period</div>
          <div class="text-2xl mb-2">{{ formatPayback(analysis?.payback_period_years) }}</div>
          <div class="text-sm text-white/80">From rental income</div>
        </div>
      </div>
      <div class="mt-4 rounded-xl bg-white/10 p-4 text-sm text-white/90">
        <div class="font-medium mb-1">Summary</div>
        <p>{{ valueOrDefault(summary, 'Investment summary is not available yet.') }}</p>
        <div class="mt-2 text-xs text-white/70">
          Last updated:
          @if (lastUpdated) {
            {{ lastUpdated | date: 'mediumDate' }}
          } @else {
            Not available
          }
        </div>
      </div>
    </div>
  `,
})
export class InvestmentAnalysisComponent {
  @Input() analysis: PriceInvestmentAnalysis | null = null;
  @Input() summary: string = '';
  @Input() lastUpdated: string = '';

  valueOrDefault(value: unknown, fallback: string = 'N/A'): string {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    return text ? text : fallback;
  }

  formatPayback(value: unknown): string {
    if (typeof value === 'number' && value > 0) {
      return `${value} years`;
    }
    return 'N/A';
  }
}
