import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySeeker } from './property-seeker';

describe('PropertySeeker', () => {
  let component: PropertySeeker;
  let fixture: ComponentFixture<PropertySeeker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertySeeker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertySeeker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
