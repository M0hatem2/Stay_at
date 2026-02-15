import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentPlansSelector } from './payment-plans-selector';

describe('PaymentPlansSelector', () => {
  let component: PaymentPlansSelector;
  let fixture: ComponentFixture<PaymentPlansSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPlansSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentPlansSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 payment plans', () => {
    expect(component.plans.length).toBe(3);
  });

  it('should select a plan and emit event', () => {
    spyOn(component.planSelected, 'emit');
    const plan = component.plans[0];
    component.selectPlan(plan);
    expect(component.selectedPlan).toBe(plan);
    expect(component.planSelected.emit).toHaveBeenCalledWith(plan);
  });
});
