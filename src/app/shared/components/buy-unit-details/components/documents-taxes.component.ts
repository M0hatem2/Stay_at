import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetails } from '../../../../core/models/property-details.model';

type DocumentItem = PropertyDetails['documents'][number];
type TaxItem = PropertyDetails['taxes_and_fees']['items'][number];
type TaxesAndFees = PropertyDetails['taxes_and_fees'];

@Component({
  selector: 'app-documents-taxes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <i class="fa-solid fa-file-lines w-5 h-5 text-[#de5806]"></i>
          <h3 class="text-gray-900">Available Documents</h3>
        </div>
        <div class="space-y-3">
          @if (documents.length) {
            @for (doc of documents; track doc.name + doc.status) {
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <i class="fa-solid fa-file-lines w-5 h-5 text-[#de5806]"></i>
                  <span class="text-gray-700 text-sm">{{ valueOrDefault(doc.name, 'Document') }}</span>
                </div>
                <span class="text-xs text-green-600">{{ valueOrDefault(doc.status, 'Available') }}</span>
              </div>
            }
          } @else {
            <div class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
              No documents available for this unit yet.
            </div>
          }
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <i class="fa-solid fa-dollar-sign w-5 h-5 text-[#de5806]"></i>
          <h3 class="text-gray-900">Taxes & Fees</h3>
        </div>
        <div class="space-y-3">
          @if (taxItems.length) {
            @for (tax of taxItems; track tax.name + tax.amount) {
              <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-gray-700 text-sm">{{ valueOrDefault(tax.name, 'Fee') }}</span>
                  <span class="text-gray-900">{{ valueOrDefault(tax.amount, 'N/A') }}</span>
                </div>
                <div class="text-xs text-gray-500">{{ valueOrDefault(tax.note, 'Details not available') }}</div>
              </div>
            }
          } @else {
            <div class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
              Taxes and fees are not available for this unit yet.
            </div>
          }
          <div class="pt-3 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <span class="text-gray-900">Total</span>
              <span class="text-[#de5806] font-semibold">{{ valueOrDefault(taxesAndFees?.total, 'N/A') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DocumentsTaxesComponent {
  @Input() documents: DocumentItem[] = [];
  @Input() taxesAndFees: TaxesAndFees | null = null;

  get taxItems(): TaxItem[] {
    return this.taxesAndFees?.items || [];
  }

  valueOrDefault(value: unknown, fallback: string = 'N/A'): string {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    return text ? text : fallback;
  }
}
