import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateBroker } from './real-estate-broker';

describe('RealEstateBroker', () => {
  let component: RealEstateBroker;
  let fixture: ComponentFixture<RealEstateBroker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstateBroker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateBroker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
