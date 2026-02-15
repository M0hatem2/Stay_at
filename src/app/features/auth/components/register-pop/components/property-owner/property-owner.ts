import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-owner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-owner.html',
  styleUrl: './property-owner.scss',
})
export class PropertyOwner implements OnInit {
  ownerForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
      idNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,14}$/)]],
      idDocument: [null, Validators.required],
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
      this.ownerForm.patchValue({ idDocument: file });
      this.ownerForm.get('idDocument')?.updateValueAndValidity();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.ownerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.ownerForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'This field is required';
    if (field.errors['pattern']) return 'ID number must be 10-14 digits';

    return '';
  }

  isFormValid(): boolean {
    return this.ownerForm.valid && !!this.selectedFile;
  }

  getFormData(): FormData {
    const formData = new FormData();
    const formValue = this.ownerForm.value;

    formData.append('id', formValue.idNumber);
    formData.append('numberOfPropertiesOwned', '0'); // Default value
    formData.append('registrationPurpose', 'both'); // Default value

    if (this.selectedFile) {
      formData.append('attachment', this.selectedFile);
    }

    return formData;
  }

  resetForm(): void {
    this.ownerForm.reset();
    this.selectedFile = null;
    this.selectedFileName = '';
  }
}
