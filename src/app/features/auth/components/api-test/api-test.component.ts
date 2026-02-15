import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../services/registration.service';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-gray-100 rounded-lg">
      <h3 class="text-lg font-semibold mb-4">API Connection Test</h3>
      
      <div class="space-y-4">
        <div>
          <strong>API Base URL:</strong> 
          <code class="bg-gray-200 px-2 py-1 rounded">{{ apiUrl }}</code>
        </div>
        
        <div>
          <strong>Registration Endpoint:</strong> 
         </div>
        
        <button 
          (click)="testConnection()"
          [disabled]="testing"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
          {{ testing ? 'Testing...' : 'Test Connection' }}
        </button>
        
        <div *ngIf="testResult" class="mt-4 p-4 rounded" 
             [class.bg-green-100]="testResult.success"
             [class.bg-red-100]="!testResult.success">
          <strong>Result:</strong> {{ testResult.message }}
          <div *ngIf="testResult.details" class="mt-2 text-sm">
            <strong>Details:</strong> {{ testResult.details }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class ApiTestComponent {
  apiUrl: string;
   testing = false;
  testResult: { success: boolean; message: string; details?: string } | null = null;

  constructor(
    private registrationService: RegistrationService,
    private apiService: ApiService
  ) {
    this.apiUrl = this.apiService.getBaseUrl();
   }

  async testConnection() {
    this.testing = true;
    this.testResult = null;

    try {
      // Test with a simple GET request to check if the server is reachable
      const response = await fetch(this.apiUrl.replace('/api/v1', ''), { 
        method: 'HEAD',
        mode: 'cors'
      });
      
      if (response.ok || response.status === 404) {
        // 404 is expected for HEAD request to base URL
        this.testResult = {
          success: true,
          message: 'API server is reachable',
          details: `Status: ${response.status} ${response.statusText}`
        };
      } else {
        this.testResult = {
          success: false,
          message: 'API server returned an error',
          details: `Status: ${response.status} ${response.statusText}`
        };
      }
    } catch (error: any) {
      this.testResult = {
        success: false,
        message: 'Failed to connect to API server',
        details: error.message || 'Network error'
      };
    } finally {
      this.testing = false;
    }
  }
}