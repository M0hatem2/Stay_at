import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-real-estate-broker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './real-estate-broker.html',
  styleUrl: './real-estate-broker.scss',
})
export class RealEstateBroker implements OnInit {
  brokerForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.brokerForm = this.fb.group({
      licenseNumber: ['', [Validators.required, Validators.minLength(5)]],
      licenseDocument: [null, Validators.required],
      companyName: [''], // Optional field
      yearsOfExperience: [0, [Validators.required, Validators.min(0)]],
      brokerSpecialization: ['both', Validators.required], // both, rent, sale
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, JPG, and PNG files are allowed');
        return;
      }

      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.brokerForm.patchValue({ licenseDocument: file });
      this.brokerForm.get('licenseDocument')?.updateValueAndValidity();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.brokerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.brokerForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'This field is required';
    if (field.errors['minLength'])
      return `Minimum length is ${field.errors['minLength'].requiredLength}`;

    return '';
  }

  isFormValid(): boolean {
    return this.brokerForm.valid && !!this.selectedFile;
  }

  getFormData(): FormData {
    const formData = new FormData();
    const formValue = this.brokerForm.value;

    formData.append('licenseNumber', formValue.licenseNumber);
    formData.append('companyName', formValue.companyName || '');
    formData.append('yearsOfExperience', formValue.yearsOfExperience.toString());
    formData.append('brokerSpecialization', formValue.brokerSpecialization);

    if (this.selectedFile) {
      formData.append('attachment', this.selectedFile);
    }

    return formData;
  }

  resetForm(): void {
    this.brokerForm.reset();
    this.selectedFile = null;
    this.selectedFileName = '';
  }
}
