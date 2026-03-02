import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-file-lines w-5 h-5 text-[#de5806]"></i>
              <span class="text-gray-700 text-sm">Preliminary Sales Contract</span>
            </div>
            <span class="text-xs text-green-600">Available</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-check-circle w-5 h-5 text-[#de5806]"></i>
              <span class="text-gray-700 text-sm">Building Permit</span>
            </div>
            <span class="text-xs text-green-600">Certified</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-check-circle w-5 h-5 text-[#de5806]"></i>
              <span class="text-gray-700 text-sm">Completion Certificate</span>
            </div>
            <span class="text-xs text-green-600">Certified</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-building w-5 h-5 text-[#de5806]"></i>
              <span class="text-gray-700 text-sm">Approved Layout</span>
            </div>
            <span class="text-xs text-green-600">Available</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-file-lines w-5 h-5 text-[#de5806]"></i>
              <span class="text-gray-700 text-sm">Title Deed</span>
            </div>
            <span class="text-xs text-green-600">Ready to Transfer</span>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <i class="fa-solid fa-dollar-sign w-5 h-5 text-[#de5806]"></i>
          <h3 class="text-gray-900">Taxes & Fees</h3>
        </div>
        <div class="space-y-3">
          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="text-gray-700 text-sm">Registration Tax</span>
              <span class="text-gray-900">52 EGP</span>
            </div>
            <div class="text-xs text-gray-500">Of property value</div>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="text-gray-700 text-sm">Real Estate Registry</span>
              <span class="text-gray-900">3 EGP</span>
            </div>
            <div class="text-xs text-gray-500">Fixed fees</div>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="text-gray-700 text-sm">Admin Fees</span>
              <span class="text-gray-900">7 EGP</span>
            </div>
            <div class="text-xs text-gray-500">Documentation & procedures</div>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="text-gray-700 text-sm">Annual Maintenance (Est.)</span>
              <span class="text-gray-900">12 EGP</span>
            </div>
            <div class="text-xs text-gray-500">Compound yearly fees</div>
          </div>
          <div class="pt-3 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <span class="text-gray-900">Total</span>
              <span class="text-[#de5806] font-semibold">74 EGP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DocumentsTaxesComponent {}
