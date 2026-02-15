import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCard } from '../../models/plan.model';

@Component({
  selector: 'app-plans-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans-cards.html',
  styleUrl: './plans-cards.scss',
})
export class PlansCards {
  @Input() plan!: PlanCard;
  @Input() isYearly: boolean = false;
  @Output() selectPlan = new EventEmitter<string>();

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  getPrice(plan: PlanCard): number {
    return this.isYearly ? plan.priceYearly : plan.priceMonthly;
  }

  getPeriodLabel(plan: PlanCard): string {
    return this.isYearly ? plan.periodLabelYearly : plan.periodLabelMonthly;
  }

  choosePlan(planId: string) {
    this.selectPlan.emit(planId);
  }
}
