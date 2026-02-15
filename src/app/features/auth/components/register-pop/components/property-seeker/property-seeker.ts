import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-seeker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-seeker.html',
  styleUrl: './property-seeker.scss',
})
export class PropertySeeker implements OnInit {
  seekerForm!: FormGroup;
  selectedPurpose: 'rent' | 'sale' | null = null;

  budgetRanges = {
    rent: [
      { value: 3000, label: 'Less than 3,000 EGP' },
      { value: 5000, label: '3,000 - 5,000 EGP' },
      { value: 10000, label: '5,000 - 10,000 EGP' },
      { value: 20000, label: '10,000 - 20,000 EGP' },
      { value: 20001, label: 'More than 20,000 EGP' },
    ],
    sale: [
      { value: 500000, label: 'Less than 500,000 EGP' },
      { value: 1000000, label: '500,000 - 1,000,000 EGP' },
      { value: 2000000, label: '1,000,000 - 2,000,000 EGP' },
      { value: 5000000, label: '2,000,000 - 5,000,000 EGP' },
      { value: 5000001, label: 'More than 5,000,000 EGP' },
    ],
  };

  propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'studio', label: 'Studio' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'penthouse', label: 'Penthouse' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.seekerForm = this.fb.group({
      purposeOfSearch: ['', Validators.required],
      expectedBudget: ['', Validators.required],
      preferredArea: ['', Validators.required],
      propertyType: ['', Validators.required],
    });
  }

  selectPurpose(purpose: 'rent' | 'sale'): void {
    this.selectedPurpose = purpose;
    this.seekerForm.patchValue({
      purposeOfSearch: purpose,
      expectedBudget: '', // Reset budget when purpose changes
    });
  }

  getCurrentBudgetRanges(): any[] {
    return this.selectedPurpose ? this.budgetRanges[this.selectedPurpose] : [];
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.seekerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.seekerForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'This field is required';

    return '';
  }

  isFormValid(): boolean {
    return this.seekerForm.valid;
  }

  getFormData(): any {
    const { purposeOfSearch, expectedBudget, preferredArea, propertyType } = this.seekerForm.value;
    const numericBudget =
      expectedBudget !== null && expectedBudget !== undefined && expectedBudget !== ''
        ? Number(expectedBudget)
        : null;
    return {
      purposeOfSearch,
      expectedBudget: numericBudget,
      preferredArea,
      propertyType,
    };
  }

  resetForm(): void {
    this.seekerForm.reset();
    this.selectedPurpose = null;
  }
}
