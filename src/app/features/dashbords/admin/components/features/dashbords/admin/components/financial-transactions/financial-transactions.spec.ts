import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialTransactions } from './financial-transactions';

describe('FinancialTransactions', () => {
  let component: FinancialTransactions;
  let fixture: ComponentFixture<FinancialTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialTransactions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialTransactions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
