# Registration Components Documentation

This folder contains specialized registration form components for different user types in the Stay_At application.

## Components Overview

### 1. Real Estate Developer Component

**Path:** `real-estate-developer/`

**Purpose:** Handles registration for real estate development companies

**Form Fields:**

- Company Name (required, min 3 characters)
- Commercial Register Number (required, numbers only)
- Website (optional, must be valid URL)
- Established Year (required, 1900 - current year)
- Number of Completed Projects (required)
- Commercial Register Document Upload (required, max 10MB, PDF/JPG/PNG)

**Features:**

- Reactive Forms with validation
- File upload with type and size validation
- Real-time form validation feedback
- Professional UI with icons

---

### 2. System Admin Component

**Path:** `system-admin/`

**Purpose:** Handles registration for system administrators

**Form Fields:**

- Admin Code (required, min 8 characters, password field)
- Department (required, dropdown selection)

**Features:**

- Password visibility toggle
- Department selection (Properties, Users, Support, Content Management)
- Secure admin code validation
- Information message about admin access

---

### 3. Property Owner Component

**Path:** `property-owner/`

**Purpose:** Handles registration for property owners

**Form Fields:**

- ID/Residence Number (required, 10-14 digits)
- ID Document Upload (required, max 10MB, PDF/JPG/PNG)

**Features:**

- ID number validation (numeric, 10-14 digits)
- Secure document upload
- File type and size validation
- Privacy and security indicators

---

### 4. Property Seeker Component

**Path:** `property-seeker/`

**Purpose:** Handles registration for users looking to rent or buy properties

**Form Fields:**

- Purpose of Search (required, rent or sale)
- Expected Budget (required, dynamic ranges based on purpose)
- Preferred Area (required, text input)
- Property Type (required, dropdown)

**Features:**

- Interactive purpose selection (rent/sale)
- Dynamic budget ranges that change based on purpose
- Smart property matching information
- User-friendly interface with emoji icons

---

### 5. Real Estate Broker Component

**Path:** `real-estate-broker/`

**Purpose:** Handles registration for licensed real estate brokers

**Form Fields:**

- License Number (required, min 5 characters)
- License Document Upload (required, max 10MB, PDF/JPG/PNG)
- Company Name (optional)

**Features:**

- License verification support
- Secure document upload
- Optional company affiliation
- Verification timeline information

---

## Common Features Across All Components

### Reactive Forms

All components use Angular Reactive Forms for:

- Form state management
- Validation
- Data binding
- Form submission

### Validation

- Real-time validation feedback
- Error messages display
- Visual indicators (red borders for invalid fields)
- Required field markers (\*)

### File Upload

Components with file upload support:

- File type validation (PDF, JPG, PNG)
- File size limit (10MB)
- Visual feedback with file name display
- Security and privacy indicators

### Styling

- Consistent Tailwind CSS styling
- Orange accent color (#de5806)
- Responsive design
- FontAwesome icons
- Smooth transitions and hover effects

## API Reference

### Common Methods

All components implement these methods:

```typescript
// Check if form is valid
isFormValid(): boolean

// Get form data
getFormData(): any

// Reset form
resetForm(): void

// Check if specific field is invalid
isFieldInvalid(fieldName: string): boolean

// Get error message for field
getErrorMessage(fieldName: string): string
```

### File Upload Components

Components with file upload also have:

```typescript
// Handle file selection
onFileSelected(event: Event): void
```

## Usage Example

```typescript
// In parent component
import { RealEstateDeveloper } from './components/real-estate-developer/real-estate-developer';

// Access child component
@ViewChild(RealEstateDeveloper) developerComponent!: RealEstateDeveloper;

// Check if valid
if (this.developerComponent.isFormValid()) {
  const data = this.developerComponent.getFormData();
  // Process data...
}
```

## Form Validation Rules

### Real Estate Developer

- Company Name: Required, minimum 3 characters
- Commercial Register: Required, numbers only
- Website: Optional, must start with http:// or https://
- Established Year: Required, between 1900 and current year
- Completed Projects: Required
- Document: Required, max 10MB, PDF/JPG/PNG

### System Admin

- Admin Code: Required, minimum 8 characters
- Department: Required

### Property Owner

- ID Number: Required, 10-14 digits
- ID Document: Required, max 10MB, PDF/JPG/PNG

### Property Seeker

- Purpose: Required
- Budget: Required (ranges change based on purpose)
- Preferred Area: Required
- Property Type: Required

### Real Estate Broker

- License Number: Required, minimum 5 characters
- License Document: Required, max 10MB, PDF/JPG/PNG
- Company Name: Optional

## Styling Guidelines

All components follow consistent styling:

- Border color: `#de5806` (orange) for focus
- Error color: `red-500`
- Gray tones: `gray-300`, `gray-400`, `gray-700`
- Rounded corners: `rounded-xl` (12px)
- Padding: `p-6` for containers, `p-4` for inputs
- Icons: FontAwesome 6

## Future Enhancements

Potential improvements:

- Integration with backend API
- Real-time document verification
- Auto-fill capabilities
- Progress saving
- Multi-language support
- Enhanced file preview
- Drag-and-drop file upload
