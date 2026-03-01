import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface PriceEvaluation {
  status: string;
  marketComparison: string;
  isGoodDeal: boolean;
}

interface LocationEvaluation {
  rating: number;
  pros: string[];
  description: string;
}

interface AIAnalysis {
  priceEvaluation?: PriceEvaluation;
  locationEvaluation?: LocationEvaluation;
  summary?: string;
}

@Component({
  selector: 'app-ai-analysis',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div
      class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 border-2 border-gray-300"
    >
      <div class="flex items-center gap-2 mb-4">
        <i class="fa-solid fa-wand-magic-sparkles w-5 h-5 text-[#808080]"></i>
        <h2 class="text-gray-900">Smart AI Analysis</h2>
      </div>
      @if (aiAnalysis) {
        <div class="space-y-4">
          <!-- Price Evaluation -->
          @if (aiAnalysis.priceEvaluation) {
            <div class="flex items-start gap-3">
              <i class="fa-solid fa-dollar-sign w-5 h-5 text-green-600 mt-0.5"></i>
              <div>
                <div class="text-gray-900 mb-1">
                  {{ aiAnalysis.priceEvaluation.status }}
                </div>
                <p class="text-gray-600 text-sm">
                  {{ aiAnalysis.priceEvaluation.marketComparison }}
                </p>
                @if (aiAnalysis.priceEvaluation.isGoodDeal) {
                  <span
                    class="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                  >
                    <i class="fa-solid fa-check-circle"></i> Good Deal
                  </span>
                }
              </div>
            </div>
          }

          <!-- Location Evaluation -->
          @if (aiAnalysis.locationEvaluation) {
            <div class="flex items-start gap-3">
              <i class="fa-solid fa-location-dot w-5 h-5 text-[#808080] mt-0.5"></i>
              <div>
                <div class="text-gray-900 mb-1 flex items-center gap-2">
                  Location Rating
                  @if (aiAnalysis.locationEvaluation.rating > 0) {
                    <span class="text-yellow-500">
                      {{ aiAnalysis.locationEvaluation.rating }}/10
                    </span>
                  }
                </div>
                <p class="text-gray-600 text-sm">
                  {{ aiAnalysis.locationEvaluation.description }}
                </p>
                @if (
                  aiAnalysis.locationEvaluation.pros &&
                  aiAnalysis.locationEvaluation.pros.length
                ) {
                  <ul class="mt-2 space-y-1">
                    @for (pro of aiAnalysis.locationEvaluation.pros; track pro) {
                      <li class="text-gray-600 text-sm flex items-center gap-2">
                        <i class="fa-solid fa-check text-green-600 text-xs"></i>
                        {{ pro }}
                      </li>
                    }
                  </ul>
                }
              </div>
            </div>
          }

          <!-- Summary -->
          @if (aiAnalysis.summary) {
            <div class="flex items-start gap-3">
              <i class="fa-solid fa-lightbulb w-5 h-5 text-yellow-500 mt-0.5"></i>
              <div>
                <div class="text-gray-900 mb-1">AI Summary</div>
                <p class="text-gray-600 text-sm">{{ aiAnalysis.summary }}</p>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <i class="fa-solid fa-arrow-trend-up w-5 h-5 text-green-600 mt-0.5"></i>
            <div>
              <div class="text-gray-900 mb-1">Fair Price</div>
              <p class="text-gray-600 text-sm">
                Price is 8% below market average for similar units in the same area
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <i class="fa-solid fa-check-circle w-5 h-5 text-[#808080] mt-0.5"></i>
            <div>
              <div class="text-gray-900 mb-1">Excellent Location</div>
              <p class="text-gray-600 text-sm">
                Close to schools, malls, and transportation - Location rating: 9/10
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class AiAnalysisComponent {
  @Input() aiAnalysis?: AIAnalysis;
}
