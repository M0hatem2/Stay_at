import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buy } from './buy';

describe('Buy', () => {
  let component: Buy;
  let fixture: ComponentFixture<Buy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
