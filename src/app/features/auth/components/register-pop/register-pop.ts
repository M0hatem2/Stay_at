import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AcountType } from './components/acount-type/acount-type';
import { PersonalInformation } from './components/personal-information/personal-information';
import { EmailConfirmation } from './components/email-confirmation/email-confirmation';
import { PropertySeeker } from './components/property-seeker/property-seeker';
import { PropertyOwner } from './components/property-owner/property-owner';
import { RealEstateBroker } from './components/real-estate-broker/real-estate-broker';
import { RealEstateDeveloper } from './components/real-estate-developer/real-estate-developer';
import { SystemAdmin } from './components/system-admin/system-admin';
import { RegistrationService } from '../../services/registration.service';

declare var HSStaticMethods: any;

@Component({
  selector: 'app-register-pop',
  standalone: true,
  imports: [
    CommonModule,
    AcountType,
    PersonalInformation,
    EmailConfirmation,
    PropertySeeker,
    PropertyOwner,
    RealEstateBroker,
    RealEstateDeveloper,
    SystemAdmin,
  ],
  templateUrl: './register-pop.html',
  styleUrl: './register-pop.scss',
})
export class RegisterPopComponent implements AfterViewInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  // ViewChild references
  @ViewChild(PersonalInformation) personalInfoComponent!: PersonalInformation;
  @ViewChild(EmailConfirmation) emailConfirmationComponent!: EmailConfirmation;
  @ViewChild(PropertySeeker) seekerComponent!: PropertySeeker;
  @ViewChild(PropertyOwner) ownerComponent!: PropertyOwner;
  @ViewChild(RealEstateBroker) brokerComponent!: RealEstateBroker;
  @ViewChild(RealEstateDeveloper) developerComponent!: RealEstateDeveloper;
  @ViewChild(SystemAdmin) adminComponent!: SystemAdmin;

  currentStep = 1;
  totalSteps = 4;
  selectedAccountType: string = '';

  // Store data from each step
  userEmail: string = '';
  userOtp: string = '';
  userRole: string = '';
  accessToken: string = '';

  constructor(
    private router: Router,
    private registrationService: RegistrationService,
  ) {}

  ngAfterViewInit(): void {
    this.initStepper();
  }

  private initStepper(): void {
    try {
      if (typeof HSStaticMethods !== 'undefined' && HSStaticMethods.autoInit) {
        HSStaticMethods.autoInit();
      }
    } catch (error) {
      console.log('Stepper auto-init not available, using manual controls');
    }
  }

  closeModal(): void {
    this.close.emit();
    this.resetStepper();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  onAccountTypeSelected(type: string): void {
    this.selectedAccountType = type;
    // Map account type to role
    const roleMap: { [key: string]: string } = {
      seeker: 'property_seeker',
      owner: 'property_owner',
      broker: 'real_estate_broker',
      developer: 'real_estate_developer',
      admin: 'system_admin',
    };
    this.userRole = roleMap[type] || type;
    this.nextStep();
  }

  onSignUpSuccess(data: { email: string; otp?: string; role: string }): void {
    this.userEmail = data.email;
    this.userOtp = data.otp || '';
    this.userRole = data.role;
  }

  onEmailConfirmSuccess(token: string): void {
    this.accessToken = token;
  }

  nextStep(): void {
    // Step 2: Submit personal info
    if (this.currentStep === 2) {
      if (!this.personalInfoComponent || !this.personalInfoComponent.isFormValid()) {
        alert('Please fill all required fields correctly');
        return;
      }
      // Call signup API
      this.personalInfoComponent.submitSignUp(this.userRole);
      return; // Don't proceed yet, wait for API response
    }

    // Step 3: Verify email
    if (this.currentStep === 3) {
      if (!this.emailConfirmationComponent) {
        return;
      }
      // Call verify OTP API
      this.emailConfirmationComponent.verifyOtp();
      return; // Don't proceed yet, wait for API response
    }

    // Other steps
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  resetStepper(): void {
    this.currentStep = 1;
    this.selectedAccountType = '';
    this.userEmail = '';
    this.userOtp = '';
    this.userRole = '';
    this.accessToken = '';
  }

  finishRegistration(): void {
    if (!this.accessToken) {
      alert('Please complete email verification first');
      return;
    }

    // Call appropriate API based on account type
    switch (this.selectedAccountType) {
      case 'seeker':
        this.completeSeekerProfile();
        break;
      case 'owner':
        this.completeOwnerProfile();
        break;
      case 'broker':
        this.completeBrokerProfile();
        break;
      case 'developer':
        this.completeDeveloperProfile();
        break;
      case 'admin':
        this.completeAdminProfile();
        break;
      default:
        console.error('Unknown account type');
    }
  }

  private completeSeekerProfile(): void {
    if (!this.seekerComponent || !this.seekerComponent.isFormValid()) {
      alert('Please fill all required fields');
      return;
    }

    const data = this.seekerComponent.getFormData();

    this.registrationService.signUpSeeker(data, this.accessToken).subscribe({
      next: (response) => {
        alert('Registration completed successfully!');
        this.closeModal();
        // Navigate to dashboard or login
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Profile completion error:', error);
        alert(error.error?.message || 'Failed to complete profile');
      },
    });
  }

  private completeOwnerProfile(): void {
    if (!this.ownerComponent || !this.ownerComponent.isFormValid()) {
      alert('Please fill all required fields');
      return;
    }

    const formData = this.ownerComponent.getFormData();

    this.registrationService.signUpOwner(formData, this.accessToken).subscribe({
      next: (response) => {
        alert('Registration completed successfully!');
        this.closeModal();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Profile completion error:', error);
        alert(error.error?.message || 'Failed to complete profile');
      },
    });
  }

  private completeBrokerProfile(): void {
    if (!this.brokerComponent || !this.brokerComponent.isFormValid()) {
      alert('Please fill all required fields');
      return;
    }

    const formData = this.brokerComponent.getFormData();

    this.registrationService.signUpBroker(formData, this.accessToken).subscribe({
      next: (response) => {
        alert('Registration completed successfully!');
        this.closeModal();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Profile completion error:', error);
        alert(error.error?.message || 'Failed to complete profile');
      },
    });
  }

  private completeDeveloperProfile(): void {
    if (!this.developerComponent || !this.developerComponent.isFormValid()) {
      alert('Please fill all required fields');
      return;
    }

    const formData = this.developerComponent.getFormData();

    this.registrationService.signUpDeveloper(formData, this.accessToken).subscribe({
      next: (response) => {
        alert('Registration completed successfully!');
        this.closeModal();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Profile completion error:', error);
        alert(error.error?.message || 'Failed to complete profile');
      },
    });
  }

  private completeAdminProfile(): void {
    console.log('Admin Component:', this.adminComponent);
    console.log('Is Form Valid:', this.adminComponent?.isFormValid());

    if (this.adminComponent) {
      console.log('Form Value:', this.adminComponent.adminForm.value);
      console.log('Form Valid:', this.adminComponent.adminForm.valid);
      console.log('Form Errors:', this.adminComponent.adminForm.errors);

      // Check each field
      Object.keys(this.adminComponent.adminForm.controls).forEach((key) => {
        const control = this.adminComponent!.adminForm.get(key);
        console.log(`Field ${key}:`, {
          value: control?.value,
          valid: control?.valid,
          errors: control?.errors,
        });
      });
    }

    if (!this.adminComponent || !this.adminComponent.isFormValid()) {
      alert('Please fill all required fields');
      return;
    }

    const data = this.adminComponent.getFormData();

    this.registrationService.signUpSystemAdmin(data, this.accessToken).subscribe({
      next: (response) => {
        alert('Registration completed successfully!');
        this.closeModal();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Profile completion error:', error);
        alert(error.error?.message || 'Failed to complete profile');
      },
    });
  }
}
