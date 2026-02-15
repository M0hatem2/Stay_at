import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwner } from './property-owner';

describe('PropertyOwner', () => {
  let component: PropertyOwner;
  let fixture: ComponentFixture<PropertyOwner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyOwner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyOwner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
