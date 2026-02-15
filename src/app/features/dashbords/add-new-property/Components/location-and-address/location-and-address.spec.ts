import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAndAddress } from './location-and-address';

describe('LocationAndAddress', () => {
  let component: LocationAndAddress;
  let fixture: ComponentFixture<LocationAndAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationAndAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationAndAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
