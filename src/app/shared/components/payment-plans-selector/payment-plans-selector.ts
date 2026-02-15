import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetails } from '../../../core/models/property-details.model';

@Component({
  selector: 'app-payment-plans-selector',
  imports: [CommonModule],
  templateUrl: './payment-plans-selector.html',
  styleUrl: './payment-plans-selector.scss',
})
export class PaymentPlansSelector {
  @Input() propertyData!: PropertyDetails;
  @Output() planSelected = new EventEmitter<any>();

  selectedPlan: any;

  plans: any[] = [];

  ngOnInit() {
    if (this.propertyData?.payment_plans) {
      this.plans = this.propertyData.payment_plans.map((plan) => ({
        ...plan,
        isBestDeal: plan.tag === 'Best Deal',
      }));

      const selectedPlan = this.plans.find((p) => p.selected) || this.plans[0];
      this.selectPlan(selectedPlan);
    }
  }

  selectPlan(plan: any) {
    this.selectedPlan = plan;
    this.planSelected.emit(plan);
  }
}
