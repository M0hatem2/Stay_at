import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasicInformation } from './Components/basic-information/basic-information';
import { LocationAndAddress } from './Components/location-and-address/location-and-address';
import { DetailedSpecifications } from './Components/detailed-specifications/detailed-specifications';
import { ImagesAndMedia } from './Components/images-and-media/images-and-media';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-property',
  imports: [
    BasicInformation,
    LocationAndAddress,
    DetailedSpecifications,
    ImagesAndMedia,
    CommonModule,
  ],
  templateUrl: './add-new-property.html',
  styleUrl: './add-new-property.scss',
})
export class AddNewProperty {
  currentStep = 1;
  totalSteps = 4;

  constructor(private router: Router) {}

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  isLastStep(): boolean {
    return this.currentStep === this.totalSteps;
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  submitForm() {
    // Handle form submission
     // You can add your form submission logic here
    // For now, we'll just show the success message
    this.currentStep = this.totalSteps + 1;
  }

  resetForm() {
    this.currentStep = 1;
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/auth/sign-up']);
  }

  goToRegisterPop() {
    this.router.navigate(['/auth/register-pop']);
  }
}
