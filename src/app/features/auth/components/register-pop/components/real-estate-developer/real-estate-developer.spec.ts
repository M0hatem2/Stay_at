import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateDeveloper } from './real-estate-developer';

describe('RealEstateDeveloper', () => {
  let component: RealEstateDeveloper;
  let fixture: ComponentFixture<RealEstateDeveloper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstateDeveloper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateDeveloper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
