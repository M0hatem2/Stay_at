import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableUnits } from './available-units';

describe('AvailableUnits', () => {
  let component: AvailableUnits;
  let fixture: ComponentFixture<AvailableUnits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableUnits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableUnits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
