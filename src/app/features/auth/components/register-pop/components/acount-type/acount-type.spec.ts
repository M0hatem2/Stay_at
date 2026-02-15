import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountType } from './acount-type';

describe('AcountType', () => {
  let component: AcountType;
  let fixture: ComponentFixture<AcountType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcountType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcountType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
