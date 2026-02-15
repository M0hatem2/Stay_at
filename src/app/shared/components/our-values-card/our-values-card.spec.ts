import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurValuesCard } from './our-values-card';

describe('OurValuesCard', () => {
  let component: OurValuesCard;
  let fixture: ComponentFixture<OurValuesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurValuesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurValuesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
