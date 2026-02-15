import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOurValues } from './about-our-values';

describe('AboutOurValues', () => {
  let component: AboutOurValues;
  let fixture: ComponentFixture<AboutOurValues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutOurValues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutOurValues);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
