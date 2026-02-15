import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-real-estate-developer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './real-estate-developer.html',
  styleUrl: './real-estate-developer.scss',
})
export class RealEstateDeveloper implements OnInit {
  developerForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.developerForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      commercialRegisterNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      website: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      // API expects a numeric value, not a calendar year (e.g., "7")
      establishedYear: ['', [Validators.required, Validators.min(1), Validators.max(300)]],
      numberOfCompletedProjects: [
        '',
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
      commercialRegisterDocument: [null, Validators.required],
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
      this.developerForm.patchValue({ commercialRegisterDocument: file });
      this.developerForm.get('commercialRegisterDocument')?.updateValueAndValidity();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.developerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.developerForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'This field is required';
    if (field.errors['minLength'])
      return `Minimum length is ${field.errors['minLength'].requiredLength}`;
    if (field.errors['pattern']) {
      if (fieldName === 'commercialRegisterNumber') return 'Only numbers are allowed';
      if (fieldName === 'website') return 'Please enter a valid URL (http:// or https://)';
    }
    if (field.errors['min']) return `Minimum value is ${field.errors['min'].min}`;
    if (field.errors['max']) return `Maximum value is ${field.errors['max'].max}`;

    return '';
  }

  isFormValid(): boolean {
    return this.developerForm.valid && !!this.selectedFile;
  }

  getFormData(): FormData {
    const formData = new FormData();
    const formValue = this.developerForm.value;

    formData.append('commercialRegisterNumber', formValue.commercialRegisterNumber);
    formData.append('numberOfCompletedProjects', formValue.numberOfCompletedProjects);
    formData.append('establishedYear', formValue.establishedYear);
    formData.append('companyName', formValue.companyName);

    if (this.selectedFile) {
      formData.append('attachment', this.selectedFile);
    }

    return formData;
  }

  resetForm(): void {
    this.developerForm.reset();
    this.selectedFile = null;
    this.selectedFileName = '';
  }
}
