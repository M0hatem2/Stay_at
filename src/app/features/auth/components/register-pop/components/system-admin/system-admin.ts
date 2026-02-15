import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-system-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './system-admin.html',
  styleUrl: './system-admin.scss',
})
export class SystemAdmin implements OnInit {
  adminForm!: FormGroup;
  showAdminCode = false;

  departments = [
    { value: 'propertiesMangement', label: 'Properties Management' },
    { value: 'usersMangement', label: 'Users Management' },
    { value: 'technicalSupport', label: 'Technical Support' },
    { value: 'contentMangement', label: 'Content Management' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      adminCode: [
        '', 
        [
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9]{2,20}$/)
        ]
      ],
      department: ['', Validators.required],
    });
  }

  toggleAdminCodeVisibility(): void {
    this.showAdminCode = !this.showAdminCode;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.adminForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.adminForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'This field is required';
    if (field.errors['minLength'])
      return `Minimum length is ${field.errors['minLength'].requiredLength}`;
    if (field.errors['maxLength'])
      return `Maximum length is ${field.errors['maxLength'].requiredLength}`;
    if (field.errors['pattern'])
      return 'Admin code must contain only letters and numbers (A-Z, a-z, 0-9)';

    return '';
  }

  isFormValid(): boolean {
    return this.adminForm.valid;
  }

  getFormData(): any {
    return this.adminForm.value;
  }

  resetForm(): void {
    this.adminForm.reset();
    this.showAdminCode = false;
  }
}
