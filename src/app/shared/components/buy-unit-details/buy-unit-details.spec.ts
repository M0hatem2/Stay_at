import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyUnitDetails } from './buy-unit-details';

describe('BuyUnitDetails', () => {
  let component: BuyUnitDetails;
  let fixture: ComponentFixture<BuyUnitDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyUnitDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyUnitDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
